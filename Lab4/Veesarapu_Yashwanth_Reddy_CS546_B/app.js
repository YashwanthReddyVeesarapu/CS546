/*



*/

const movies = require("./data/movies");

const connection = require("./config/mongoConnection");

const main = async () => {
  const db = await connection.dbConnection();

  await db.dropDatabase();

  let createMovie = undefined;
  let getAllMovies = undefined;
  let getMovieById = undefined;
  let renameMovie = undefined;
  let removeMovie = undefined;

  //1. Create a Movie of your choice.
  //2. Log the newly created Movie. (Just that movie, not all movies)

  try {
    createMovie = await movies.createMovie(
      "Hackers",
      "Hackers are blamed for making a virus that will capsize five oil tankers.",
      ["Crime", "Drama", "Romance"],
      "PG-13",
      "United Artists",
      "AA BB",
      ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
      "09/15/1995",
      "1h 45min"
    );
    console.log(createMovie);
  } catch (error) {
    console.log(error);
  }

  // try {
  //   createMovie = await movies.createMovie(
  //     "Hacker",
  //     "Hackers are blamed for making a virus that will capsize five oil tankers.",
  //     ["Crime", "Drama", "Romance"],
  //     "PG-13",
  //     "United Artists",
  //     "Iain Softley",
  //     ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
  //     "09/15/2024",
  //     "1h 45min"
  //   );
  //   console.log(createMovie);
  // } catch (error) {
  //   console.log(error);
  // }

  // //3. Create another movie of your choice.

  // try {
  //   createMovie = await movies.createMovie(
  //     "Lou",
  //     "A young girl is kidnapped during a powerful storm. Her mother joins forces with her mysterious neighbour to set off in pursuit of the kidnapper. Their journey will test their limits and expose the dark secrets of their past.",
  //     ["Action", "Thriller"],
  //     "R",
  //     "Bad Robot",
  //     "Anna Foerster",
  //     ["Alison Janney", "Matt Carven", "Matthew Lillard", "Fisher Stevens"],
  //     "09/23/2022",
  //     "1h 45min"
  //   );
  //   console.log(createMovie);
  // } catch (error) {
  //   console.log(error);
  // }

  // //4. Query all movies, and log them all

  // try {
  //   getAllMovies = await movies.getAllMovies();
  //   console.log(getAllMovies);
  // } catch (error) {
  //   console.log(error);
  // }

  // //5. Create the 3rd movie of your choice.
  // //6. Log the newly created 3rd movie. (Just that movie, not all movies)

  // try {
  //   createMovie = await movies.createMovie(
  //     "X 2022",
  //     "A group of actors sets out to make an adult film in rural Texas under the noses of their reclusive hosts, but when the elderly couple catches their young guests in the act, the cast finds themselves in a desperate fight for their lives.",
  //     ["Action"],
  //     "R",
  //     "Little Lamb",
  //     "Ti West",
  //     ["Mia Goth", "Jenna Ortega", "Martin Henderson"],
  //     "03/13/2022",
  //     "1h 45min"
  //   );
  //   console.log(createMovie);
  // } catch (error) {
  //   console.log(error);
  // }

  // //7. Rename the first movie
  // //8. Log the first movie with the updated name.

  // try {
  //   const moviesData = await movies.getAllMovies();
  //   const firstMovieId = moviesData[0]._id;
  //   renameMovie = await movies.renameMovie(firstMovieId, "Hackersss");
  //   console.log(renameMovie);
  // } catch (error) {
  //   console.log(error);
  // }

  // //9. Remove the second movie you created.

  // try {
  //   const moviesData = await movies.getAllMovies();
  //   const secondMovieId = moviesData[1]._id;

  //   removeMovie = await movies.removeMovie(secondMovieId);
  //   console.log(removeMovie);
  // } catch (error) {
  //   console.log(error);
  // }

  // // 10. Query all movies, and log them all

  // try {
  //   getAllMovies = await movies.getAllMovies();
  //   console.log(getAllMovies);
  // } catch (error) {
  //   console.log(error);
  // }

  // // 11. Try to create a movie with bad input parameters to make sure it throws errors.

  // try {
  //   createMovie = await movies.createMovie(
  //     "Bad Movie",
  //     "A group of actors sets out to make an adult film in rural Texas under the noses of their reclusive hosts, but when the elderly couple catches their young guests in the act, the cast finds themselves in a desperate fight for their lives.",
  //     ["Action"],
  //     "F",
  //     "Little Lamb",
  //     "Ti West",
  //     ["Mia Goth", "Jenna Ortega", "Martin Henderson"],
  //     "03/13/2022",
  //     "1h 45min"
  //   );
  //   console.log(createMovie);
  // } catch (error) {
  //   console.log(error);
  // }

  // // 12. Try to remove a movie that does not exist to make sure it throws errors.

  // try {
  //   removeMovie = await movies.removeMovie("633f8874d5650b490875f854");
  //   console.log(removeMovie);
  // } catch (error) {
  //   console.log(error);
  // }

  // // 13. Try to rename a movie that does not exist to make sure it throws errors.

  // try {
  //   renameMovie = await movies.renameMovie(
  //     "633f8874d5650b490875f854",
  //     "New Movie"
  //   );
  //   console.log(renameMovie);
  // } catch (error) {
  //   console.log(error);
  // }

  // // 14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.

  // try {
  //   renameMovie = await movies.renameMovie("633f8874d5650b490875f854", "  ");
  //   console.log(renameMovie);
  // } catch (error) {
  //   console.log(error);
  // }
  // // 15. Try getting a movie by ID that does not exist to make sure it throws errors.

  // try {
  //   getMovieById = await movies.getMovieById("633f8874d5650b490875f854");
  //   console.log(getMovieById);
  // } catch (error) {
  //   console.log(error);
  // }

  await connection.closeConnection();
};

main();
