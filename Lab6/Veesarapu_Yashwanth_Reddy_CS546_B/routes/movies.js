//require express and express router as shown in lecture code

const express = require("express");
const {
  checkId,
  checkString,
  validTitle,
  checkStudio,
  checkDirector,
  checkRating,
  checkGenres,
  checkCast,
  checkReleaseDate,
  checkRuntime,
  validValue,
} = require("../data/validation");

const router = express.Router();

const { movies } = require("./../data");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const moviesData = await movies.getAllMovies();
      res.json(moviesData);
    } catch (error) {
      res.status().json(error);
    }
    //code here for GET
  })
  .post(async (req, res) => {
    try {
      if (
        !req.body.title ||
        !req.body.plot ||
        !req.body.genres ||
        !req.body.rating ||
        !req.body.studio ||
        !req.body.director ||
        !req.body.castMembers ||
        !req.body.dateReleased
      )
        throw { status: 400, msg: "BAD INPUT PARAMETERS" };

      let {
        title,
        plot,
        genres,
        rating,
        studio,
        director,
        castMembers,
        dateReleased,
        runtime,
      } = req.body;

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

      const createMovie = await movies.createMovie(
        title,
        plot,
        genres,
        rating,
        studio,
        director,
        castMembers,
        dateReleased,
        runtime
      );
      res.json(createMovie);
    } catch (error) {
      res.status(error.status).json(error.msg);
    }
  });

router
  .route("/:movieId")
  .get(async (req, res) => {
    try {
      validValue(req.params.movieId);
      let id = checkId(req.params.movieId);
      const movie = await movies.getMovieById(id);
      res.json(movie);
    } catch (error) {
      res.status(error.status).json(error.msg);
    }

    //code here for GET
  })
  .delete(async (req, res) => {
    try {
      validValue(req.params.movieId);
      let id = checkId(req.params.movieId);
      const movie = await movies.removeMovie(id);
      res.json(movie);
    } catch (error) {
      res.status(error.status).json(error.msg);
    }
    //code here for DELETE
  })
  .put(async (req, res) => {
    validValue(req.params.movieId);
    try {
      if (
        !req.body.title ||
        !req.body.plot ||
        !req.body.genres ||
        !req.body.rating ||
        !req.body.studio ||
        !req.body.director ||
        !req.body.castMembers ||
        !req.body.dateReleased
      )
        throw { status: 400, msg: "BAD REQUEST" };

      let movieId = checkId(req.params.movieId);
      let {
        title,
        plot,
        genres,
        rating,
        studio,
        director,
        castMembers,
        dateReleased,
        runtime,
      } = req.body;

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

      const newMovie = await movies.updateMovie(
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
      );
      res.json(newMovie);
    } catch (error) {
      res.status(error.status).json(error.msg);
    }
  });

module.exports = router;
