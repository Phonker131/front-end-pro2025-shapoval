while (true) {
    let number = prompt("Enter a number");

    if (number === null) break;

    if (isNaN(number)) {
        alert("Please enter a valid number.");
        continue;
    }
    if (isPrime(number)) {
        alert(`${number} is a prime number`);
    } else {
        alert(`${number} is not a prime number`);
    }

    let again = confirm("Wanna enter another number?");
    if (!again) break;
}

function isPrime(number) {
    if (number <= 1) {
        return false;
    } else {
        for (let i = 2; i <= Math.sqrt(number); i++) {
            if (number % i === 0) {
                return false;
            }
        }
        return true;
    }
}
