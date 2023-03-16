//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/code/routes

const express = require("express");
const { pokemon } = require("../data");
const validation = require("../data/validation");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const pokemonData = await pokemon.pokemon();
    res.json(pokemonData);
  } catch (error) {
    res.status(404).json(error);
  }
});
//Request Method

router.route("/:id").get(async (req, res) => {
  try {
    req.params.id = validation.checkId(req.params.id);
    const pokemonData = await pokemon.pokemonById(req.params.id);
    res.json(pokemonData);
  } catch (error) {
    res.status(error.status).json(error.msg);
  }
});
//Request Method

module.exports = router;
