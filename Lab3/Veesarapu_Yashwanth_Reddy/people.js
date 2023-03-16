const { default: axios } = require("axios");

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json"
  );
  return data;
}

function isValidGetPersonByIdInput(input) {
  if (!input) throw "Error: No input ID found";
  if (typeof input !== "string") throw "Error: ID should be a string";
  const trimmedInput = input.trim();
  if (trimmedInput.length === 0)
    throw "Error: ID should not contain only empty spaces";
}

const getPersonById = async (id) => {
  isValidGetPersonByIdInput(id);
  const people = await getPeople();
  for (let i = 0; i < people.length; i++) {
    if (people[i].id === id) {
      return people[i];
    }
  }
  throw "Error: person not found";
};

function isValidsameJobTitleInput(input) {
  if (!input) throw "Error: No input job title found";
  if (typeof input !== "string") throw "Error: Job title should be a string";
  const trimmedInput = input.trim();
  if (trimmedInput.length === 0)
    throw "Error: Job title should not contain only empty spaces";
}

const sameJobTitle = async (jobTitle) => {
  isValidsameJobTitleInput(jobTitle);
  const people = await getPeople();
  let result = [];
  for (let i = 0; i < people.length; i++) {
    if (people[i].job_title.toLowerCase() === jobTitle.toLowerCase()) {
      result.push(people[i]);
    }
  }
  if (result.length < 2) {
    throw "Error: No minimum matches met";
  }
  return result;
};

function isValidGetPostalCodesInput(city, state) {
  if (!city || !state) throw "Error: Invalid inputs passed";
  if (typeof city !== "string" || typeof state !== "string")
    throw "Error: Invalid input type : Must be a string";

  const trimmedCity = city.trim();
  const trimmedSate = state.trim();
  if (trimmedCity.length === 0 || trimmedSate.length === 0)
    throw "Error: Input must not be empty string";
}

const getPostalCodes = async (city, state) => {
  isValidGetPostalCodesInput(city, state);
  const people = await getPeople();
  let res = [];
  for (let i = 0; i < people.length; i++) {
    const person = people[i];
    if (
      person.state.toLowerCase() === state.toLowerCase() &&
      person.city.toLowerCase() === city.toLowerCase()
    ) {
      res.push(person.postal_code);
    }
  }
  res.sort((a, b) => parseInt(a) - parseInt(b));
  return res;
};

function isValidSameCityAndState(city, state) {
  if (!city || !state) throw "Error: Invalid inputs passed";
  if (typeof city !== "string" || typeof state !== "string")
    throw "Error: Invalid input type : Must be a string";

  const trimmedCity = city.trim();
  const trimmedSate = state.trim();
  if (trimmedCity.length === 0 || trimmedSate.length === 0)
    throw "Error: Input must not be empty string";
}

const sameCityAndState = async (city, state) => {
  isValidSameCityAndState(city, state);
  const people = await getPeople();
  let res = [];
  for (let i = 0; i < people.length; i++) {
    const person = people[i];
    if (
      person.state.toLowerCase() === state.toLowerCase() &&
      person.city.toLowerCase() === city.toLowerCase()
    ) {
      res.push(person.first_name + " " + person.last_name);
    }
  }
  res.sort((a, b) => {
    const aLast = a.split(" ")[1];
    const bLast = b.split(" ")[1];
    if (aLast < bLast) {
      return -1;
    }
    if (bLast < aLast) {
      return 1;
    }
    return 0;
  });

  return res;
};

module.exports = {
  getPeople,
  getPersonById,
  sameJobTitle,
  getPostalCodes,
  sameCityAndState,
};
