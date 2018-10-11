//requiring required technologies
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const routes = require("./routes");

//setting up the localhost as 3000 or otherwise deployment config
const PORT = process.env.PORT || 3000;
//getting express going
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//getting handlebars going
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//using the routes specified in the routes folder
app.use(routes);
//getting mongoose going and specifying collection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/wapoHeadlines";
mongoose.connect(MONGODB_URI);


app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});
