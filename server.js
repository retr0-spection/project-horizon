import { app, db } from "./index.js";
import itemRoute from "./items/routes.js";
import authRoute from "./authentication/routes.js";
import apiRouter from "./routes/v1/index.js";
import cors from "cors";
import { initConstantsInDb } from "./models/index.js";
import Debug from "debug";
const debug = Debug("backend:server");
import jwt from "jsonwebtoken";
import { getUserById } from "./controllers/user/index.js";


const port = process.env.PORT || 3001;

const initDB = async () => {
  db.sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("Sequelize Initialized!!");
    })
    .catch((err) => {
      console.error("Sequelize Initialization threw an error:", err);
    });
};

await initDB();
await initConstantsInDb(db);

app.use("/", async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader.split(" ")[1];
    const _profile = jwt.decode(token);
    const user = await getUserById(_profile.sub);

    if (user) {
      req.user = user;
    }
  } catch (e) {
    console.log(e);
  }
  next();
});

app.get("/", (req, res) => res.send("hello world"));

app.use("/api", apiRouter);

app.use(
  cors({
    origin: "*", //put frontend url
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }),
);

app.listen(port, () => {
  debug("Listening on " + port);
});
