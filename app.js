const { response } = require("express");
const express = require("express");
const mysql = require("mysql");

const app = express();

app.set("view engine", "ejs");

let db_ready = false;

// create connection
// bitte hier user & password eintragen
const host = "localhost";
const user = "root";
const password = "";
const database = "aframe";
if (password == "") {
    console.log(
        "please set password for database connection in app.js line 15..."
    );
    return;
}
const db = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    //database: database,
});

// connect
db.connect((error) => {
    if (error) {
        throw error;
    }
    console.log("MySql connected");
});

// home
app.get("/", (req, res) => {
    if (!db_ready) {
        res.redirect("/setup");
        return;
    }
    let sql = "SELECT * FROM score";
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            console.log(results.length + " entries found in database");
            let retObj = JSON.stringify(results);
            retObj = JSON.parse(retObj);
            let score_arr = [];
            retObj.forEach((element) => {
                score_arr.push(element);
            });
            console.log(score_arr);
            console.log("sorting array...");
            // sort array by score (descending)...
            score_arr.sort((a, b) => b.score - a.score);
            let pos = 1;
            let retStr = "";
            score_arr.forEach((element) => {
                retStr +=
                    pos +
                    ". " +
                    element.firstname +
                    " " +
                    element.lastname +
                    " - " +
                    element.gamertag +
                    " : " +
                    element.score +
                    "\n";
                pos++;
            });
            console.log(retStr);
            res.render("index", { scoreboard: retStr });
        }
    });
});

app.get("/setup", async (req, res) => {
    if (db_ready) {
        res.redirect("/");
        return;
    }
    // drop db
    let sql = "DROP DATABASE if exists aframe;";
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            console.log(results);
            console.log("dropped db aframe...");
        }
    });
    // create aframe db
    console.log("creating schema...");
    sql = "CREATE SCHEMA IF NOT EXISTS aframe";
    query = db.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            console.log(results);
            console.log("schema created...");
        }
    });
    // use aframe as db
    console.log("request for using a frame as db...");
    sql = "USE aframe";
    query = db.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            console.log("using aframe as database...");
        }
    });
    // create score table
    console.log("creating score table...");
    sql =
        "CREATE TABLE score (ID int AUTO_INCREMENT, firstname varchar(255), lastname varchar(255), gamertag varchar(255), score int, PRIMARY KEY (ID));";
    query = db.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            console.log("score table successfully created");
        }
    });
    // fill aframe db
    console.log("filling score table with data...");
    let db_entries = [
        [1, "Nico", "Schroeder", "nicooopicoooo", 24],
        [2, "Donald", "Duck", "duckforcewuhu", 50],
        [3, "Mickey", "Mouse", "MickMous", 80],
        [4, "Daisy", "Duck", "daisyyydays_", 70],
        [5, "Dagobert", "Duck", "scroogemcduck", 42],
    ];
    sql =
        "INSERT INTO score (ID, firstname, lastname, gamertag, score) VALUES ?";
    query = db.query(sql, [db_entries], (err, results) => {
        if (err) {
            throw err;
        } else {
            console.log("Entry added");
        }
    });
    db_ready = true;
    res.redirect("/");
});

app.listen("8080", () => {
    console.log("Server started on port 8080");
});