import defineUserModel from '../../common/models/User.js';
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

/*const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  port: 5432,
  ssl: true, 
  dialectOptions: {
    ssl: {
      require: true
    }
  }
});*/

const sequelize = new Sequelize("espaza", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const { createUser } = defineUserModel(sequelize);

export async function signup (req, res) {
    try{
        const googleUser = req.user;
        const user = {
          id: googleUser.id,
          fname: googleUser._json.given_name,
          lname: googleUser._json.family_name,
          email: googleUser._json.email,
          role: "user",
        };
        const newUser = await createUser(user);
        console.log(newUser.dataValues);
    }
    catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}