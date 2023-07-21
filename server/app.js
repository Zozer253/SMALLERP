const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Sequelize = require("sequelize");
const usersRoutes = require("./routes/Users");
const cotationRoutes = require("./routes/Contations");
const offersRoutes = require("./routes/Offres");
const productsRoutes = require("./routes/Products");
const app = express();
const path = require("path");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("images", express.static(path.join(__dirname, "./images")));
app.use("/", usersRoutes);
app.use("/", cotationRoutes);
app.use("/", offersRoutes);
app.use("/", productsRoutes); // Ajout de cette ligne pour les routes du produit

module.exports = { app, Sequelize };

// npm run db db:migrate
// npm run mg migration:make -name all
