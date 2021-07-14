const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const logger = require("morgan");
const router = require("./Routes/router");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const secret = "jfkgjfjg";
const MONGO_URI = "mongodb://localhost:27017/photobuddy";

const PORT = 4078;

const app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to mongodb successfully"))
  .catch((err) => console.error("could not connect to mongodb", err));
app.use(cookieParser());
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    cookie: { httpOnly: true, maxAge: 43200000, secure: false },
  })
);
app.use("/", router);
app.use("/uploads", express.static("uploads"));
app.use((err, req, res, next) => {
  if (err) {
    console.log(err.message);
  }
});
app.listen(PORT, () => {
  console.log(`server listening at port:${PORT}`);
});
