// DEPENDENCIES
const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");
const bands = require("./controllers/bands_controller");

// CONFIGURATION / MIDDLEWARE
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//const db = require("./models/index");

//db.sequelize.sync({ force: true });

/* // SEQUELIZE CONNECTION
removed after sequlize init:models 
const sequelize = new Sequelize({
  storage: process.env.PG_URI,
  dialect: "postgres",
  username: "postgres",
  password: "Hellokitty0",
});

try {
  sequelize.authenticate();
  console.log(`Connected with Sequelize at ${process.env.PG_URI}`);
} catch (err) {
  console.log(`Unable to connect to PG: ${err}`);
}
*/

// ROOT
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Tour API",
  });
});

// CONTROLLERS (under root route but above listen)
const bandsController = require("./controllers/bands_controller");
app.use("/bands", bandsController);

const eventsController = require("./controllers/events_controller");
app.use("/events", eventsController);

const stagesController = require("./controllers/stages_controller");
app.use("/stages", stagesController);

// LISTEN
app.listen(process.env.PORT, () => {
  console.log(`🎸 Rockin' on port: ${process.env.PORT}`);
});
