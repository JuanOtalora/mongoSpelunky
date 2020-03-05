let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');


let indexRouter = require("./routes/index");

let app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());


var port = process.env.PORT || 9000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use("/", indexRouter);




app.listen(port, function () {
     console.log("Running RestHub on port " + port);
});
