function printChoice() {
    let input;

    for (let i = 0; i < 10; i++) {
        input = prompt("Enter a number bigger than 100:");

        if (input === null || isNaN(input) || input === "") return;

        if (input > 100) {
            break;
        }
    }

    console.log("Last entered number:", input);
}

printChoice();
