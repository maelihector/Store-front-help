// Require needed npm packages and bring into scope of js file.
var mysql = require('mysql');
var inquirer = require('inquirer');
// Connect to mySQl database with necessary credentials and specify database name.
var con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});
// Return the error description if there is an error when connecting to the database.
con.connect(function (err) {
    if (err) throw err;
});

function startManager() {
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "Manager Actions:",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]);
}
startManager();