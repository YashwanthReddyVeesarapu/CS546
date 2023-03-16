//An index file that returns a function that attaches all your routes to your app
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_05/code/routes/index.js

const pokemon = require("./pokemon");

const constructMethod = (app) => {
  app.use("/pokemon", pokemon);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructMethod;
