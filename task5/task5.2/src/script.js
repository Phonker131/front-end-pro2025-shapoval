function computeAvg(numbers) {
    let sum = 0;
    let count = 0;
    for (let i = 0; i < numbers.length; i++) {
        if (!isNaN(numbers[i]) && numbers[i] !== undefined && numbers[i] !== null) {
            sum += numbers[i];
            count++;
        }
    }
    return sum / count;
}

const input = [{}, 1, 2, 3, 4, 5, 6, "string", null];

let avg = computeAvg(input);
console.log("The average of the numbers is: " + avg);
