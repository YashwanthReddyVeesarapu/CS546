const mongoCollections = require("./../config/mongoCollections");

const movies = mongoCollections.movies;

const { ObjectId } = require("mongodb");

const {
  checkString,
  checkId,
  validValue,
  checkRating,
  validTitle,
  checkGenres,
  checkCast,
  checkReleaseDate,
  checkRuntime,
  checkDirector,
  checkStudio,
} = require("./validation");

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

  title = checkString(title, "title");
  plot = checkString(plot, "plot");
  rating = checkString(rating, "rating");
  studio = checkString(studio, "studio");
  director = checkString(director, "director");
  dateReleased = checkString(dateReleased, "date released");
  runtime = checkString(runtime, "runtime");

  validTitle(title);
  checkStudio(studio);

  checkDirector(director);

  checkRating(rating);
  checkGenres(genres);
  checkCast(castMembers);
  checkReleaseDate(dateReleased);
  checkRuntime(runtime);

  const moviesCollection = await movies();

  const newMovie = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime,
    reviews: [],
    overallRating: 0,
  };

  const insertInfo = await moviesCollection.insertOne(newMovie);

  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw { status: 400, msg: "Could not add movie" };

  const newId = insertInfo.insertedId.toString();
  const movie = await getMovieById(newId);

  return movie;
};

const getAllMovies = async () => {
  const moviesCollection = await movies();
  const moviesList = await moviesCollection
    .find({}, { projection: { _id: 1, title: 1 } })
    .toArray();
  return moviesList;
};

const getMovieById = async (id) => {
  validValue(id);
  id = checkString(id, "id");
  id = checkId(id);

  const moviesCollection = await movies();
  const movie = await moviesCollection.findOne({ _id: ObjectId(id) });

  if (movie === null)
    throw { status: 404, msg: "Error: No movie with that id" };

  return movie;
};

const removeMovie = async (movieId) => {
  validValue(movieId);
  movieId = checkString(movieId, "movie id");
  movieId = checkId(movieId);

  const moviesCollection = await movies();
  const movie = await getMovieById(movieId);

  const movieTitle = movie.title;

  const deletionInfo = await moviesCollection.deleteOne({
    _id: ObjectId(movieId),
  });
  if (deletionInfo.deletedCount === 0) {
    throw { status: 409, msg: `Could not delete movie with id of ${movieId}` };
  }
  return { movieId: movieId, deleted: true };
};

const updateMovie = async (
  movieId,
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
  validValue(movieId);
  validValue(title);
  validValue(plot);
  validValue(genres);
  validValue(rating);
  validValue(studio);
  validValue(director);
  validValue(castMembers);
  validValue(dateReleased);
  validValue(runtime);

  movieId = checkString(movieId, "ID");
  title = checkString(title, "title");
  plot = checkString(plot, "plot");
  rating = checkString(rating, "rating");
  studio = checkString(studio, "studio");
  director = checkString(director, "director");
  dateReleased = checkString(dateReleased, "date released");
  runtime = checkString(runtime, "runtime");

  movieId = checkId(movieId);

  validTitle(title);
  checkStudio(studio);
  checkDirector(director);
  checkRating(rating);
  checkGenres(genres);
  checkCast(castMembers);
  checkReleaseDate(dateReleased);
  checkRuntime(runtime);

  const movie = await getMovieById(movieId);

  const reviews = movie.reviews;
  const overallRating = movie.overallRating;

  const moviesCollection = await movies();

  const updatedMovie = {
    title,
    plot,
    genres,
    rating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime,
    reviews,
    overallRating,
  };

  const updateInfo = await moviesCollection.updateOne(
    { _id: ObjectId(movieId) },
    { $set: updatedMovie }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw { status: 400, msg: "Error: Update failed" };

  return await getMovieById(movieId);
};

module.exports = {
  getAllMovies,
  getMovieById,
  removeMovie,
  updateMovie,
  createMovie,
};
