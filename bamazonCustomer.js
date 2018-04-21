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
function startCustomer() {
    con.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //console.log(res); // Check for appropriate response
        console.log(`

                            =================================================================

                                                ~~*~~ WELCOME TO BAMAZON ~~*~~

               PLEASE LOOK THROUGH OUR PRODUCT LIST AND NOTE THE 'Product ID' OF THE ITEM(S) YOU WISH TO PURCHASE
            
                            =================================================================
            `);
        // Loop through the 'products',
        for (var i = 0; i < res.length; i++) { 
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
                validate: function (value) { // Make sure the input is a number and that it matches one of our 'item_id's.
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
                    if (isNaN(value)) { // Make sure that the input is a number value.
                        return false;
                    } else {
                        return true;
                    }
                }
            }
            // Funtion to check if Bamazon has enough of the product to meet the customer's request. 
        ]).then(function (input) {
            var itemToPurchase = (input.id) - 1;
            var purchaseQuantity = parseInt(input.qty);
            var currentQuantity = (res[itemToPurchase].stock_quantity);
            var totalCost = parseFloat(((res[itemToPurchase].price) * purchaseQuantity).toFixed(2)); // Gather totol cost to customer by grabing the 'price' of the input.id, and and multiplying it by the purchase quantity, and returning a dollar amount.
            var productName = (res[itemToPurchase].product_name);
            // Check if Bamazon's stock_quantity value is greater than or equal to the customer's quantity request.
            if (currentQuantity >= purchaseQuantity) {
                con.query("UPDATE Products SET ? WHERE ?", [{
                        // If so, stock_quantity by subtracting the customer's purchase quantity from the table's stock_quantity.
                        stock_quantity: (currentQuantity - purchaseQuantity)
                    },
                    {
                        item_id: (input.id)
                    }
                ], function (err, result) {
                    if (err) throw err;
                    // Show the customer the total cost of their purchase.
                    console.log(`
                                ~~Your order went through!~~

                              Your total today was: $${totalCost} 

                        ${purchaseQuantity} of ${productName}(s)

                       will be shipped to you in 3-5 business days.

                                        *********

                                THANK YOU FOR YOUR BUSINESS!
                    `);
                    con.end();
                });
            } else {
                console.log(`
                Sorry, we have insufficient quantity in stock, here is the quantity we currently have: ${currentQuantity}
                `);
                con.end();
            }
        });
    })  
}
startCustomer();