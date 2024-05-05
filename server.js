import { app, db } from "./index.js";
import itemRoute from "./items/routes.js";
import authRoute from "./authentication/routes.js";
import apiRouter from "./routes/v1/index.js";
import cors from "cors";

const port = process.env.PORT || 3000;

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Sequelize Initialized!!");
  })
  .catch((err) => {
    console.error("Sequelize Initialization threw an error:", err);
  });

app.use("/", async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader.split(" ")[1];
    const _profile = jwt.decode(token);
    const user =
      (await db.User.findOne({ where: { id: _profile.sub } })) || null;

    if (user) {
      req.user = user;
    }
  } catch (e) {
    // console.log(e);
  }

  next();
});
app.use("/auth", authRoute);
app.use("/item", itemRoute);
app.get("/", (req, res) => res.send("hello world"));

app.get("/api", apiRouter);

app.use(
  cors({
    origin: "*", //put frontend url
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }),
);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
