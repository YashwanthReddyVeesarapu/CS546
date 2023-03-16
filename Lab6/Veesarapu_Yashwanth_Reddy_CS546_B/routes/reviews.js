//require express and express router as shown in lecture code
const express = require("express");
const {
  checkString,
  checkId,
  validValue,
  checkRating,
  checkReviewRating,
} = require("../data/validation");

const router = express.Router();

const reviews = require("./../data/reviews");

router
  .route("/:movieId")
  .get(async (req, res) => {
    validValue(req.params.movieId);
    let movieId = checkString(req.params.movieId, "movie id");
    movieId = checkId(req.params.movieId);

    try {
      const reviewsData = await reviews.getAllReviews(movieId);
      res.json(reviewsData);
    } catch (error) {
      res.status(error.status).json(error.msg);
    }
  })
  .post(async (req, res) => {
    validValue(req.params.movieId);
    let movieId = req.params.movieId;
    try {
      if (
        !req.body.reviewTitle ||
        !req.body.reviewerName ||
        !req.body.review ||
        !req.body.rating
      )
        throw { status: 400, msg: "BAD INPUT PARAMETERS" };

      let { reviewTitle, reviewerName, review, rating } = req.body;

      movieId = checkString(movieId, "movieId");
      reviewTitle = checkString(reviewTitle, "review title");
      reviewerName = checkString(reviewerName, "reviewer name");
      review = checkString(review, "review");

      movieId = checkId(movieId);

      rating = checkReviewRating(rating);

      const reviewData = await reviews.createReview(
        movieId,
        reviewTitle,
        reviewerName,
        review,
        rating
      );
      res.json(reviewData);
    } catch (error) {
      res.status(error.status).json(error.msg);
    }
  });

router
  .route("/review/:reviewId")
  .get(async (req, res) => {
    try {
      validValue(req.params.reviewId);
      let reviewId = checkId(req.params.reviewId);
      const review = await reviews.getReview(req.params.reviewId);
      res.json(review);
    } catch (error) {
      res.status(error.status).json(error.msg);
    }
  })
  .delete(async (req, res) => {
    try {
      validValue(req.params.reviewId);
      let reviewId = checkId(req.params.reviewId);
      const data = await reviews.removeReview(reviewId);
      res.json(data);
    } catch (error) {
      res.status(error.status).json(error.msg);
    }
  });

module.exports = router;
