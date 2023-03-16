/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

function check(input1, input2) {
  if (typeof input1 !== "object" || typeof input2 !== "object")
    throw "Error: Invalid input";

  if (Array.isArray(input1) || Array.isArray(input2))
    throw "Error: Invalid input";
}

function deepEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  } else if (
    typeof obj1 == "object" &&
    obj1 != null &&
    typeof obj2 == "object" &&
    obj2 != null
  ) {
    if (Object.keys(obj1).length != Object.keys(obj2).length) return false;
    for (var v in obj1) {
      if (obj2.hasOwnProperty(v)) {
        if (!deepEqual(obj1[v], obj2[v])) return false;
      } else return false;
    }
    return true;
  } else return false;
}

let deepEquality = (obj1, obj2) => {
  check(obj1, obj2);
  let result = deepEqual(obj1, obj2);
  return result;
};

let commonKeysValues = (obj1, obj2) => {
  check(obj1, obj2);

  let common = [];
  let myobj = {};

  let obj1Keys = Object.keys(obj1);
  let obj2Keys = Object.keys(obj2);

  for (let i = 0; i < obj1Keys.length; i++) {
    for (let j = 0; j < obj2Keys.length; j++) {
      if (obj1Keys[i] === obj2Keys[j]) {
        common.push(obj1Keys[i]);
        obj2Keys[j] = "*ZY";
      }
    }
  }

  common.forEach((v) => {
    if (typeof obj1[v] === "object" && typeof obj2[v] === "object") {
      if (deepEqual(obj1[v], obj2[v])) {
        myobj[v] = obj1[v];
        let newObj = obj1[v];
        let keys = Object.keys(newObj);
        keys.forEach((k) => [(myobj[k] = newObj[k])]);
      }
    } else if (obj1[v] === obj2[v]) {
      myobj[v] = obj2[v];
    }
  });
  return myobj;
};

function checkCOInput(object, func) {
  if (typeof object !== "object" || Array.isArray(object))
    throw "Error: Invalid input";
  if (typeof func !== "function") throw "Error: Invalid input";

  Object.values(object).forEach((i) => {
    if (typeof i !== "number") throw "Error: Invalid input";
  });
}

let calculateObject = (object, func) => {
  checkCOInput(object, func);

  let myObj = {};

  Object.entries(object).forEach((i) => {
    myObj[i[0]] = Number.parseFloat(Math.sqrt(func(i[1])).toFixed(2));
  });

  return myObj;
};

module.exports = {
  deepEquality,
  commonKeysValues,
  calculateObject,
};
