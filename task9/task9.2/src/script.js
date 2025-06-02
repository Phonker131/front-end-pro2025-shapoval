const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function getEnevNumbers(arr) {
    return arr.filter((num) => num % 2 === 0);
}

const even = getEnevNumbers(arr);
console.log(even); // [2, 4, 6, 8]
