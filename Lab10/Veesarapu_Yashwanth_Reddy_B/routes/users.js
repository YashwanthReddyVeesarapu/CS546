const express = require("express");
const router = express.Router();

const { checkUser, createUser } = require("../data/users");
const { checkString, checkUsername, checkPassword } = require("../validation");

router.route("/").get((req, res) => {
  res.redirect("/login");
});

router
  .route("/login")
  .get(async (req, res) => {
    res.render("login", { title: "Login" });
  })
  .post(async (req, res) => {
    try {
      let username = checkString(req.body.usernameInput, "username");
      let password = checkString(req.body.passwordInput, "password");

      username = checkUsername(username);
      password = checkPassword(password);

      let result = await checkUser(username, password);

      if (result.authenticatedUser == true) {
        req.session.user = { username: username };
        res.redirect("/protected");
      }
    } catch (error) {
      res
        .status(error.status)
        .render("login", { error: error.msg, title: "Login" });
    }
  });

router
  .route("/register")
  .get(async (req, res) => {
    res.render("register", { title: "Register" });
  })
  .post(async (req, res) => {
    try {
      let username = checkString(req.body.usernameInput, "username");
      let password = checkString(req.body.passwordInput, "password");

      let result = await createUser(username, password);

      if ((result.insertedUser = true)) {
        res.redirect("/");
      }
    } catch (error) {
      res
        .status(error.status)
        .render("register", { error: error.msg, title: "Registration" });
    }
  });

router.route("/logout").get(async (req, res) => {
  req.session.destroy();
  res.render("loggedout", { title: "Logged Out" });
});

router.route("/protected").get(async (req, res) => {
  res.render("protected", {
    title: "Protected",
    username: req.session.user.username,
  });
});

module.exports = router;
