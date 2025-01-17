//You will create, configure, and run your server from this file
//Lecture Code Reference -> https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_05/code/app.js

/*
Lab Requirements:
-You must not submit your node_modules folder
-You must remember to save your dependencies to your package.json folder
-You must remember to update your package.json file to set app.js as your starting script!
-You must submit a zip archive or you will lose points, named in the following format: LastName_FirstName_CS546_SECTION.zip  You will lose points for not submitting an archive.
-DO NOT ADD ANY OTHER FILE OR FOLDER APART FROM PACKAGE.JSON (OR package-lock.json) FILE.
*/

const express = require("express");

const pokemon = require("./data/pokemon");

const app = express();

const configRoutes = require("./routes");

configRoutes(app);

app.listen(3000, () => {
  console.log("Server running");
});
