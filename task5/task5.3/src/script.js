function removeElement(array, item) {
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i] === item) {
            array.splice(i, 1);
        }
    }
    return array;
}

const array = [1, 3, 4, 6, 2, 5, 7, 4, 5, 5, 5, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 7];

console.log(removeElement(array, 4));
