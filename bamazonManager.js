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
    }]).then(function (choice) {
        switch (choice.action) {
            case "View Products for Sale":
                viewTotalInventory();
                break;
            case "View Low Inventory":
                console.log("I don't have a function yet.");
                break;
            case "Add to Inventory":
                console.log("I don't have a function yet.");
                break;
            case "Add New Product":
                console.log("I don't have a function yet.");
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
startManager();

// viewInventory();