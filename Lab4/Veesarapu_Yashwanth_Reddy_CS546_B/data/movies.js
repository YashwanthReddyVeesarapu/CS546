const { ObjectId } = require("mongodb");
const mongoCollections = require("./../config/mongoCollections");

const movies = mongoCollections.movies;

function validValue(input) {
  if (!input) throw "Error: Invalid parameters";
}

function validString(input) {
  if (typeof input !== "string") throw "Error: Must be a string";
  if (input.trim().length === 0) throw "Error: Should not contain empty string";
}

function validRating(rating) {
  const validRatings = ["G", "PG", "PG-13", "R", "NC-17"];

  let flag = false;
  for (let i = 0; i < validRatings.length; i++) {
    if (validRatings[i] === rating.trim()) {
      flag = true;
    }
  }

  if (!flag) {
    throw "Error: Invalid rating";
  }
}

function validTitle(title) {
  if (title.length < 2 || !title.match(/^[a-zA-Z0-9]/))
    throw "Error: Invalid title";
}

function validNewName(newname) {
  if (newname.length < 2 || !newname.match(/^[a-zA-Z0-9]/))
    throw "Error: Invalid new title";
}

function validReleaseDate(releaseDate) {
  let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let splitDate = releaseDate.split("/");
  const curentYear = new Date().getFullYear();
  if (splitDate[2] < 1900 || splitDate[2] > curentYear + 2)
    throw "Error: Release date must lie in the range of 1900 and current year + 2";
  if (!(parseInt(splitDate[1]) <= months[parseInt(splitDate[0]) - 1]))
    throw "Error: Invalid date month combination";
}

function validRuntime(runtime) {
  let regex = /^[0-9][h]\ [0-5]?[0-9]min?$/;

  if (!runtime.trim().match(regex)) throw "Error: Invalid runtime format";
}
const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  validValue(title);
  validValue(plot);
  validValue(genres);
  validValue(rating);
  validValue(studio);
  validValue(director);
  validValue(castMembers);
  validValue(dateReleased);
  validValue(runtime);

  validString(title);
  validString(plot);
  validString(rating);
  validString(studio);
  validString(director);
  validString(dateReleased);
  validString(runtime);

  validTitle(title);

  if (studio.length < 5 || !title.match(/^[a-zA-Z]/))
    throw "Error: Invalid studio";

  const directorSplit = director.split(" ");
  if (directorSplit.length !== 2) throw "Error: Invalid director";

  const directorFirst = directorSplit[0];
  const directorLast = directorSplit[1];
  if (
    directorFirst.length < 3 ||
    !directorFirst.match(/^[a-zA-Z]/) ||
    directorLast.length < 3 ||
    !directorLast.match(/^[a-zA-Z]/)
  )
    throw "Error: Invalid director";

  validRating(rating);

  if (!Array.isArray(genres) || genres.length === 0)
    throw "Error: Genres should be array";

  genres.forEach((e) => {
    if (typeof e !== "string") throw "Error: Genres must be a string ";
    if (e.trim().length === 0)
      throw "Error: Genres should not contain empty string";
    if (e.length < 5 || !e.match(/^[a-zA-Z]/))
      throw "Error: Genres should contain min 5 characters and only letters";
  });

  if (!Array.isArray(castMembers) || castMembers.length === 0)
    throw "Error: Genres should be array";

  castMembers.forEach((e) => {
    if (typeof e !== "string") throw "Error: Genres must be a string ";
    if (e.trim().length === 0)
      throw "Error: Genres should not contain empty string";

    const arr = e.split(" ");
    if (arr.length !== 2)
      throw "Error: Invalid first and last name of cast members";

    const castFirst = arr[0];
    const castLast = arr[1];

    if (
      castFirst.length < 3 ||
      castLast.length < 3 ||
      !castFirst.match(/^[a-zA-Z]/) ||
      !castLast.match(/^[a-zA-Z]/)
    )
      throw "Error: Inavlid first or last name format of cast members";
  });

  validReleaseDate(dateReleased);

  validRuntime(runtime);

  const moviesCollection = await movies();

  const newMovie = {
    title,
    plot,
    genres,
    rating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime,
  };

  const insertInfo = await moviesCollection.insertOne(newMovie);

  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "Could not add movie";

  const newId = insertInfo.insertedId.toString();
  const movie = await getMovieById(newId);

  return movie;
};

const getAllMovies = async () => {
  const moviesCollection = await movies();
  const moviesList = await moviesCollection.find({}).toArray();

  if (!moviesList) throw "Could not get all movies";

  moviesList.map((doc) => {
    const myObjID = ObjectId(doc._id);
    doc._id = myObjID.toString();
    return doc;
  });

  return moviesList;
};

const getMovieById = async (id) => {
  const moviesCollection = await movies();
  if (!id) throw "Error: You must provide if to search for";
  if (typeof id !== "string") throw "Error: Id must be a string";
  if (id.trim().length === 0)
    throw "Error: Id cannot be an empty string or just spaces";

  id = id.trim();

  if (!ObjectId.isValid(id)) throw "Error: Invalid object ID";
  const movie = await moviesCollection.findOne({ _id: ObjectId(id) });

  if (movie === null) throw "Error: No movie with that id";

  myObjectId = ObjectId(movie._id);

  movie._id = myObjectId.toString();

  return movie;
};

const removeMovie = async (id) => {
  if (!id) throw "Error: You must provide an id to search for";
  if (typeof id !== "string") throw "Error: Id must be a string";
  if (id.trim().length === 0)
    throw "Error: id cannot be an empty string or just spaces";
  id = id.trim();
  if (!ObjectId.isValid(id)) throw "Error: invalid object ID";

  const moviesCollection = await movies();
  const movie = await getMovieById(id);

  const movieTitle = movie.title;

  const deletionInfo = await moviesCollection.deleteOne({ _id: ObjectId(id) });
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete movie with id of ${id}`;
  }
  return `${movieTitle} has been successfully deleted!`;
};

const renameMovie = async (id, newName) => {
  if (!id) throw "Error: You must provide an id to search for";
  if (typeof id !== "string") throw "Error: Id must be a string";
  if (id.trim().length === 0)
    throw "Error: Id cannot be an empty string or just spaces";
  id = id.trim();
  if (!ObjectId.isValid(id)) throw "Error: invalid object ID";
  if (!newName) throw "Error: You must provide a name for your movie";
  if (typeof newName !== "string") throw "Error: Name must be a string";
  if (newName.trim().length === 0)
    throw "Error: Name cannot be an empty string or string with just spaces";

  validNewName(newName);

  const movie = await getMovieById(id);

  if (movie.title === newName) {
    throw "Error: The new title is same as it exists";
  }

  const moviesCollection = await movies();

  const updatedMovie = { title: newName };

  const updatedInfo = await moviesCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: updatedMovie }
  );

  if (updatedInfo.modifiedCount === 0) {
    throw "Error: could not rename movie successfully";
  }

  return await getMovieById(id);
};

// const getFirstInsertedMovieID = async () => {
//   const moviesCollection = await movies();
//   const movie = await moviesCollection
//     .find({})
//     .sort({ created_at: 1 })
//     .limit(1)
//     .toArray();

//   if (!movie) throw "Error: Input first movie to get first movie data";

//   const id = ObjectId(movie[0]._id);
//   const idString = id.toString();

//   return idString;
// };

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  renameMovie,
};
