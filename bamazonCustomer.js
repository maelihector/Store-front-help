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

// Function to display products for sale and in stock to customer in a table
function startCustomer() {
  // Send SELECT command to mySQL to get products where the stock quantity is not 0
  con.query("SELECT * FROM products WHERE stock_quantity !=0", function (err, res) {
    if (err) throw err;

    // Create empty array to hold all product rows of table
    let tableRows = [];

    // Log greeting to customer before table displays
    console.log(`

    ~~*~~ WELCOME TO BAMAZON ~~*~~

    `);

    // Loop through returned results
    for (let i = 0; i < res.length; i++) {
      // Push product row to products table rows
      tableRows.push([res[i].product_id, res[i].product_name, "$" + res[i].price.toFixed(2), res[i].stock_quantity]);
    }

    // Create header row and add it to table
    let headerRow = ['Product ID', 'Name', 'Price', 'Quantity in Stock'];
    tableRows.unshift(headerRow);

    // Format the table
  let config = {
      columns: {
        3: {
          alignment: 'center'
        }
      }
    };

    // Give 'output' the value of function table() with tableRows and config as arguments to build the products table
  let output = table(tableRows, config);

    // Log the table of product to the customer
    console.log(`${output}
    
    `);

    // Create undefined variable for product that customer wants to purchase
    let productToPurchase;

    // Add prompt messages to get the id of the product the customer wants to purchase
    inquirer.prompt([{
        type: "input",
        name: "id",
        message: "What is the ID of the product you would like to purchase?",
        // Make sure the input is a number and that it matches an actual in-stock product product_id
        validate: function (value) {
          // Loop through existing products on table
          for (var i = 0; i < tableRows.length; i++) {
            // If the product exists, set the product's table row to be the productToPurchase value
            if (tableRows[i][0] == value) {
              productToPurchase = tableRows[i];
            }
          }
          // If productToPurchase value is not undefined return true
          if (productToPurchase !== undefined) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        // Ask customer the quantity of the product they want to purchase
        type: "input",
        name: "qty",
        message: "How many would you like to purchase?",
        // Make sure that the input number value is not greater than the current in-stock quantity of product
        validate: function (value) {
          if (value <= productToPurchase[3]) {
            return true;
          } else {
            console.log(`

            *  Sorry, we only have ${productToPurchase[3]} of ${productToPurchase[1]} in stock. *

            `);
            return false;
          }
        }
      }
      // Function that sends update query to the database
    ]).then((input) => {
      // Build query string:
      // Update stock quantity by subtracting the recent purchase quantity from the current stock quantity amount
      let setString = 'stock_quantity=stock_quantity-' + input.qty;
      // Update product sales by multiplying product price by the recent purchase quantity and adding the result to the current product sales amount
      setString += ', product_sales=price*' + input.qty + '+product_sales';
      // Update total amout of products sold by adding the recent purchase quantity to the current products sold amount
      setString += ', products_sold=products_sold+' + input.qty;

      // Send query to the database
      con.query("UPDATE products SET " + setString + " WHERE ?", [{
        product_id: input.id
      }], function (err, result) {
        if (err) throw err;
        let price = productToPurchase[2].slice(1);
        // Show the customer the purchase summary
        console.log(`

                                    *

                                *********

                      ~~~ Your order went through! ~~~

                        Your total today was: $${(price*input.qty).toFixed(2)}

        ${input.qty} of ${productToPurchase[1]}(s) will be shipped to you in 3-5 business days.

                                *********

                        THANK YOU FOR YOUR BUSINESS!

                                    *
        `);
        con.end();
      });
    });
  });
}