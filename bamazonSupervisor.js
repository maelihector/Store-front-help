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
  startSupervisor();
});

// Function to display prompt at initialization of application
function startSupervisor() {
  console.log(`

  * Please Choose an Action *

`);
  inquirer.prompt([{
    type: "list",
    name: "action",
    message: "Supervisor Actions:",
    choices: ["View Products Sales by Department", "Create New Department", "Exit"]
  }]).then(choice => {
    switch (choice.action) {
      case "View Products Sales by Department":
        viewTotalDepartmentSales();
        break;
      case "Create New Department":
        createDepartment();
        break;
      case "Exit":
        exitApp();
        break;
    }
  });
}

// Function to view total department sales
function viewTotalDepartmentSales() {
  // Build query to return total sales
  // Fetch data of columns 'department_id, department_name, and overhead_costs from the table 'departments'
  let query = "SELECT departments.department_id, departments.department_name, departments.overhead_costs, ";
  // Use the aggregate function SUM on the column product_sales in 'products' table, and return the aggregate as alias 'total_department_sales'
  query += "SUM(products.product_sales) AS total_department_sales ";
  // Take table 'departments' and perform a LEFT JOIN with table 'products', join tables ON respective columns of 'department_name'
  query += "FROM departments LEFT JOIN products ON departments.department_name=products.department_name ";
  // Using table 'departments', return results GROUPed by 'department_name', and ORDER BY 'department_id'
  query += "GROUP BY departments.department_name ORDER BY departments.department_id";
  // Make query using built query string
  con.query(query, function (err, res) {
    if (err) throw err;
    //console.log(res); // Check for appropriate response
    // Create empty array to hold table rows
    let tableRows = [];
    // Loop through returned results and fetch data to build each row
    for (let i = 0; i < res.length; i++) {
      let row = [];
      // Make sure to include newly added departments that have yet to have products
      if (res[i].total_department_sales === null) {
        res[i].total_department_sales = 0.00;
      }
      let totalProfit = res[i].total_department_sales - res[i].overhead_costs;
      row.push(res[i].department_id, res[i].department_name, res[i].overhead_costs.toFixed(2), res[i].total_department_sales.toFixed(2), totalProfit.toFixed(2));
      tableRows.push(row);
    }
    // Call function to create a table
    createTable(tableRows);
  });
}

function createTable(tableData) {
  // Create undefined data and output instances
  let data,
    output;
  // Create headear row to label each column
  let headerRow = ['department_id', 'department_name', 'overhead_costs', 'product_sales', 'total_profit'];
  // Add header row to front of data rows
  tableData.unshift(headerRow);
  // Give 'data' the value of 'tableData'
  data = tableData;
  // Give 'output' the value of function table() with 'data' as argument to build table using 'table' npm package
  output = table(data);
  // Log the table
  console.log(output);
  // Take supervisor back to prompts
  startSupervisor();
}

// Function to allow supervisor to add a new department
function createDepartment() {
  // Get data from user input
  inquirer.prompt([{
    type: "input",
    name: "department",
    message: "Input name of new department:",
    validate: function (value) {
      if (value) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    type: "input",
    name: "overhead",
    message: "Input overhead costs for the department:",
    validate: function (value) {
      if (isNaN(value) === false) {
        return true;
      } else {
        return false;
      }
    }
  }]).then(ans => {
    // Insert new data into table 'departments'
    con.query('INSERT INTO departments SET ?', {
      department_name: ans.department,
      overhead_costs: ans.overhead
    }, (err) => {
      if (err) throw err;
      console.log(`

      =================================================================
      YOU ADDED THE FOLLOWING RECORD TO 'DEPARTMENTS' TABLE:
      =================================================================

                department_name:    ${ans.department}
                overhead_costs:    ${ans.overhead}

      `);
      // Take supervisor back to prompts
      startSupervisor();
    });
  });
}

// Function to close connection
function exitApp() {
  con.end();
}