let myForm = document.getElementById("myForm");
let results = document.getElementById("results");
let errorElement = document.getElementById("error");
let textInput = document.getElementById("arrays");
let className = "is-green";

error.innerHTML = "";

if (myForm) {
  myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let trimmed = e.target.input.value.trim();
    let len = trimmed.length - 1;
    let json;
    if (trimmed[len] == ",") {
      trimmed = trimmed.slice(0, -1);
    }

    try {
      if (len == 0) throw "Error: Input should be array of arrays";
      try {
        json = JSON.parse("[" + trimmed + "]");
      } catch (error) {
        throw error;
      }

      if (!Array.isArray(json)) throw "Error: Input should be arrays";

      if (json.length == 0) throw "Error: Atleast one array expected";

      json.forEach((i) => {
        if (!Array.isArray(i))
          throw "Error: Elements in array should be an array";

        if (i.length == 0)
          throw "Error: Each array should have at least one element";
        i.forEach((n) => {
          if (typeof n !== "number")
            throw "Error: All elements in arrays should be numbers";
          if (isNaN(n))
            throw "Error: All the elemnts in array should be numbers";
          if (n % 1 != 0) throw "Error: Numbers in arrays can't be decimals";
        });
      });

      error.innerHTML = "";
    } catch (error) {
      errorElement.innerHTML = error;
      return;
    }

    if (trimmed) {
      let li = document.createElement("li");
      let merge = json.flat(1);
      merge.sort((a, b) => a - b);
      li.innerHTML = JSON.stringify(merge);
      li.className = className;
      results.append(li);
      if (className == "is-green") {
        className = "is-red";
      } else className = "is-green";
    }
  });
}

// Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:
// -Get the value of the input text element.
// -You should be expecting a variable number of arrays typed into the input separated by commas:  For example: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29]
// -All array elements should be whole numbers (negative and 0 are allowed), no decimals.
// -Each array should have at least one element that is a whole number (negative and 0 are allowed), no decimals.
// -You can ignore any extra commas for example, inputting: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29],
// -There should be at least one array inputted.
// -You will then return a single array that has all the values from the arrays inputted sorted from lowest to highest number.  For example:  If our input was: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29] You would return:  [0,1,1,2,2,3,3,4,6,8,10,15,25,29]
// -Add a list item to the #results list of result of the sort you have just completed. You will alternate the class for each list item using the classes is-green and is-red (described below), starting with is-green first.
// -If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of an error somehow.
