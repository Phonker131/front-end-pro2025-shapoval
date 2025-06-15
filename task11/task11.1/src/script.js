let savedURI = "";

let enterURIbtn = document.getElementById("btn-enter-page");
let redirectbtn = document.getElementById("btn-redirect");

enterURIbtn.addEventListener("click", function () {
    let uri = prompt("Enter the URI you want to be redirect to:");
    if (uri && uri.trim() != "") {
        savedURI = uri;
        alert("URI saved successfully");
    } else {
        alert("Please enter a valid URI");
    }
});

redirectbtn.addEventListener("click", function () {
    if (savedURI) {
        window.location.href = savedURI;
    } else {
        alert("No URI saved");
    }
});
