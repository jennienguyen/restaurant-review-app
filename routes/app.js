const express = require('express');
const router = express.Router();
const mySQLConnection = require("../connection");
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home');
});

router.get('/users_page', function (req,res,next) {
    res.render('users_page');
});

router.get('/business_page', function(req,res,next) {
    res.render('business_page');
});

router.get('/execute_queries', function (req,res,next) {
    res.render('execute_queries_page');
});

router.get('/reviews_page', function (req,res,next) {
    res.render('reviews_page');
});
router.get('/checkins_page', function (req,res,next) {
    res.render('checkins_page');
});

//USERS
router.post("/users_insert", urlencodedParser, function (req, res) {
    const user_id = Math.floor(Math.random()*Number.MAX_SAFE_INTEGER);
    const name = req.body.name;
    const sql = `INSERT INTO users (user_id,name) VALUES (?,?)`;


    mySQLConnection.query(sql, [user_id,name], function(err, result){
        if(err) throw err;
        console.log("User inserted");
    });
    res.send("User " +name+ " has been inserted!");
});

router.post("/users_delete", urlencodedParser, function(req, res) {
    const user_id = req.body.user_id;
    const name = req.body.name;
    const sql = `DELETE FROM users WHERE user_id = ?`;

    mySQLConnection.query(sql, [user_id], function(err, result){
        if(err) throw err;
        console.log("User deleted");
    });
    res.send("User " + name + " has been deleted!");
});

router.post("/users_update", urlencodedParser, function (req,res) {
    const user_id = req.body.user_id;
    const name = req.body.name;
    console.log(name);
    console.log(user_id);

    const new_name = req.body.new_name;
    console.log(new_name);
    const sql = `UPDATE users SET users.name = ? WHERE users.user_id = ?`;

    mySQLConnection.query(sql, [new_name,user_id], function(err,result){
        if(err) throw err;
        console.log("User updated!");
    });
});
//BUSINESS
router.post("/business_insert", urlencodedParser, function (req, res) {
    const business_id = Math.floor(Math.random()*Number.MAX_SAFE_INTEGER);
    const business_name = req.body.business_name;
    const active = req.body.active;
    const categories = req.body.categories;
    const sql = `INSERT INTO business (business_id,business_name,active, categories) VALUES (?,?,?,?)`;

    mySQLConnection.query(sql, [business_id,business_name,active,categories], function(err, result){
        if(err) throw err;
        console.log("Business inserted");
    });
    res.send("Business " +business_name+ " has been inserted!");
});
router.post("/business_delete", urlencodedParser, function(req, res) {
    const business_id = req.body.business_id;
    const business_name = req.body.business_name;
    const sql = `DELETE FROM business WHERE business.business_id = ?`;

    mySQLConnection.query(sql, [business_id], function(err, result){
        if(err) throw err;
        console.log("Business deleted");
    });
    res.send("Business " + business_name + " has been deleted!");
});
router.post("/business_update", urlencodedParser, function (req,res) {
    const business_id = req.body.business_id;
    const old_business_name = req.body.old_business_name;
    console.log(old_business_name);
    console.log(business_id);

    const new_business_name = req.body.new_business_name;
    const active = req.body.active;
    const categories = req.body.categories;
    console.log(new_business_name);
    const sql = `UPDATE business SET business.business_name = ?, business.active = ?, business.categories = ? WHERE business.business_id = ?`;

    mySQLConnection.query(sql, [new_business_name, active, categories, business_id], function(err,result){
        if(err) throw err;
        console.log("Business updated!");
    });
    res.send("Business " + old_business_name + " has been updated to " + new_business_name + "!");
});
//REVIEWS
    router.post("/reviews_insert", urlencodedParser, function (req, res) {
        const review_id = Math.floor(Math.random()*Number.MAX_SAFE_INTEGER);
        const business_id = req.body.business_id;
        const user_id = req.body.user_id;
        const stars = req.body.stars;
        const review_text = req.body.review_text;
        const sql = `INSERT INTO reviews (review_id,business_id,user_id,stars, review_text) VALUES (?,?,?,?,?)`;

        mySQLConnection.query(sql, [review_id,business_id,user_id,stars,review_text], function(err, result){
            if(err) throw err;
            console.log("Review inserted");
        });
        res.send("Review " + review_id + " has been inserted!");
    });
router.post("/reviews_delete", urlencodedParser, function(req, res) {
    const review_id = req.body.review_id;
    const sql = `DELETE FROM reviews WHERE review_id = ?`;

    mySQLConnection.query(sql, [review_id], function(err, result){
        if(err) throw err;
        console.log("Review deleted");
    });
    res.send("Review " + review_id + " has been deleted!");
});
router.post("/reviews_update", urlencodedParser, function (req,res) {
    const review_id = req.body.review_id;
    const stars = req.body.stars;
    const review_text = req.body.review_text;
    const sql = `UPDATE reviews SET stars = ?, review_text = ? WHERE review_id = ?`;

    mySQLConnection.query(sql, [stars, review_text, review_id], function(err,result){
        if(err) throw err;
        console.log("Review updated!");
    });
    res.send("Review " + review_id + " has been updated!");
});


//CHECKINS
router.post("/checkins_insert", urlencodedParser, function (req,res) {
    const date = req.body.date;
    const business_id = req.body.business_id;

    console.log(date);
    let sql;
    if (date == 'monday') {
        sql = `UPDATE checkins SET monday = monday + 1 WHERE checkins.business_id = ?`;
    } else if (date == 'tuesday') {
        sql = `UPDATE checkins SET tuesday = tuesday + 1 WHERE checkins.business_id = ?`;
    } else if (date == 'wednesday') {
        sql = `UPDATE checkins SET wednesday = wednesday + 1 WHERE checkins.business_id = ?`;
    } else if (date == 'thursday') {
        sql = `UPDATE checkins SET thursday = thursday + 1 WHERE checkins.business_id = ?`;
    } else if (date == 'friday') {
        sql = `UPDATE checkins SET friday = friday + 1 WHERE checkins.business_id = ?`;
    } else if (date == 'saturday') {
        sql = `UPDATE checkins SET saturday = saturday + 1 WHERE checkins.business_id = ?`;
    } else {
        sql = `UPDATE checkins SET sunday = sunday + 1 WHERE checkins.business_id = ?`;
    }

    mySQLConnection.query(sql, [business_id], function(err,result){
        if(err) throw err;
        console.log("Checkin updated!");
    });
    res.send("Checkin on " + date + " was added!");
});
router.post("/checkins_delete", urlencodedParser, function (req,res) {
    const date = req.body.date;
    const business_id = req.body.business_id;

    console.log(date);

    let sql;
    if (date == 'monday') {
        sql = `UPDATE checkins SET monday = monday - 1 WHERE checkins.business_id = ?`;
    } else if (date == 'tuesday') {
        sql = `UPDATE checkins SET tuesday = tuesday - 1 WHERE checkins.business_id = ?`;
    } else if (date == 'wednesday') {
        sql = `UPDATE checkins SET wednesday = wednesday - 1 WHERE checkins.business_id = ?`;
    } else if (date == 'thursday') {
        sql = `UPDATE checkins SET thursday = thursday - 1 WHERE checkins.business_id = ?`;
    } else if (date == 'friday') {
        sql = `UPDATE checkins SET friday = friday - 1 WHERE checkins.business_id = ?`;
    } else if (date == 'saturday') {
        sql = `UPDATE checkins SET saturday = saturday - 1 WHERE checkins.business_id = ?`;
    } else {
        sql = `UPDATE checkins SET sunday = sunday - 1 WHERE checkins.business_id = ?`;
    }

    mySQLConnection.query(sql, [ business_id], function(err,result){
        if(err) throw err;
        console.log("Checkin updated!");
    });
    res.send("Checkin on " + date + " was removed!");
});

router.post("/query1", urlencodedParser, function(req, res) {
    const value = req.body.value;

    const sql = " SELECT DISTINCT users.name\n" +
        "FROM users\n" +
        "WHERE users.user_id IN (SELECT reviews.user_id\n" +
        "\t\t\t\t   FROM reviews\n" +
        "                   GROUP BY reviews.user_id\n" +
        "                   HAVING  count(*) >=?);"

    mySQLConnection.query(sql, [value], function(err,result){
        if(err) throw err;
        console.log("Query 1 executed");
        res.send(result);
    });

});

router.post("/query2", urlencodedParser, function(req, res) {
    const value = req.body.value;
    const operator = req.body.operator;

    let sql;
    if (operator == 'less') {
        sql = "SELECT DISTINCT users.name\n" +
            "FROM users\n" +
            "WHERE users.user_id IN (SELECT reviews.user_id\n" +
            "\t\t\t\t   FROM reviews\n" +
            "                   GROUP BY reviews.user_id\n" +
            "                   HAVING  count(*) >=?);"
    } else {
        sql = "SELECT DISTINCT users.name\n" +
            "FROM users\n" +
            "WHERE users.user_id IN (SELECT reviews.user_id\n" +
            "\t\t\t\t   FROM reviews\n" +
            "                   GROUP BY reviews.user_id\n" +
            "                   HAVING  count(*) <=?);"
    }

    mySQLConnection.query(sql, [operator], function(err,result){
            if(err) throw err;
            console.log("Query 2 executed");
            res.send(result);
        });

});

router.post("/query3", urlencodedParser, function(req, res) {
    const operator = req.body.operator;
    const sql = "SELECT business.business_name\n" +
        "FROM business\n" +
        "WHERE business.active = ?;"
    mySQLConnection.query(sql, [operator], function(err,result){
        if(err) throw err;
        console.log("Query 3 executed");
        res.send(result);
    });
});

router.post("/query4", urlencodedParser, function(req, res) {
    const categories = req.body.value1;
    const stars = req.body.value2;
    const operator = req.body.value3;
    let sql;
    if (operator == 'above') {
        sql = "SELECT business.business_name, business.active, business.categories\n" +
            "FROM business\n" +
            "WHERE business.categories = ?\n" +
            "\tAND business.business_id IN (SELECT reviews.business_id\n" +
            "\t\t\t\t\t\t\t\tFROM reviews\n" +
            "\t\t\t\t\t\t\t\tGROUP BY reviews.business_id\n" +
            "\t\t\t\t\t\t\t\tHAVING avg(reviews.stars) >= ?);"
    } else {
        sql = "SELECT business.business_name, business.active, business.categories\n" +
            "FROM business\n" +
            "WHERE business.categories = ?\n" +
            "\tAND business.business_id IN (SELECT reviews.business_id\n" +
            "\t\t\t\t\t\t\t\tFROM reviews\n" +
            "\t\t\t\t\t\t\t\tGROUP BY reviews.business_id\n" +
            "\t\t\t\t\t\t\t\tHAVING avg(reviews.stars) <= ?);"
    }

    mySQLConnection.query(sql, [categories, stars], function(err,result){
        if(err) throw err;
        console.log("Query 4 executed");
        res.send(result);
    });


});


router.post("/query5", urlencodedParser, function(req, res) {

    const number = req.body.value1;

    const sql = "SELECT count(*)\n" +
        "\tFROM business B, checkins C\n" +
        "\tWHERE C.friday >= ? AND C.business_id = B.business_id;";
    mySQLConnection.query(sql, [number], function(err,result){
        if(err) throw err;
        console.log("Query 4 executed");
        res.send(result);
    });
});

router.post("/query6", urlencodedParser, function(req, res) {

    const value1 = req.body.value1;
    const sql = "SELECT R.review_text\n" +
        "FROM business B, reviews R\n" +
        "WHERE B.business_name = ? AND\n" +
        "\tR.business_id = B.business_id";
    mySQLConnection.query(sql, [value1], function(err,result){
        if(err) throw err;
        console.log("Query 6 executed");
        res.send(result);
    });
});

router.post("/query7", urlencodedParser, function(req, res) {

    const value1 = req.body.value1;
    const value2 = req.body.value2;
    const value3 = req.body.value3;
    let sql;
    if (value1 == 'have') {
        sql = "SELECT DISTINCT B.business_name\n" +
            "FROM business B\n" +
            "WHERE B.business_id IN(SELECT R.business_id\n" +
            "\t\t\t\t\tFROM reviews R\n" +
            "\t\t\t\t\tWHERE R.stars = ? OR R.stars = ?)";
    } else {
        sql = "SELECT DISTINCT B.business_name\n" +
            "FROM business B\n" +
            "WHERE B.business_id NOT IN(SELECT R.business_id\n" +
            "\t\t\t\t\tFROM reviews R\n" +
            "\t\t\t\t\tWHERE R.stars = ? OR R.stars = ?)";
    }
    mySQLConnection.query(sql, [value2, value3], function(err,result){
        if(err) throw err;
        console.log("Query 7 executed");
        res.send(result);
    });
});

router.post("/query8", urlencodedParser, function(req, res) {

    const value1 = req.body.value1;
    const sql = "SELECT avg(R.stars), count(*)\n" +
        "FROM business B, reviews R\n" +
        "WHERE UPPER(B.business_name) = UPPER(?) AND\n" +
        "\tR.business_id = B.business_id";
    mySQLConnection.query(sql, [value1], function(err,result){
        if(err) throw err;
        console.log("Query 8 executed");
        res.send(result);
    });
});

router.post("/query9", urlencodedParser, function(req, res) {
    const value1 = req.body.value1;
    const sql = "SELECT business_id\n" +
        "\t\tFROM reviews\n" +
        "\t\tGROUP BY business_id\n" +
        "\t\tORDER BY count(*) DESC\n" +
        "\t\tLIMIT  " + value1;
    mySQLConnection.query(sql, [], function(err,result){
        if(err) throw err;
        console.log("Query 9 executed");
        res.send(result);
    });
});

router.post("/query10", urlencodedParser, function(req, res) {
    const sql = "SELECT U.name\n" +
        "FROM users U\n" +
        "WHERE U.user_id IN (SELECT R.user_id\n" +
        "\t\t\tFROM reviews R\n" +
        "\t\t\tGROUP BY R.user_id\n" +
        "\t\t\tHAVING count(*) >= ALL(SELECT count(*)\n" +
        "\t\t\t\t\t\tFROM reviews R1\n" +
        "\t\t\t\t\t\tGROUP BY R1.user_id))";
    mySQLConnection.query(sql, [], function(err,result){
        if(err) throw err;
        console.log("Query 10 executed");
        res.send(result);
    });
});

module.exports=router;