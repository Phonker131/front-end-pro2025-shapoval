let n = prompt("Enter a number: ");

for (let i = 1; i <= 100 && !(i ** 2 > n); i++) {
    console.log(i);
}
