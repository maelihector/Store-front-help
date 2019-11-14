// Require packages and bring into scope
const mysql = require('mysql');
const inquirer = require('inquirer');
const {
  table
} = require('table');

// Connect to mySQl database with necessary credentials and specify database name
const con = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bamazon'
});

// Return the error description if there is an error when connecting to the database
con.connect(err => {
  if (err) throw err;
  // Initialize APP
  startManager();
});

// Function to display prompt at initialization of application
function startManager() {
  console.log(`

  * Please Choose an Action *

  `);
  inquirer.prompt([{
    type: "list",
    name: "action",
    message: "Manager Actions:",
    choices: ["View All Inventory", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
  }]).then(choice => {
    switch (choice.action) {
      case "View All Inventory":
        viewTotalInventory();
        break;
      case "View Low Inventory":
        viewLowInventory();
        break;
      case "Add to Inventory":
        addToInventory();
        break;
      case "Add New Product":
        addProduct();
        break;
      case "Exit":
        exitApp();
        break;
    }
  });
}

// Function to view total inventory
function viewTotalInventory() {
  con.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log(`
                
                                  BAMAZON'S TOTAL INVENTORY

    `);

    // Call function to build table
    buildTable(res);

    // Take manager back to prompts
    startManager();
  });
}

// Function to view inventory with stock_quantity less than or equal to 5
function viewLowInventory() {
  con.query('SELECT * FROM products WHERE stock_quantity <= 5', function (err, res) {
    if (err) throw err;
    console.log(`
                
                    BAMAZON'S LOW INVENTORY
        `);

    // Call function to build table
    buildTable(res);

    // Take manager back to prompts
    startManager();
  });
}

// Function to add stock_quantity amount to any product
function addToInventory() {
  con.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    // Create empty var to hold the list of products
    let itemsArray = [];
    // Push each product into itemsArray
    for (let i = 0; i < res.length; i++) {
      itemsArray.push(res[i].product_name);
    }
    // List all products so manager can choose which product, and then ask quantity of inventory to add
    inquirer.prompt([{
      type: "list",
      name: "product",
      choices: itemsArray,
      message: "Select which product you want to add inventory to:"
    }, {
      type: "input",
      name: "qty",
      message: "How much inventory would you like to add?",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        } else {
          return false;
        }
      }
    }]).then((ans) => {
      // Query database to update new inventory
      con.query('UPDATE products SET stock_quantity=stock_quantity+' + ans.qty + ' WHERE ?', [{
        product_name: ans.product
      }], function (err, result) {
        if (err) throw err;
        console.log(`
        =================================================================

        Rows affected: ${result.affectedRows}
        
        The stock_quantity of '${ans.product}' was updated by ${ans.qty}.

        =================================================================
                        `);
        // Take manager back to prompts
        startManager();
      });
    });
  });
}

// Function that allows manager to add a completely new product to Bamazon
function addProduct() {
  console.log(`You are adding a new and unique product to 'products' table in 'bamazon' database.`);
  let departments = [];
  // Grab name of department_names for Manager to chose from
  con.query('SELECT * FROM departments', function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      departments.push(res[i].department_name);
    }
  });
  inquirer.prompt([{
    type: "input",
    name: "item",
    message: "Input the name of the new product:",
    validate: function (value) {
      if (value) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    type: "list",
    name: "department",
    message: "Choose the department the product belongs to:",
    choices: departments
  }, {
    type: "input",
    name: "price",
    message: "Input the price of the product:",
    validate: function (value) {
      if (isNaN(value) === false) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    type: "input",
    name: "quantity",
    message: "Input the stock_quantity of the product:",
    validate: function (value) {
      if (isNaN(value) == false) {
        return true;
      } else {
        return false;
      }
    }
  }]).then(ans => {
    con.query('INSERT INTO products SET ?', {
      product_name: ans.item,
      department_name: ans.department,
      price: ans.price,
      stock_quantity: ans.quantity
    }, function (err, res) {
      if (err) throw err;
      console.log(`

      =================================================================
            YOU ADDED THE FOLLOWING RECORD TO 'PRODUCTS' TABLE:
      =================================================================

                product_name:       ${ans.item}
                department_name:    ${ans.department}
                price:              ${ans.price}
                stock_quantity:     ${ans.quantity}

            `);
      // Take manager back to prompts
      startManager();
    });
  });
}

// Function to build table
function buildTable(res) {
  // Create empty array to hold table rows
  let tableRows = [];

  // Loop through the products and fetch data to build each row
  for (let i = 0; i < res.length; i++) {
    // Create empty row array
    let row = [];
    row.push(res[i].product_id, res[i].product_name, "$" + res[i].price.toFixed(2), res[i].stock_quantity, res[i].products_sold);
    tableRows.push(row);
  }
  // Create undefined data and output instances
  let config, data,
    output;

  // Create headear row to label each column
  let headerRow = ['Product ID', 'Name', 'Price', 'Stock Quantity', 'Quantity Sold'];

  // Add header row to front of data rows
  tableRows.unshift(headerRow);

  // Give 'data' the value of 'tableRows'
  data = tableRows;

  // Format cols
  config = {
    columns: {
      0: {
        alignment: 'center'
      },
      3: {
        alignment: 'center'
      },
      4: {
        alignment: 'center'
      }
    }
  };

  // Give 'output' the value of function table() with 'data' as argument to build table using 'table' npm package
  output = table(data, config);

  // Log the table
  console.log(`${output}
      
      `);
}

// Function to close connection
function exitApp() {
  con.end();
}