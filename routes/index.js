let express = require("express");
let router = express.Router();

const mu = require("../db/MongoUtils.js");

/* GET home page. */
router.get("/", function(req, res) {
  mu.databases.findAll().then(databases => {
  	console.log("AQUI ESTA SALIENDO LO SIGUIENTE" + databases);
    return res.render("main", {databases})
  });
});


module.exports = router;
