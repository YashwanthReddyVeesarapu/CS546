const { checkString, checkUsername, checkPassword } = require("../validation");
const mongoCollection = require("./../config/mongoCollections");

const bcrypt = require("bcrypt");

const users = mongoCollection.users;
let userCollection;

const SALTROUNDS = 11;

const createUser = async (username, password) => {
  username = checkString(username, "username");
  password = checkString(password, "password");

  username = checkUsername(username);
  password = checkPassword(password);

  try {
    userCollection = await users();
  } catch (error) {
    throw { status: 500, msg: "Internal server error" };
  }

  const user = await userCollection.findOne({ username: username });

  if (user != null) {
    throw { status: 403, msg: "Username already exists" };
  }

  let hashedpassword = await bcrypt.hash(password, SALTROUNDS);

  let newUser = {
    username: username,
    password: hashedpassword,
  };

  const instertedInfo = await userCollection.insertOne(newUser);
  if (!instertedInfo.insertedId)
    throw { status: 400, msg: "Couldn't add user" };

  return { insertedUser: true };
};

const checkUser = async (username, password) => {
  username = checkString(username, "username");
  password = checkString(password, "password");

  username = checkUsername(username);
  password = checkPassword(password);

  try {
    userCollection = await users();
  } catch (error) {
    throw { status: 500, msg: "Internal server error" };
  }

  const user = await userCollection.findOne({ username: username });

  if (user == null) {
    throw { status: 400, msg: "Either the username or password is invalid" };
  }

  let dbpassword = user.password;

  let compareToMatch = false;

  compareToMatch = bcrypt.compare(dbpassword, password);

  if (compareToMatch) {
    return { authenticatedUser: true };
  } else {
    throw { status: 400, msg: "Either the username or password is invalid" };
  }
};

module.exports = {
  createUser,
  checkUser,
};
