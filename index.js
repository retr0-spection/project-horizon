import express from 'express';
import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
import session from 'express-session';
import cors from 'cors';
import passport from './authentication/passport.js';
import authRoute from "./authentication/routes.js";
import defineUserModel from './common/models/User.js';

dotenv.config();

const app = express()

app.use(express.json());

app.use(function(req, res, next) {
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
  })
);
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

app.use('/auth', authRoute)
app.get('/', (req, res) => res.send("hello world"))

app.use(
  cors({
    origin: '*', //put frontend url
    methods: "GET,POST,PUT,DELETE",
    credentials: true
  })
)

//connect to the database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  port: 5432,
  ssl: true, 
  dialectOptions: {
    ssl: {
      require: true
    }
  }
});

/*const sequelize = new Sequelize(
  "espaza",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
  }
);*/

// initializing the Model on sequelize
const User = defineUserModel(sequelize);

// Syncing the models that are defined on sequelize with the tables that already exists
// in the database. It creates models as tables that do not exist in the DB.
sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialized!!");
  })
  .catch((err) => {
    console.error("Sequelize Initialization threw an error:", err);
  });