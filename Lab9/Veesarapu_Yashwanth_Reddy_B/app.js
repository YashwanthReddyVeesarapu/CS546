/*
Here is where you'll set up your server as shown in lecture code and worked in previous labs.
Your server this week should not be doing any of the processing! Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the array sort page.
*/

const express = require("express");

const app = express();

const static = express.static(__dirname + "/public");

const configRoutes = require("./routes");

app.use("/public", static);

configRoutes(app);

app.listen("3000", () => {
  console.log("Started server for LAB9");
});
