const yearOfBirth = prompt("Enter your year of birth: ");
const town = prompt("Enter your town: ");
const sport = prompt("Enter your sport: ");

const capitals = { Kyiv: "Ukraine", London: "UK", Washington: "USA" };
const sportsmans = { Football: "Oh, cool! U wanna be like Lionel Messi?", Basketball: "Oh, cool! U wanna be like Kobe Bryant?", Box: "Oh, cool! U wanna be like Oleksandr Usyk?" };

if (!yearOfBirth) {
    alert("Sad that u don't want to enter your year of birth");
} else if (!town) {
    alert("Sad that u don't want to enter your town");
} else if (!sport) {
    alert("Sad that u don't want to enter your sport");
} else {
    if (town in capitals) {
        if (sport in sportsmans) {
            alert(`Your age: ${2025 - yearOfBirth}
        ${sportsmans[sport]}   
        U live in the capital of ${capitals[town]}   
            `);
        } else {
            alert(`Your age is: ${2025 - yearOfBirth} 
            U live in the capital of ${capitals[town]}   
                `);
        }
    } else {
        if (sport in sportsmans) {
            alert(`Your age is: ${2025 - yearOfBirth}
            ${sportsmans[sport]}     
            U live in town ${town}   
                `);
        } else {
            alert(`Your age is: ${2025 - yearOfBirth}   
                U live in town ${town}   
                    `);
        }
    }
}
