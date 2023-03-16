const lab1 = require("./lab1");

console.log(lab1.questionOne([100, 200, 300])); // Returns and then outputs [false, false, false]
console.log(lab1.questionOne([15, 17, 20, 21]));  // Returns and then outputs [true, true, false, false]
console.log(lab1.questionOne([2, 2, -1,3,7])); // Returns and then outputs[true, true, false, true, true] 
console.log(lab1.questionOne([8191, 1007, 17389])); //Returns and then outputs [true, false, true]
console.log(lab1.questionOne([0, 14159, 785])); //Returns and then outputs [false, true, false]

console.log(lab1.questionTwo(0, 0, 0)); //Returns and then outputs 0
console.log(lab1.questionTwo(5, 3, 10));  //Returns and then outputs 147620 
console.log(lab1.questionTwo(1, 1, 0)); //Returns and then outputs NaN
console.log(lab1.questionTwo(-1, 1, 20)); //Returns and then outputs -20
console.log(lab1.questionTwo(2000, 3, 5)); //Returns and then outputs 242000 
console.log(lab1.questionTwo(-1,3.5,1.5)); //Returns and then outputs

console.log(lab1.questionThree("How now brown cow"));  // Returns and then outputs 10
console.log(lab1.questionThree("Welcome to CS-546 - Web Programming 1")); // Returns and then outputs 17 
console.log(lab1.questionThree("Angular is an application-design framework and development platform for creating efficient and sophisticated single-page apps."));//Returns and then outputs 68
console.log(lab1.questionThree("React makes it painless to create interactive UIs.")); //Returns and then outputs 23
console.log(lab1.questionThree("Prof. Patrick hill is strict")); // Returns and then outputs 17


console.log(lab1.questionFour("hello worlddddd", "dd"));  // Returns and then outputs 2
console.log(lab1.questionFour("Meooow Meoow!", "oo")); // Returns and then outputs 2
console.log(lab1.questionFour("Yashwanth Reddy Veesarapu", "ee")); //Returns and then outputs 1
console.log(lab1.questionFour("Patrick Hill", "ll")) //Returns and then outputs 1
console.log(lab1.questionFour("I love web programming", " ")) //Returns and then outputs 3

