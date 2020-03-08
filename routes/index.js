let express = require("express");
let router = express.Router();

const mu = require("../db/MongoUtils.js");

/* GET home page. */
router.get("/", function(req, res) {
  mu.databases.findAll().then(databases => { 	
  	let dbSearched = databases.databases;
    return res.render("main", {dbSearched})
  });
});

router.get("/dbSearched", function(req, res) {
	console.log("LLEGA");
  const dbName = req.query.dbName;
  console.log(dbName);
  let dbSearched = [];
  mu.databases.findAll().then(databases => { 	
  	let m = databases.databases;
  	for (let i = 0; i < m.length; i++) {
  		if(m[i].name === dbName){
  			dbSearched.push(m[i])
  		}
  	}
  	console.log(dbSearched);
    return res.send({dbSearched})
  });
});

router.get("/db", (req, res)=>{
  res.render('database', {})
})

router.get("/dbSearched/db", function(req, res) {
	console.log("LLEGA");
  const dbName = req.query.dbName;
  console.log(dbName);
  let y = "";
  mu.databases.findAll().then(databases => { 	
  	let m = databases.databases;
  	for (let i = 0; i < m.length; i++) {
  		if(m[i].name === dbName){
  			y = m[i];
  			break;
  		}
  	}
  	console.log(y);
    //return res.render('database', {y})
    return res.redirect("/db");
  });
});






module.exports = router;
