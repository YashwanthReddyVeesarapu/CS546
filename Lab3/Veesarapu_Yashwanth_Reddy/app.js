/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

*/

const people = require("./people");
const companies = require("./companies");

async function main() {
  try {
    const result = await people.getPersonById(
      "fa36544d-bf92-4ed6-aa84-7085c6cb0440"
    );
    console.log("getPersonById passed successfully");
    console.log(result);
  } catch (e) {
    console.error("getPersonById" + e);
  }

  try {
    const result = await people.getPersonById(" ");

    console.error("getPersonById did not error");
    console.log(result);
  } catch (e) {
    console.log("getPersonById" + e);
  }

  try {
    const result = await people.sameJobTitle("Help Desk Operator");
    console.log("sameJobTitle passed successfully");
    console.log(result);
  } catch (e) {
    console.error("sameJobTitle" + e);
  }

  try {
    const result = await people.sameJobTitle();
    console.log("sameJobTitle did not error");
    console.log(result);
  } catch (e) {
    console.log("sameJobTitle" + e);
  }

  try {
    const result = await people.getPostalCodes("Salt Lake City", "Utah");

    console.log("getPostalCodes passed successfully");
    console.log(result);
  } catch (e) {
    console.log("getPostalCodes" + e);
  }

  try {
    const result = await people.getPostalCodes("Jersey City", "New Jersey");

    console.log("getPostalCodes did not error");
    console.log(result);
  } catch (e) {
    console.log("getPostalCodes" + e);
  }
  try {
    const result = await people.sameCityAndState("Salt Lake City", "Utah");

    console.log("sameCityAndState passed successfully");
    console.log(result);
  } catch (e) {
    console.log("sameCityAndState" + e);
  }

  try {
    const result = await people.sameCityAndState();

    console.log("sameCityAndState did not error");
    console.log(result);
  } catch (e) {
    console.log("sameCityAndState" + e);
  }

  //Companies
  try {
    const result = await companies.listEmployees("Kemmer-Mohr");

    console.log("listEmployees passed successfully");
    console.log(result);
  } catch (e) {
    console.log("listEmployees" + e);
  }

  try {
    const result = await companies.listEmployees();

    console.log("listEmployees did not error");
    console.log(result);
  } catch (e) {
    console.log("listEmployees" + e);
  }

  try {
    const result = await companies.sameIndustry("Auto Parts:O.E.M.");

    console.log("sameIndustry passed successfully");
    console.log(result);
  } catch (e) {
    console.log("sameIndustry" + e);
  }
  try {
    const result = await companies.sameIndustry();

    console.log("sameIndustry did not error");
    console.log(result);
  } catch (e) {
    console.log("getPostalCodes" + e);
  }

  try {
    const result = await companies.getCompanyById(
      "fb90892a-f7b9-4687-b497-d3b4606faddf"
    );

    console.log("getCompanyById passed successfully");
    console.log(result);
  } catch (e) {
    console.log("getCompanyById" + e);
  }
  try {
    const result = await companies.getCompanyById();

    console.log("getCompanyById did not error");
    console.log(result);
  } catch (e) {
    console.log("getCompanyById" + e);
  }
}

//call main
main();
