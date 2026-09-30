// javascript => typescript
function letterGrade(score) {
    if (score >= 90) {
        return "A";
    }
    return "F";
}
// Uncomment during explanation:
console.log(letterGrade(95));
// TypeScript Error:
// letterGrade("ninety");
function calculateTotal(price, quantity) {
    return price * quantity;
}
console.log(calculateTotal(100, 3));
// let score: number = 92;
// let studentName: string = "Sara";
var passed = true;
// console.log(score);
// console.log(studentName);
// console.log(passed);
var age = 20;
//age = "hello";
// const firstName: string = "Sara";
// const lastName: string = "Ahmed";
// const fullName = `${firstName} ${lastName}`;
// console.log(fullName);
var studentName = "Omar";
var score = 85;
var message = "".concat(studentName, " scored ").concat(score);
console.log(message);
var ageNew = 25;
var price = 99.99;
var salary = 15000;
console.log(ageNew);
console.log(price);
console.log(salary);
