/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

function checkArray(array) {
  if (array.length === 0) throw "Error: Array should not be empty";
  if (!Array.isArray(array)) throw "Error: Not an array";
  array.forEach((i) => {
    if (typeof i !== "number")
      throw "Error: Elements in array should be numbers";
  });
}

function getMedian(array, arrayLength) {
  let middleIndex = Math.floor(arrayLength / 2);
  let median;
  if (arrayLength % 2 !== 0) {
    median = array[middleIndex];
  } else {
    median = (array[middleIndex - 1] + array[middleIndex]) / 2;
  }
  return median;
}

function getMode(array) {
  const myObj = {};
  array.forEach((i) => {
    if (myObj[i]) {
      myObj[i] += 1;
    } else {
      myObj[i] = 1;
    }
  });

  let multiMode = [];

  let largeVal = -1;
  let largeValKey = -1;

  // finding the biggest value and its corresponding key
  Object.keys(myObj).forEach((key) => {
    let value = myObj[key];
    if (value > largeVal) {
      largeValKey = key;
      largeVal = value;
    }
  });

  Object.entries(myObj).map((o, i) => {
    if (o[1] != 1)
      if (o[1] === largeVal) {
        multiMode.push(parseFloat(o[0]));
      }
  });

  if (multiMode.length > 1) {
    return multiMode;
  } else {
    if (largeVal === 1) {
      return 0;
    } else return parseFloat(largeValKey);
  }
}

let arrayStats = (array) => {
  checkArray(array);
  let myObj = {
    mean: 0,
    median: 0,
    mode: 0,
    range: 0,
    minimum: 0,
    maximum: 0,
    count: 0,
    sum: 0,
  };
  array.sort((a, b) => a - b);
  let arrayLength = array.length;
  myObj.minimum = array[0];
  myObj.maximum = array[arrayLength - 1];
  let sum = array.reduce((a, b) => a + b);
  myObj.sum = sum;
  myObj.mean = sum / arrayLength;
  myObj.median = getMedian(array, arrayLength);
  myObj.mode = getMode(array);
  myObj.range = myObj.maximum - myObj.minimum;

  return myObj;
};

function isValidMOInput(arrays) {
  if (arrays.length === 0) throw "Error: Array should not be empty";
  if (!Array.isArray(arrays)) throw "Error: Invalid input";
  arrays.forEach((i) => {
    if (!Array.isArray(i)) {
      throw "Error: Each input must be an array";
    } else if (i.length !== 2) {
      throw "Error: Each input must contain two elements";
    }
  });
}

let makeObjects = (...arrays) => {
  isValidMOInput(arrays);
  let myObj = {};
  arrays.forEach((i) => {
    myObj[i[0]] = i[1];
  });

  return myObj;
  //this function takes in a variable number of arrays that's what the ...arrays signifies
};

function isValidCEInput(input) {
  if (!Array.isArray(input)) throw "Error: Invalid input";
  if (input.length < 2) throw "Error: Min 2 inputs";
  input.forEach((i) => {
    if (!Array.isArray(i)) {
      throw "Error: Invaid input ---";
    }
    if (i.length === 0) throw "Error: Invalid input";
  });

  if (typeof input !== "object") throw "Error: Invalid";
}

//Repeated numbers in single array

let commonElements = (...arrays) => {
  isValidCEInput(arrays);

  let arr1 = arrays[0];
  let arr2 = arrays[1];

  let common = [];

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (Array.isArray(arr1[i])) {
        let val1String = JSON.stringify(arr1[i]);
        let val2String = JSON.stringify(arr2[j]);
        if (val1String === val2String) {
          common.push(arr1[i]);
          arr2[j] = "*ZY";
        }
      } else if (arr1[i] === arr2[j]) {
        common.push(arr1[i]);
        arr2[j] = "*ZY";
      }
    }
  }

  for (let x = 0; x < common.length; x++) {
    for (let i = 2; i < arrays.length; i++) {
      let array = arrays[i];
      let exists = false;
      for (let j = 0; j < array.length; j++) {
        if (Array.isArray(common[x])) {
          let str1 = JSON.stringify(common[x]);
          let str2 = JSON.stringify(array[j]);
          if (str1 === str2) {
            array[j] = "*ZY";
            exists = true;
          }
        } else if (common[x] === array[j]) {
          array[j] = "*ZY";
          exists = true;
        }
      }
      if (exists === false) {
        common[x] = "ABC";
      }
    }
  }

  let result = [];

  common.forEach((v) => {
    if (typeof v === "number") {
      result.push(v);
    }
  });

  return result;
  //this function takes in a variable number of arrays that's what the ...arrays signifies
};

module.exports = {
  arrayStats,
  makeObjects,
  commonElements,
};
