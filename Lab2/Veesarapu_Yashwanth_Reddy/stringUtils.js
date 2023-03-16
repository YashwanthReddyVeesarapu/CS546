/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

function isValidPalindromesInput(input) {
  if (typeof input !== "string") throw "Error: Invalid input";
  if (input.length < 1) throw "Error: invalid input - length";
  let trimmed = input.trim();
  if (trimmed.length === 0) throw "Error: invalid input - Spaces";
}

function isPalindrome(string) {
  let lowerString = string.toLowerCase();
  let revString = lowerString.split("").reverse().join("");

  if (lowerString === revString) {
    return true;
  } else return false;
}

let palindromes = (string) => {
  isValidPalindromesInput(string);
  let array = string.split(" ");
  let newArray = [];
  array.forEach((i) => {
    let res = i.replace(/[^a-zA-Z0-9 ]/g, "");
    res = res.trim();
    if (res.length !== 0) newArray.push(res);
  });

  let result = [];

  newArray.forEach((e) => {
    if (isPalindrome(e)) {
      result.push(e);
    }
  });

  return result;
};

function isValidRCInput(input) {
  if (typeof input !== "string") throw "Error: Invalid input";
  let trimmed = input.trim();
  if (trimmed.length === 0) throw "Error: Invalid input";
}
let replaceChar = (string) => {
  isValidRCInput(string);
  let result = "";
  let count = 0;
  let preset = ["*", "$"];

  for (let i = 0; i < string.length; i++) {
    if (i % 2 !== 0) {
      result = result.concat(preset[count]);
      count = count + 1;
      if (count === 2) {
        count = 0;
      }
    } else {
      result = result.concat(string[i]);
    }
  }
  return result;
};

function isValidCSInput(input1, input2) {
  if (typeof input1 !== "string" || typeof input2 !== "string")
    throw "Error: Invalid input";
  let trimmedInput1 = input1.trim();
  let trimmedInput2 = input2.trim();
  if (trimmedInput1.length < 4 || trimmedInput2.length < 4)
    throw "Error: Invalid input";
}
let charSwap = (string1, string2) => {
  isValidCSInput(string1, string2);

  let result = "";
  let temp1 = "";
  let temp2 = "";
  for (let i = 0; i < 4; i++) {
    temp1 = temp1.concat(string1[i]);
    temp2 = temp2.concat(string2[i]);
  }
  result =
    temp2.concat(string1.substring(4)) +
    " " +
    temp1.concat(string2.substring(4));

  return result;
};

module.exports = {
  palindromes,
  replaceChar,
  charSwap,
};
