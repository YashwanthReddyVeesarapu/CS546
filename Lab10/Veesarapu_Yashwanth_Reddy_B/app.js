const { urlencoded } = require("express");
const express = require("express");
const session = require("express-session");
const configRoutes = require("./routes");

const { engine } = require("express-handlebars");

const static = express.static(__dirname + "/public");

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.engine("handlebars", engine({ defaultLayout: "main" }));

app.set("view engine", "handlebars");

app.use("/public", static);

app.use(
  session({
    name: "AuthCookie",
    secret: "Yashwanth Reddy",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 },
  })
);

app.use("/", (req, res, next) => {
  let time = new Date().toUTCString();
  let method = req.method;
  let route = req.originalUrl;
  let auth;

  if (req.session.user) {
    auth = " (Authenticated User)";
  } else {
    auth = " (Non-Authenticated User)";
  }
  console.log("[" + time + "]: " + method + " " + route + auth);
  next();
});

app.use("/protected", (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render("error", { title: "Error" });
  } else {
    next();
  }
});

app.use("/login", (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/protected");
  } else {
    next();
  }
});

app.use("/register", (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/protected");
  }
  next();
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We got server for LAB 10");
});
