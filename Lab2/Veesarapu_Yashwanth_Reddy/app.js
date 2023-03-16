/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

const arrayUtils = require("./arrayUtils");
const objectUtils = require("./objectUtils");
const stringUtils = require("./stringUtils");

const { arrayStats, makeObjects, commonElements } = arrayUtils;
const { deepEquality, commonKeysValues, calculateObject } = objectUtils;
const { palindromes, replaceChar, charSwap } = stringUtils;

//arrayStats
try {
  const result = arrayStats([
    9, 15, 25.5, -5, 7, 10, 5, 11, 11, 5, 30, 4, 1, -20,
  ]); // Returns { mean: 7.75, median: 8, mode: [ 5, 11 ], range: 50, minimum: -20, maximum: 30,count: 0, sum: 108.5}
  console.log("arrayStats passed successfully");
} catch (e) {
  console.error("arrayStats failed test case");
}
try {
  const result = arrayStats([]);
  console.error("arrayStats did not error");
} catch (e) {
  console.log("arrayStats failed successfully");
}

//makeObjects

try {
  let result = makeObjects([4, 1], [1, 2]);
  console.log("makeObjects passed successfully");
} catch (error) {
  console.error("makeObjects failed test case");
}

try {
  let result = makeObjects();
  console.error("makeObjects did not error");
} catch (error) {
  console.log("makeObjects failed successfully");
}

//commonElements

try {
  let result = commonElements([5, 7, 5], [20, 5, 5], [20]); // Returns [5,5]
  console.log("commonElements passed successfully");
} catch (error) {
  console.error("commonElements failed test case");
}

try {
  let result = commonElements([true, 5, ["Patrick"]], {}); // throws Error
  console.error("commonElements did not error");
} catch (error) {
  console.log("commonElements failed successfully");
}

//Palindromes

try {
  let result = palindromes("Malayalam is a tricky language, WOW");
  console.log("palindromes passed successfully");
} catch (error) {
  console.error("palindromes failed test case");
}

try {
  let result = palindromes(["hello there"]);
  console.error("palindromes did not error");
} catch (error) {
  console.log("palindromes failed successfully");
}
//replaceChar

try {
  let result = replaceChar("Daddy");
  console.log("replaceChar passed successfully");
} catch (error) {
  console.error("replaceChar failed test case");
}

try {
  let result = replaceChar([]);
  console.error("replaceChar did not error");
} catch (error) {
  console.log("replaceChar failed successfully");
}

//charSwap

try {
  let result = charSwap("Yashwanth", "Reddy");
  console.log("charSwap passed successfully");
} catch (error) {
  console.error("charSwap failed test case");
}

try {
  let result = charSwap("h", "e"); // Throws Error
  console.error("charSwap did not error");
} catch (error) {
  console.log("charSwap failed successfully");
}

try {
  let result = deepEquality({ b: 2, a: 3 }, { a: 3, b: 2 });
  console.log("deepEquality passed successfully");
} catch (error) {
  console.error("deepEquality failed test case");
}
try {
  let result = deepEquality([], { a: 1, b: 2 });
  console.error("deepEquality did not error");
} catch (error) {
  console.log("deepEquality failed successfully");
}
try {
  let result = commonKeysValues(
    { name: { first: "Yashwanth", last: "Reddy" }, age: 21 },
    { school: "Stevens", name: { first: "Yashwanth", last: "Reddy" }, age: 21 }
  );
  console.log("commonKeysValues passed successfully");
} catch (error) {
  console.error("commonKeysValues failed test case");
}
try {
  let result = commonKeysValues({ a: 2, b: { c: true, d: false } }, []); // Throws Error
  console.error("commonKeysValues did not error");
} catch (error) {
  console.log("commonKeysValues failed successfully");
}
try {
  let result = calculateObject({ a: 20, b: 7, c: 5 }, (n) => n * 3); //Returns { a: 7.75, b: 4.58, c: 3.87 }
  console.log("calculateObject passed successfully");
} catch (error) {
  console.error("calculateObject failed test case");
}
try {
  let result = calculateObject({ 1: 1, 2: 2 }, {}); // Throws Error
  console.error("calculateObject did not error");
} catch (error) {
  console.log("calculateObject failed successfully");
}
