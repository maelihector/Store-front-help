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
// Function to display prompt at initialization of application.
function startManager() {
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "Manager Actions:",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(function (choice) {
        switch (choice.action) {
            case "View Products for Sale":
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
        }
    });
}
// Function to view total inventory in 'products' table.
function viewTotalInventory() {
    con.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //console.log(res); // Check for appropriate response
        console.log(`
                
                =================================================================
                                    BAMAZON'S TOTAL INVENTORY
                =================================================================
                `);
        for (var i = 0; i < res.length; i++) { // Loop through the 'products',
            console.log(`
                item_id:            ${res[i].item_id}
                product_name:       ${res[i].product_name}
                price:              $${res[i].price}
                stock_quantity:     ${res[i].stock_quantity}`) // and return all current inventory.
        }
        console.log(`
                =================================================================
                                        END OF INVENTORY
                =================================================================
            `);
        startManager();
    })
}
// Function to view inventory with quantity < 5 in the 'products' table.
function viewLowInventory() {
    con.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log(`
                
        =================================================================
                            BAMAZON'S LOW INVENTORY
        =================================================================
        `);
        // Loop through the 'products',
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) { // and only return those products with a stock_quantity < 5.
                console.log(`
                item_id:            ${res[i].item_id}
                product_name:       ${res[i].product_name}
                price:              $${res[i].price}
                stock_quantity:     ${res[i].stock_quantity}`)
            }
        }
        console.log(`
        =================================================================
                            END OF LOW INVENTORY
        =================================================================
        `);
        startManager();
    });
}
// Function to add stock_quantity amount to any product in the 'products' table.
function addToInventory() {
    con.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        // Create empty var to hold the list of products.
        var itemArray = [];
        // Push each item into the itemArray var.
        for (var i = 0; i < res.length; i++) {
            itemArray.push(res[i].product_name);
        }
        inquirer.prompt([{
            type: "list",
            name: "product",
            choices: itemArray,
            message: "Select which product you want to add inventory to:"
        }, {
            type: "input",
            name: "qty",
            message: "How much inventory would you like to add?",
            validate: function (value) { // Make sure input value is a number.
                if (isNaN(value) === false) {
                    return true;
                } else {
                    return false;
                }
            }
        }]).then(function (ans) {
            // Loop through results
            for (var i = 0; i < res.length; i++) {
                var productName = (res[i].product_name);
                var currentQuantity = res[i].stock_quantity;
                // if Manager input equals a value of product_name,
                if (productName === ans.product) {
                    con.query('UPDATE products SET ? WHERE ?', [{
                            // update said product's stock_quantity by adding Manager's input value.
                            stock_quantity: currentQuantity + parseInt(ans.qty)
                        },
                        {
                            product_name: ans.product
                        }
                    ], function (err, res) {
                        if (err) throw err;
                        console.log(`
        =================================================================

        Rows affected: ${res.affectedRows}
        
        The stock_quantity of '${ans.product}' was updated.

        =================================================================
                        `);
                        startManager();
                    });
                }
            }
        })
    });
}
//allows manager to add a completely new product to store
function addProduct() {
    console.log(`You are adding a new and unique product to 'products' table in 'bamazon' database.`);
    var departments = [];
    // Grab name of department_names for Manager to chose from.
    con.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            departments.push(res[i].department_name);
        }
    })
    inquirer.prompt([{
        type: "input",
        name: "item",
        message: "Input name of item:",
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
        message: "Choose the department the item belongs to:",
        choices: departments
    }, {
        type: "input",
        name: "price",
        message: "Input the price of the item:",
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
        message: "Input the stock_quantity of item:",
        validate: function (value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function (ans) {
        console.log(`
                
        =================================================================
            YOU ADDED THE FOLLOWING RECORD TO 'PRODUCTS' TABLE:
        =================================================================
        `);
        con.query('INSERT INTO products SET ?', {
            product_name: ans.item,
            department_name: ans.department,
            price: ans.price,
            stock_quantity: ans.quantity
        }, function (err, res) {
            if (err) throw err;
            console.log(`
            product_name:       ${ans.item}
            department_name:    ${ans.department}
            price:              ${ans.price}
            stock_quantity:     ${ans.quantity}

            `);
            startManager();
        })
    });
}
startManager();