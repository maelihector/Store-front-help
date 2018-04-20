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
// Function to display products for sale to customer at initialization of application.
function startBamazon() {
    con.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //console.log(res); // Check for appropriate response
        console.log(`

                            =================================================================

                                                ~~*~~ WELCOME TO BAMAZON ~~*~~
            `);
        console.log(`
               PLEASE LOOK THROUGH OUR PRODUCT LIST AND NOTE THE 'Product ID' OF THE ITEM(S) YOU WISH TO PURCHASE
            
                            =================================================================
            `);

        for (var i = 0; i < res.length; i++) { // Loop through the 'products',
            console.log(`
            Name: ${res[i].product_name}
            Price: $${res[i].price}
            Product ID: ${res[i].item_id}`) // and only return product name, price, and item_id with their respective values.
        }
        console.log(`
        =================================================================
                            END OF PRODUCTS LIST
        =================================================================
        `);
        // Add prompt messages to gather the product and amount of product the customer wants to purchase.
        inquirer.prompt([{
                type: "input",
                name: "id",
                message: "What is the ID of the product you would like to purchase?",
                validate: function (value) {    // Make sure the input is a number and that it matches one of our 'item_id's.
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
                    if (isNaN(value)) {         // Make sure that the input is a number value.
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        ]);
        con.end();
    })
}

startBamazon();