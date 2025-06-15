const form = document.forms.helper;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const message = form.message.value.trim();
    const phone = form.phoneNumber.value.trim();
    const email = form.email.value.trim();

    const fields = ["name", "message", "phoneNumber", "email"];
    let isValid = true;

    const errors = {
        name: "",
        message: "",
        phone: "",
        email: "",
    };

    if (!name) {
        errors.name = "Name is required";
    }

    if (message.length < 5) {
        errors.message = "Message must be at least 5 characters";
    }

    const phoneRegex = /^\+380\d{9}$/;
    if (!phoneRegex.test(phone)) {
        errors.phone = "Number must be in the format +380123456789";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.email = "Email must be in the format name@domain.com";
    }

    fields.forEach((fieldName) => {
        const input = form[fieldName];
        const errorText = input.closest(".mb-3").querySelector(".form-text");

        let fieldKey = fieldName === "phoneNumber" ? "phone" : fieldName;

        if (errors[fieldKey]) {
            isValid = false;
            errorText.textContent = errors[fieldKey];
            errorText.style.color = "red";
        } else {
            errorText.textContent = "";
        }
    });

    if (isValid) {
        console.log({
            name,
            message,
            phone,
            email,
        });
        form.reset();
        alert("Data successfully submitted!");
    }
});
