// Require packages and bring into scope
const mysql = require('mysql');
const inquirer = require('inquirer');
const {
  table
} = require('table');

// Connect to the mySQl database with necessary credentials and specify database name
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
  startCustomer();
});

// Function to display products for sale to customer at initialization of application
function startCustomer() {
  con.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Create empty array to hold table rows
    let tableRows = [];
    //console.log(res); // Check for appropriate response
    console.log(`

                  ~~*~~ WELCOME TO BAMAZON ~~*~~

    `);
    // Loop through returned results and fetch data to build each row
    for (let i = 0; i < res.length; i++) {
      // Create empty row array
      let row = [];
      row.push(res[i].item_id, res[i].product_name, "$" + res[i].price.toFixed(2), res[i].stock_quantity);
      tableRows.push(row);
    }
    // Create undefined data and output instances
    let config, data,
      output;
    // Create headear row to label each column
    let headerRow = ['Product ID', 'Name', 'Price', 'Quantity in Stock'];
    // Add header row to front of data rows
    tableRows.unshift(headerRow);
    // Give 'data' the value of 'tableRows'
    data = tableRows;

    // Format cols
    config = {
      columns: {
        3: {
          alignment: 'center'
        }
      }
    };

    // Give 'output' the value of function table() with 'data' as argument to build table using 'table' npm package
    output = table(data, config);

    // Log the table
    console.log(`${output}
    
    `);
    // Add prompt messages to gather the product and amount the customer wants to purchase
    inquirer.prompt([{
        type: "input",
        name: "id",
        message: "What is the ID of the product you would like to purchase?",
        // Make sure the input is a number and that it matches an actual product item_id
        validate: function (value) {
          if (isNaN(value) === false && parseInt(value) <= res.length && parseInt(value) > 0) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        type: "input",
        name: "qty",
        message: "How many would you like to purchase?",
        validate: function (value) {
          // Make sure that the input is a number value
          if (isNaN(value)) {
            return false;
          } else {
            return true;
          }
        }
      }

      // Funtion to check if Bamazon has enough of the product to meet the customer's request
    ]).then((input) => {
      // Fetch product data
      let itemToPurchase = (input.id) - 1;
      let productName = (res[itemToPurchase].product_name);
      let purchaseQuantity = parseInt(input.qty);
      let currentQuantity = (res[itemToPurchase].stock_quantity);
      let currentSales = (res[itemToPurchase].product_sales);
      let currentTotalSold = (res[itemToPurchase].products_sold);
      // Gather totol cost to customer by grabing the 'price' and multiplying it by the purchase quantity
      let totalCost = parseFloat(((res[itemToPurchase].price) * purchaseQuantity).toFixed(2));
      // If Bamazon's stock_quantity value is greater than or equal to the customer's quantity request, allow purchase to go through
      if (currentQuantity >= purchaseQuantity) {
        con.query("UPDATE Products SET ? WHERE ?", [{
            stock_quantity: (currentQuantity - purchaseQuantity),
            product_sales: (currentSales + totalCost),
            products_sold: (currentTotalSold + purchaseQuantity)
          },
          {
            item_id: (input.id)
          }
        ], function (err, result) {
          if (err) throw err;
          // Show the customer the total cost of their purchase
          console.log(`
                                      *********

                              ~~Your order went through!~~

                              Your total today was: $${totalCost}

            ${purchaseQuantity} of ${productName}(s) will be shipped to you in 3-5 business days.

                                      *********

                            THANK YOU FOR YOUR BUSINESS!
          `);
          con.end();
        });
      } else {
        console.log(`

        *** Sorry, we have ${currentQuantity} left of ${productName} in stock. ***

                `);
        con.end();
      }
    });
  });
}