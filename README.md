# BAMAZON
## What is this?

Bamazon is an application that implements a simple command line based storefront using Node.js and mySQL  database.
## What does it do?
### Customer Interface

When initialized, the Customer Interface starts off by displaying all of the items for sale at Bamazon. The list includes: item ID, product name, and price.

After the items' list the customer is prompted to choose an item to purchase by inputting its item ID and then the desired quantity of the item. 

If the input quantity is able to be fulfilled by Bamazon, the order is fulfilled and the terminal displays the recent purchase and the total purchase price for the customer. 

If the input quantity is not able to be fulfilled, the user is shown the current quantity of said item available so they can try a new order with a fulfillable request .

If a successful purchase was made, the app updates the bamazon database accordingly. 

### Manager Interace
When initialized, the Manager Interface lists a set of menu options:

	? Manager Actions: (Use arrow keys)
	❯ View Products for Sale 
	  View Low Inventory 
	  Add to Inventory 
	  Add New Product
	  
The **View Products for Sale** option lists the current inventory of store items: item IDs, names, prices, and the quantity available in stock. 

The **View Low Inventory** option lists all items with an inventory count of lower than 5.

The **Add to Inventory** option displays a prompt that will let the manager add additional inventory to the target item.

	? Manager Actions: Add to Inventory
	? Select which product you want to add inventory to:
	Casual Oversized Baggy Off-Shoulder Shirt
	Baby Banana Infant Teether
	BLACK+DECKER Cordless Hand Vacuum
	❯ Digital Body Weight Scale
	Pet Grooming Glove
	Kindle Paperwhite E-reader
	SpongeBob SquarePants Board Game
	(Move up and down to reveal more choices)
After selecting the item, the manager can then input the quantity to be added to the item's stock quantity.


	? How much inventory would you like to add?

 The app then updates the bamazon database accordingly. 

The **Add New Product** option consists of four prompts that allow the manager to enter a completely new record into the 'products' table. 


	? Manager Actions: Add New Product 
	You are adding a new and unique product to 'products' table in 'bamazon' database. 
	? Input name of item: Example Item Name 
	? Choose the department the item belongs to: Toys & Games 
	? Input the price of the item: 34.66
	? Input the stock_quantity of item: 45

## How does it work?
### Get Set up

 

 1. Download the latest version of [Node.js](https://nodejs.org/en/)
 2. Download the right version of [MySQL ](https://dev.mysql.com/) database onto your machine. 
 3. Download a GUI like [Sequel Pro](https://www.sequelpro.com/) to create the initial MySQL database.
 4. Clone the 'bamazon' repository onto your machine.
 5. Run `npm install` in your terminal at the root of the repository.
 6. Start the MySQL server. 

#### The Customer Interface

 1. To initialize the Customer Interface, run the following in your terminal at the root of the repository:


	`node bamazonCustomer.js`

 2. Follow the prompts.
 3. If there is not enough quantity of the item you wish to purchase go back to step 1.
 4. Press `Ctrl+c` twice anytime you wish to quit the application.

#### The Manager Interface

 1. To initialize the Manager Interface, run the following in your terminal at the root of the bamazon repository:


	`node bamazonManager.js`

 2. Choose an option and/or follow the prompts.
 3. Press `Ctrl+c` twice anytime you wish to quit the application.

## Demo Videos

* bamazonCustomer.js (https://drive.google.com/file/d/1ndJIr8GIOvuuePscSoh5ae0eCLItXVbF/view)

* bamazonManager.js (https://drive.google.com/file/d/1xMue_Fu7MpxQRMBItlwwy0o99ij-fkax/view)

##  NPM Installs

#### [Inquire](https://www.npmjs.com/package/inquirer)
#### [MySQL](https://www.npmjs.com/package/mysql)
