//Your data modules to make the Axios calls and get the data

const axios = require("axios");

const url = "https://pokeapi.co/api/v2/pokemon/";

const pokemon = async () => {
  const { data } = await axios.get(url);
  return data;
};

const pokemonById = async (id) => {
  try {
    const { data } = await axios.get(url + id);
    return data;
  } catch (error) {
    throw { status: 404, msg: `Pokémon Not Found!` };
  }
};

module.exports = { pokemon, pokemonById };
