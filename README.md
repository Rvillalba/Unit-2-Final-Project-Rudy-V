# Calling Card: Full Stack Web Application


## By Rudy Villalba


Calling Card is a full stack web application that lets users generate a digital business card to save and distribute with any device. The front end was developed with JavaScript and modern React components, and the back end was developed with Java and Spring Boot with MySQL for relational database creation and CRUD operations. Key features of Calling Card include:


* Live Card Preview
    * See changes to the card in real time as you interact with the creation form
* Card Download
    * Download and save cards as png files to your device's local storage
* Card Wallet
    * Create a user account to save generated cards and edit and download them at any time


## Getting Started


####    Once you have cloned the project repository, you will need to make an app.env file in the root of the back end project folder with the following variables:


### Environmental Variables


1. DB_HOST = "the hostname or IP address of the database server"
2. DB_PORT = "the port number of the database server"
3. DB_USER = "the username for the database server"
4. DB_PASSWORD = "the password for the database server account"
5. DB_NAME = "the specific name of the database"


## Links


View the basic wireframe [here](https://www.figma.com/design/Tpx8qXfkE20ngLl8DlqmGF/Final-Project-Wireframe?node-id=0-1&t=gNqqO9SME4CByU1C-1).

View the entity relationship diagram [here](https://www.figma.com/board/uwMvESzHFeNwxaQVl0xr6a/ERD---Calling-Card--SQL-DBD-?node-id=0-1&t=gNqqO9SME4CByU1C-1).

## Future Development


In its current iteration, Calling Card runs completely on the client side, with user accounts being saved in local storage. I would like to develop authentication to eventually host and deploy my project. I would also like to add APIs that will give users more customization options for card backgrounds and fonts.






