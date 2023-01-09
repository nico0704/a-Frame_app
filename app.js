const { response } = require("express");
const express = require("express");
var bodyParser = require('body-parser')
const mysql = require("mysql");
const { readFile } = require("fs").promises;

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// create connection
// bitte hier user, password und ggf. database eintragen
/*const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "",
});
*/

// connect
/*db.connect((error) => {
    if (error) {
        throw error;
    }
    console.log("MySql connected");
});
*/

// home
app.get("/", async (req, res) => {
    let html = await readFile("./index.html", "utf-8");
    res.send(html);
});


app.listen("8080", () => {
    console.log("Server started on port 8080");
});