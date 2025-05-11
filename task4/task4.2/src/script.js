while (true) {
    let input = prompt("Enter a currency: ").toUpperCase();

    let currencyList = { USD: 41, EUR: 46, CZK: 2, GBP: 58 };

    if (!currencyList[input]) break;

    for (let i = 10; i <= 100; i += 10) {
        console.log(`${i}${input} = ${i * currencyList[input]}UAH`);
    }

    let again = confirm("Wanna calculate another currency?");
    if (!again) break;
}
