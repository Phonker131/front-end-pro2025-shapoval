const number = prompt("Enter a 3 digit number").split("");
console.log(number);

if (number.length === 3) {
    if (number[0] === number[1] && number[2] === number[1] && number[0] === number[2]) {
        console.log("All numbers are same");
    } else if ((number[0] === number[1] || number[0] === number[2] || number[1] === number[2]) && !((number[0] === number[1]) === number[2])) {
        console.log("At least two numbers are same");
    } else {
        console.log("All numbers are different");
    }
}
