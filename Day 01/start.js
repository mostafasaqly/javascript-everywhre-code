console.log("start");
console.log(process.platform);
// console.log(window.innerWidth);

const CourseName="NodeJS";
const instructor ="Mostafa";
const duration = 6;
console.log(`Course Name: ${CourseName}, Instructor: ${instructor}, Duration: ${duration} months`);


function greet(name)
{
    return `Hello ${name}`;
}
console.log(greet("Alice"));
console.log(greet("mostafa"));

function add(a,b)
{
    return a+b;
}
console.log(add(5, 3));


console.log(process.version);
console.log(process.platform);
console.log(process.cwd());