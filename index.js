import express from "express";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import passport from "./authentication/passport.js";
import session from "express-session";

//import routes

//import models
import defineItemModel from "./common/models/Items.js";
import defineCategoryModel from "./common/models/Category.js";
import defineGenderModel from "./common/models/Gender.js";
import defineSizeModel from "./common/models/Size.js";
import defineItemSizeModel from "./common/models/ItemSize.js";
import defineColorModel from "./common/models/Color.js";
import defineItemColorModel from "./common/models/ItemColor.js";

import defineUserModel from "./common/models/User.js";
import defineOrderModel from "./models/order/index.js";
import { defineRelationships } from "./models/index.js";

dotenv.config();

export const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, DELETE, PATCH, OPTIONS",
  );
  res.header("Access-Control-Allow-Credentials", true);
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

//connect to the database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.NODE_ENV == "production" ? process.env.DB_USERNAME : "postgres",
  process.env.NODE_ENV == "production" ? process.env.DB_PASSWORD : "",
  {
    host:
      process.env.NODE_ENV == "production" ? process.env.DB_HOST : "localhost",
    dialect: "postgres",
    port: 5432,
    ssl: process.env.NODE_ENV == "production",
    dialectOptions: {
      ssl: {
        require: process.env.NODE_ENV == "production",
      },
    },
  },
);

export const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// initializing the Model on sequelize

// Syncing the models that are defined on sequelize with the tables that already exists

const { Item } = defineItemModel(sequelize);
db.User = defineUserModel(sequelize);
db.Category = defineCategoryModel(sequelize);
db.Gender = defineGenderModel(sequelize);
db.Item = Item;
db.Size = defineSizeModel(sequelize);
db.ItemSize = defineItemSizeModel(sequelize);
db.Color = defineColorModel(sequelize);
db.ItemColor = defineItemColorModel(sequelize);
db.Order = defineOrderModel(sequelize);

//relationships
defineRelationships(db);
// in the database. It creates models as tables that do not exist in the DB.
