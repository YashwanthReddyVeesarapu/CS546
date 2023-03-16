const { ObjectId } = require("mongodb");
const mongoCollections = require("./../config/mongoCollections");
const { getMovieById } = require("./movies");

const movies = mongoCollections.movies;

const {
  validValue,
  checkString,
  checkId,
  checkReviewRating,
} = require("./validation");

function getDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  return today;
}

function calculateRating(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i].rating;
  }
  let rating = sum / arr.length;

  return rating;
}

async function updateOverallRating(rating, movieId) {
  const movieCollection = await movies();
  const updateInfo = await movieCollection.updateOne(
    { _id: ObjectId(movieId) },
    {
      $set: {
        overallRating: rating,
      },
    }
  );

  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw { status: 400, msg: "Could not update overall rating" };
}

const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  validValue(movieId);
  validValue(reviewTitle);
  validValue(reviewerName);
  validValue(review);
  validValue(rating);

  movieId = checkString(movieId, "movieId");
  reviewTitle = checkString(reviewTitle, "review title");
  reviewerName = checkString(reviewerName, "reviewer name");
  review = checkString(review, "review");

  movieId = checkId(movieId);
  rating = checkReviewRating(rating);

  const movie = await getMovieById(movieId);

  const moviesCollection = await movies();

  const date = getDate();

  const newReview = {
    _id: ObjectId(),
    reviewTitle: reviewTitle,
    reviewerName: reviewerName,
    review: review,
    rating: rating,
    reviewDate: date,
  };

  const updateInfo = await moviesCollection.updateOne(
    { _id: ObjectId(movieId) },
    { $push: { reviews: newReview } }
  );

  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw { status: 400, msg: "Could not add review" };

  const reviews = await getAllReviews(movieId);
  const overallRating = calculateRating(reviews);

  await updateOverallRating(overallRating, movieId);

  return await getMovieById(movieId);
};

const getAllReviews = async (movieId) => {
  validValue(movieId);
  movieId = checkString(movieId, "movie id");
  movieId = checkId(movieId);

  const movie = await getMovieById(movieId);

  const movieCollection = await movies();

  const reviews = await movieCollection
    .find({ _id: ObjectId(movieId) }, { projection: { _id: 0, reviews: 1 } })
    .toArray();

  if (reviews[0].reviews.length === 0)
    throw { status: 404, msg: "Error: No reviews found" };

  return reviews[0].reviews;
};

const getReview = async (reviewId) => {
  validValue(reviewId);
  reviewId = checkString(reviewId, "review id");
  reviewId = checkId(reviewId);
  const moviesCollection = await movies();

  const review = await moviesCollection
    .find(
      {
        "reviews._id": ObjectId(reviewId),
      },
      { projection: { _id: 0, "reviews.$": 1 } }
    )
    .toArray();

  if (review.length === 0)
    throw { status: 404, msg: "Error: No review with that id" };

  return review[0].reviews[0];
};

const removeReview = async (reviewId) => {
  reviewId = checkId(reviewId);

  const moviesCollection = await movies();

  const review = await moviesCollection
    .find(
      {
        "reviews._id": ObjectId(reviewId),
      },
      { projection: { _id: 1, "reviews.$": 1 } }
    )
    .toArray();

  if (review.length === 0) throw { status: 404, msg: "Error: No review found" };

  const movieId = review[0]._id.toString();
  const toDelete = review[0].reviews[0];

  const updateInfo = await moviesCollection.updateOne(
    { "reviews._id": ObjectId(reviewId) },
    {
      $pull: {
        reviews: toDelete,
      },
    }
  );

  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw { status: 400, msg: "Could not delete review" };

  const reviews = await getAllReviews(movieId);

  let overallRating = 0;
  if (reviews.length !== 0) {
    overallRating = calculateRating(reviews);
  }

  await updateOverallRating(overallRating, movieId);

  return await getMovieById(movieId);
};

module.exports = { createReview, getAllReviews, getReview, removeReview };
