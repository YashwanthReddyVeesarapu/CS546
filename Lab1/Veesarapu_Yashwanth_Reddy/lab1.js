const questionOne = function questionOne(arr) {
  let boolArray = [];

  for (let i = 0; i < arr.length; i++) {
    let num = arr[i];
    if (num <= 1) {
      boolArray[i] = false;
    } else if (num === 2) boolArray[i] = true;
    else if (num > 2) {
      boolArray[i] = true;
      for (let j = 2; j < num; j++) {
        if (num % j === 0) boolArray[i] = false;
      }
    }
  }
  return boolArray;
};

const questionTwo = function questionTwo(
  startingNumber,
  commonRatio,
  numberOfTerms
) {
  if (startingNumber === 0 || commonRatio === 0) return 0;
  else if (numberOfTerms <= 0 || numberOfTerms % 1 !== 0) return NaN;
  else {
    let sum = 0;
    for (let i = 0; i < numberOfTerms; i++) {
      sum += startingNumber * Math.pow(commonRatio, i);
    }

    return sum;
  }
};

const questionThree = function questionThree(str) {
  let arr = str.toUpperCase().split("");
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    let char = arr[i];
    if (
      !(
        char == "A" ||
        char == "E" ||
        char == "I" ||
        char == "O" ||
        char == "U"
      ) &&
      char.match(/[A-Z]/i)
    ) {
      count++;
    }
  }
  return count;
};

const questionFour = function questionFour(fullString, subString) {
  let subStringLen = subString.length;
  let count = 0;
  fullString = fullString.toLowerCase();

  for (let i = 0; i < fullString.length; i++) {
    let sub = fullString.charAt(i);
    for (let j = 1; j < subStringLen; j++) {
      sub = sub + fullString.charAt(i + j);
    }
    if (sub === subString) {
      count++;
      i = i + subStringLen - 1;
    }
  }

  return count;
};

module.exports = {
  firstName: "YASHWANTH REDDY",
  lastName: "VEESARAPU",
  studentId: "20012732",
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};
