$(document).ready(function () {

    $("#loginForm").submit(function (e) {
        e.preventDefault();

        let email = $("#loginEmail").val();
        let password = $("#loginPassword").val();

        if (email === "" || password === "") {
            alert("Enter all fields!");
        } else {
            window.location.href = "home.html";
        }
    });

    $("#registerForm").submit(function (e) {
        e.preventDefault();

        let name = $("#name").val();
        let email = $("#email").val();
        let password = $("#password").val();

        if (name === "" || email === "" || password === "") {
            alert("All fields required!");
        } else {
            alert("Registered Successfully!");
            window.location.href = "login.html";
        }
    });

});