require("dotenv").config();

import express from "express";
import routes from "./routes/index";
import mongoConnection from "./model/connection";
import "./src/common/config/jwt-strategy";
import passport from "passport";
import session from "express-session";
import errorHandler from "./src/common/middleware/error-handler";
const app = express();

app.use(
  session({
    secret: "sk11sk",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());


// -------------start------Send data to req body in proper format
app.use(express.json()); //compulsary to send req body
app.use(express.urlencoded({ extended: true }));
// -----------end------------

app.use("/", routes);
// for send erro message 
app.use(errorHandler);
mongoConnection();
app.listen(process.env.PORT, () => {
  console.log(
    "App running on " + process.env.BASE_URL + ":" + process.env.PORT
  );
});
