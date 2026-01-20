function validateAndSubmit() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let course = document.getElementById("course").value;

    let gender = document.querySelector('input[name="gender"]:checked')?.value || "";

    let valid = true;

    let errors = ["nameErr", "emailErr", "passErr", "cpassErr", "genderErr", "courseErr"];
    errors.forEach(id => document.getElementById(id).innerHTML = "");

    if (name === "") {
        document.getElementById("nameErr").innerHTML = "Name is required";
        valid = false;
    }

    if (email === "") {
        document.getElementById("emailErr").innerHTML = "Email is required";
        valid = false;
    }

    if (password.length < 6) {
        document.getElementById("passErr").innerHTML = "Minimum 6 characters required";
        valid = false;
    }

    if (password !== confirmPassword) {
        document.getElementById("cpassErr").innerHTML = "Passwords do not match";
        valid = false;
    }

    if (gender === "") {
        document.getElementById("genderErr").innerHTML = "Select gender";
        valid = false;
    }

    if (course === "") {
        document.getElementById("courseErr").innerHTML = "Select course";
        valid = false;
    }

    if (!valid) return false;

    let userData = { name, email, password, gender, course };

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful");
    window.location.href = "display.html";

    return false;
}
