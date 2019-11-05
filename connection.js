const mysql = require("mysql");

var mySQLConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Cs460app@",
    database:"restaurant_review",
    multipleStatements:true
});

mySQLConnection.connect((err) => {
    if(!err)
    {
        console.log("Connected");
    }
    else
    {
        console.log("Connection Failed");
    }
});

module.exports = mySQLConnection;