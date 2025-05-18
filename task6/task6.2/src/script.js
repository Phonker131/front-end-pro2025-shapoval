function product(a) {
    return function (b) {
        return a * b;
    };
}

const result = product(5)(2);

console.log(result);
