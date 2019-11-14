# Bamazon Store

## What is Bamazon?

Bamazon Store is a [Node](https://nodejs.org/en/), store-front, CLI (command-line interface) application with three unique interfaces customized for customers and employees.

## How Does Bamazon Work?

For data storage Bamazon uses the [MySQL](https://www.mysql.com/) relational database management system (or RDBMS) with the following two table structures:

1. `Products`

|product_id         |product_name       |department_name      |price                    |stock_quantity          |products_sold       |product_sales        |
|--------|--------|-----------|--------|------------|----------------|-------------|
|1|GoPro HERO5 Black|Electronics|249.00|15|2|498.00|
|2|Pet Grooming Glove|Pet Supplies|15.50|60        |40|620.00|


2. `Departments`

|department_id              |department_name          |overhead_costs       |
|--------|--------|-----------|
|1|Electronics|1000.00
|2|Pet Supplies|150.00

To run on the command line Bamazon uses the [Node.js](https://nodejs.org/en/) run-time environment.

To help achieve some tasks Bamazon uses several third-party [Node.js](https://nodejs.org/en/) modules on the [npm](npmjs.com) registry:

 - All CRUD (Create, Read, Update, Delete) operations triggered by Bamazon's CLIs send [raw SQL](https://en.wikipedia.org/wiki/SQL) commands to the [MySQL](https://www.mysql.com/) database server with the help of the [Node.js](https://nodejs.org/en/) driver **[mysql](https://www.npmjs.com/package/mysql)**.

 - The **[inquirer](https://www.npmjs.com/package/inquirer)** module provides the user interface and the inquiry session flow used to capture user commands.

 - The **[table](https://www.npmjs.com/package/table)** module is used for building tables that better display Bamazon data on the terminal.


## What does Bamazon do?

Bamazon presents three separate interfaces:

1. The **Customer** interface allows for the viewing and purchasing of Bamazon products.

2. The **Manager** interface allows for viewing of all inventory, viewing just low-in-stock inventory, adding stock to inventory, and for adding new products to Bamazon departments.

3.  The **Supervisor** interface allows for the viewing of total sales and profits by department, and for adding new departments to Bamazon.


### The Customer Interface:

When initialized, the application queries for products that are in stock in the Bamazon database and displays them to the customer in a table that includes the product ID, name, price, and quantity in stock.

Following the table, the interface prompts the customer to input the ID of the product they wish to purchase:

```
? What is the ID of the product you would like to purchase?
```
Once a valid ID is entered, the interface prompts the customer to input the quantity they want to purchase:
```
? How many would you like to purchase?
```
Once a quantity amount is entered, the application checks if it is greater than the current in-stock quantity amount, and if so the order **is not** fulfilled and returns false. The customer is shown the current quantity available so they can enter a new amount.

If the quantity entered not greater than the current in-stock quantity, the order **is** fulfilled by the application, and sends an `UPDATE` [SQL](https://en.wikipedia.org/wiki/SQL)  command to the database to update the changes to the product's record that include a change to the quantity in stock, total products sold, and total product sales.  The application then displays a summary of the purchase to the customer, ends Bamazon's connection to the database server, and closes the customer interface.

### The Manager Interface:

When initialized, the manager interface prompts the manager to choose an action from the following list:

```
? Manager Actions: (Use arrow keys)
❯ View All Inventory
  View Low Inventory
  Add to Inventory
  Add New Product
  Exit
```

  - The **View All Inventory** action displays all of Bamazon's inventory in a table that includes the product's ID, name, price, quantity in stock, and total quantity sold.

  - The **View Low Inventory** option displays Bamazon inventory products with stock quantity of 5 or lower in a table that includes the product's ID, name, price, quantity in stock, and total quantity sold.

  - The **Add to Inventory** option initializes with a prompt that asks the manager to select the product they want to add inventory to:

```
? Select which product you want to add inventory to:
  Casual Oversized Baggy Off-Shoulder Shirt
  Baby Banana Infant Teether
  BLACK+DECKER Cordless Hand Vacuum
❯ Digital Body Weight Scale
  Pet Grooming Glove
  Kindle Paperwhite E-reader
  SpongeBob SquarePants Board Game
(Move up and down to reveal more choices)
```

After selecting a product, the manager is prompted to input the number quantity to be added to the products's stock quantity.

```
? How much inventory would you like to add?
```

After a valid input, the application sends an `UPDATE` [SQL](https://en.wikipedia.org/wiki/SQL)  command to the database to update the changes to the product's stock quantity. The application then displays a summary of the update to the manager.



- The **Add New Product** option initializes a four prompt session flow to gather a new product's information:

```
?  Input the name of the new product: |
```

```
?  Choose the department the product belongs to:
  Clothing
  Baby
  Vaccums & Floor Care
❯ Health & Household
  Pet Supplies
  Electronics
(Move up and down to reveal more choices)
```
```
? Input the sale price of the product: |
```
```
? Input the stock_quantity of the product: |
```

After all product information has been entered, the application sends an `INSERT INTO`  [SQL](https://en.wikipedia.org/wiki/SQL)  command to the database to add the new product.

The application then displays a summary of the new product added.

- The **Exit** option simply ends Bamazon's connection to the database server and closes the manager interface.

### The Supervisor Interface:

When initialized, the supervisor interface prompts the supervisor to choose an action from a lists a of options:

```
?  Supervisor Actions:  (Use arrow keys)
❯ View Products Sales by Department
  Create New Department
  Exit
```

- The **View Products Sales by Department** action sends a `SELECT` query command that:

	1. Performs a `LEFT JOIN` on the `departments` table `department_name` column and the `products` table `department_name` column,
	2. Performs the aggregate function `SUM` on the `products` table `product_sales` column,
	3. Returns each calculation under the alias `total_department_sales`,
	4. Separates each department with the `GROUP BY` `departments` table `department_name` column,
	5. Orders the return data with the `ORDER BY` `departments` table `department_id` column.

	With the returned data, the application calculates the total profit of each department by taking the difference of the department's overhead costs and its total sales, and then displays the data to the console in a table that includes the department_id, department_name, overhead_costs, product_sales, and total _profit.

- The **Create New Department** option initializes a two prompt session flow to gather a new department's information:

```
?  Input name of new department:  |
```
```
?  Input overhead costs for the department:  |
```

After the department information has been entered, the application sends an `INSERT INTO`  [SQL](https://en.wikipedia.org/wiki/SQL)  command to the database to add the new department.

The application then displays a summary of the new department added.

- The **Exit** option simply ends Bamazon's connection to the database server and closes the supervisor interface.

## How does it work?

### Get set up first

1. Download the latest version of [Node.js](https://nodejs.org/en/)

2. Download the right version of [MySQL ](https://dev.mysql.com/) database onto your machine.

3. Download a GUI like [Sequel Pro](https://www.sequelpro.com/) to create the initial MySQL database.

4. Clone the 'bamazon' repository onto your machine.

5. Run `$ npm install` in your terminal at the root of the repository.

6. Start the MySQL server.


#### The Customer Interface

1. To initialize the Customer Interface, run the following in your terminal at the root of the repository:

	`$ node bamazonCustomer.js`



2. Follow the prompts.

3. If there is not enough quantity of the item you wish to purchase go back to step 1.

4. Press `Ctrl+c` anytime you wish to quit the application.


#### The Manager Interface

1. To initialize the Manager Interface, run the following in your terminal at the root of Bamazon Store repository:

	`$ node bamazonManager.js`



2. Choose an option and/or follow the prompts.

3. Press `Ctrl+c` anytime you wish to quit the application.


## Demo Videos 

* [bamazonCustomer](https://drive.google.com/file/d/1ndJIr8GIOvuuePscSoh5ae0eCLItXVbF/view)

* [bamazonManager](https://drive.google.com/file/d/1xMue_Fu7MpxQRMBItlwwy0o99ij-fkax/view)

* [bamazonSupervisor](https://drive.google.com/file/d/1z-hdEhGwtYGhnQP12hUvs_WJfXh4rxVb/view)

## Technologies Used

[Node.js](https://nodejs.org/en/)



* [Inquire](https://www.npmjs.com/package/inquirer)



* [MySQL](https://www.npmjs.com/package/mysql)



[MySQL ](https://dev.mysql.com/)



[Sequel Pro](https://www.sequelpro.com/)