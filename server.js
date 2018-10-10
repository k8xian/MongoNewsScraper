const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 3000;
const app = express();

//bringing in routes
const routes = require("./routes");
app.use(routes);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//making public folders all work
app.use(express.static("public"));



//settings for deployed mongo
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/wapoHeadlines";

//mongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//making it all go
app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});
