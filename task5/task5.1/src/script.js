function delLetter(text, letters) {
    let res = "";
    for (let i = 0; i < text.length; i++) {
        if (!letters.includes(text[i])) {
            res += text[i];
        }
    }
    return res;
}

const message = prompt("Enter your string");
const chars = prompt("Enter some chars for removing");

alert(delLetter(message, chars));
