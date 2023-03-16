const { ObjectId } = require("mongodb");

module.exports = {
  checkId(id) {
    if (!id)
      throw { status: 400, msg: "Error: You must provide an id to search for" };
    if (typeof id !== "string")
      throw { status: 400, msg: "Error: id must be a string" };
    id = id.trim();
    if (id.length === 0)
      throw {
        status: 400,
        msg: "Error: id cannot be an empty string or just spaces",
      };
    if (!ObjectId.isValid(id))
      throw { status: 400, msg: "Error: invalid object ID" };
    return id;
  },

  checkString(strVal, varName) {
    if (!strVal)
      throw { status: 400, msg: `Error: You must supply a ${varName}!` };
    if (typeof strVal !== "string")
      throw { status: 400, msg: `Error: ${varName} must be a string!` };
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw {
        status: 400,
        msg: `Error: ${varName} cannot be an empty string or string with just spaces`,
      };
    if (!isNaN(strVal))
      throw {
        status: 400,
        msg: `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`,
      };
    return strVal;
  },

  validValue(input) {
    if (!input)
      throw { status: 400, msg: "Error: All fields need to have valid values" };
  },
  checkRating(rating) {
    const validRatings = ["G", "PG", "PG-13", "R", "NC-17"];

    let flag = false;
    for (let i = 0; i < validRatings.length; i++) {
      if (validRatings[i] === rating.trim()) {
        flag = true;
      }
    }

    if (!flag) {
      throw { status: 400, msg: "Error: Invalid rating" };
    }
  },

  validTitle(title) {
    if (title.length < 2 || !title.match(/^[a-zA-Z0-9]/))
      throw { status: 400, msg: "Error: Invalid title" };
  },
  checkGenres(genres) {
    if (!Array.isArray(genres) || genres.length === 0)
      throw { status: 400, msg: "Error: Genres should be array" };

    genres.forEach((e) => {
      if (typeof e !== "string")
        throw { status: 400, msg: "Error: Genres must be a string " };
      if (e.trim().length === 0)
        throw {
          status: 400,
          msg: "Error: Genres should not contain empty string",
        };
      if (e.length < 5 || !e.match(/^[a-zA-Z]/))
        throw {
          status: 400,
          msg: "Error: Genres should contain min 5 characters and only letters",
        };
    });
  },
  checkCast(castMembers) {
    if (!Array.isArray(castMembers) || castMembers.length === 0)
      throw { status: 400, msg: "Error: Genres should be array" };

    castMembers.forEach((e) => {
      if (typeof e !== "string")
        throw { status: 400, msg: "Error: Genres must be a string " };
      if (e.trim().length === 0)
        throw {
          status: 400,
          msg: "Error: Genres should not contain empty string",
        };

      const arr = e.split(" ");
      if (arr.length !== 2)
        throw {
          status: 400,
          msg: "Error: Invalid first and last name of cast members",
        };

      const castFirst = arr[0];
      const castLast = arr[1];

      if (
        castFirst.length < 3 ||
        castLast.length < 3 ||
        !castFirst.match(/^[a-zA-Z]/) ||
        !castLast.match(/^[a-zA-Z]/)
      )
        throw {
          status: 400,
          msg: "Error: Inavlid first or last name format of cast members",
        };
    });
  },
  checkReleaseDate(releaseDate) {
    let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let splitDate = releaseDate.split("/");
    const curentYear = new Date().getFullYear();
    if (splitDate[2] < 1900 || splitDate[2] > curentYear + 2)
      throw {
        status: 400,
        msg: "Error: Release date must lie in the range of 1900 and current year + 2",
      };
    if (!(parseInt(splitDate[1]) <= months[parseInt(splitDate[0]) - 1]))
      throw { status: 400, msg: "Error: Invalid date month combination" };
  },

  checkRuntime(runtime) {
    let regex = /^[0-9][h]\ [0-5]?[0-9]min?$/;

    if (!runtime.trim().match(regex))
      throw { status: 400, msg: "Error: Invalid runtime format" };
  },
  checkDirector(director) {
    const directorSplit = director.split(" ");
    if (directorSplit.length !== 2)
      throw { status: 400, msg: "Error: Invalid director" };

    const directorFirst = directorSplit[0];
    const directorLast = directorSplit[1];
    if (
      directorFirst.length < 3 ||
      !directorFirst.match(/^[a-zA-Z]/) ||
      directorLast.length < 3 ||
      !directorLast.match(/^[a-zA-Z]/)
    )
      throw { status: 400, msg: "Error: Invalid director" };
  },
  checkStudio(studio) {
    if (studio.length < 5 || !studio.match(/^[a-zA-Z]/))
      throw { status: 400, msg: "Error: Invalid studio" };
  },
  checkReviewRating(rating) {
    let regex = /^[1-5]{1}(?:\.[0-9])?$/;

    if (!regex.test(rating))
      throw { status: 400, msg: "Error: Invalid movie rating" };

    rating = parseFloat(rating);

    if (rating < 1 || rating > 5)
      throw { status: 400, msg: "Error: Movie rating is out of range" };

    return rating;
  },
};
