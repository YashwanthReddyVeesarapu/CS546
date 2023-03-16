module.exports = {
  checkString(input, title) {
    input = input.trim();
    if (input.length == 0)
      throw { status: 400, msg: `${title} shouldn't be empty spaces` };
    if (!input) throw { status: 400, msg: "Invalid input" };
    if (typeof input !== "string")
      throw { status: 400, msg: `Invalid ${title}` };
    return input;
  },

  checkUsername(username) {
    let regex = /^[a-zA-Z0-9]*$/;
    if (!username.match(regex)) {
      throw { status: 400, msg: "Username should be alphanumeric" };
    }
    username = username.toLowerCase();
    if (username.length < 4) {
      throw {
        status: 400,
        msg: "Username should contain atleast 4 characters",
      };
    }
    return username;
  },

  checkPassword(password) {
    let regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

    if (!password.match(regex))
      throw {
        status: 400,
        msg: "Password should contain atleast one uppercase character, one number, special character and minimum 6 characters in length",
      };

    return password;
  },
};
