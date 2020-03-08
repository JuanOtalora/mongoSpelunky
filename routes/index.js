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

router.get("/dbSearched/db", (req, res)=>{
	const dbName = req.query.dbName;
  res.render('database', {dbName})
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
    return res.send(y);
  });
});

router.get("/dbSearched/db/collections", function(req, res){
	const dbName = req.query.dbName;
	console.log(dbName);
	console.log("/----------------------------");
	mu.collections.findAll(dbName).then(collections => {
		console.log(collections);
		return res.send(collections);
	})

})


router.get("/dbSearched/db/col", function(req, res){
	const dbName = req.query.dbName;
	const colName = req.query.colName;
	console.log(dbName);
	console.log("/----------------------------");
	console.log(colName);
	mu.collections.findAllRecords(dbName, colName).then(records =>{
		console.log(records);
		return res.send(records);
	})
	

})






module.exports = router;
