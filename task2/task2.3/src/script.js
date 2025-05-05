const resp = prompt("Enter 5 digit number", "");
if (resp.length == 5) {
    let numb = resp.split("");
    console.log(numb.join(" ").toString());
} else {
    console.log("Not a 5 digit number");
}
