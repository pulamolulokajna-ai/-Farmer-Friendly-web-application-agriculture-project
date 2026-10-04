// ==========================================
// FARMCONNECT - FARMER LOGIN
// ==========================================

const FARMER_ACCOUNT_KEY = "farmConnectFarmerAccount";
const FARMER_SESSION_KEY = "farmConnectFarmerLoggedIn";


// ==========================================
// SHOW MESSAGE
// ==========================================

function showMessage(message, type) {

    const messageElement =
        document.getElementById("loginMessage");

    if (!messageElement) {
        alert(message);
        return;
    }

    messageElement.textContent = message;
    messageElement.style.display = "block";

    if (type === "success") {

        messageElement.style.background = "#e8f5e9";
        messageElement.style.color = "#2e7d32";

    } else {

        messageElement.style.background = "#ffebee";
        messageElement.style.color = "#c62828";

    }

}


// ==========================================
// CREATE FARMER ACCOUNT
// ==========================================

function createFarmerAccount() {

    const name = prompt(
        "Enter your full name:"
    );

    if (name === null) {
        return;
    }

    if (name.trim() === "") {

        alert(
            "Please enter your name."
        );

        return;

    }


    const email = prompt(
        "Enter your email:"
    );

    if (email === null) {
        return;
    }

    if (email.trim() === "") {

        alert(
            "Please enter your email."
        );

        return;

    }


    const password = prompt(
        "Create your password:"
    );

    if (password === null) {
        return;
    }

    if (password.trim() === "") {

        alert(
            "Please create a password."
        );

        return;

    }


    // ==========================================
    // CREATE ACCOUNT
    // ==========================================

    const account = {

        name: name.trim(),

        email: email.trim(),

        password: password.trim(),

        createdAt:
            new Date().toLocaleString()

    };


    localStorage.setItem(
        FARMER_ACCOUNT_KEY,
        JSON.stringify(account)
    );


    // ==========================================
    // CREATE FARMER PROFILE
    // ==========================================

    const profile = {

        name: name.trim(),

        email: email.trim(),

        farmName: "",

        location: "",

        phone: "",

        address: "",

        state: "",

        pincode: ""

    };


    localStorage.setItem(
        "farmerProfile",
        JSON.stringify(profile)
    );


    // ==========================================
    // PUT EMAIL INTO LOGIN FORM
    // ==========================================

    const emailInput =
        document.getElementById(
            "farmerEmail"
        );

    if (emailInput) {

        emailInput.value =
            email.trim();

    }


    // ==========================================
    // SUCCESS
    // ==========================================

    alert(
        "Farmer account created successfully! You can now login."
    );

}


// ==========================================
// FARMER LOGIN
// ==========================================

function loginFarmer(event) {

    event.preventDefault();


    const email =
        document.getElementById(
            "farmerEmail"
        ).value.trim();


    const password =
        document.getElementById(
            "farmerPassword"
        ).value.trim();


    if (
        email === "" ||
        password === ""
    ) {

        showMessage(
            "Please enter your email and password.",
            "error"
        );

        return;

    }


    const savedAccount =
        localStorage.getItem(
            FARMER_ACCOUNT_KEY
        );


    if (!savedAccount) {

        showMessage(
            "No farmer account found. Please create a farmer account first.",
            "error"
        );

        return;

    }


    let account;

    try {

        account =
            JSON.parse(
                savedAccount
            );

    } catch (error) {

        showMessage(
            "Account data is corrupted. Please create the account again.",
            "error"
        );

        return;

    }


    // ==========================================
    // CHECK EMAIL
    // ==========================================

    if (
        email.toLowerCase() !==
        account.email.toLowerCase()
    ) {

        showMessage(
            "Incorrect email.",
            "error"
        );

        return;

    }


    // ==========================================
    // CHECK PASSWORD
    // ==========================================

    if (
        password !==
        account.password
    ) {

        showMessage(
            "Incorrect password.",
            "error"
        );

        return;

    }


    // ==========================================
    // LOGIN SUCCESS
    // ==========================================

    localStorage.setItem(
        FARMER_SESSION_KEY,
        "true"
    );


    // Keep farmer profile updated

    let profile = {

        name: account.name,

        email: account.email

    };


    const savedProfile =
        localStorage.getItem(
            "farmerProfile"
        );


    if (savedProfile) {

        try {

            profile =
                JSON.parse(
                    savedProfile
                );

        } catch (error) {

            profile = {

                name: account.name,

                email: account.email

            };

        }

    }


    profile.name =
        account.name;

    profile.email =
        account.email;


    localStorage.setItem(
        "farmerProfile",
        JSON.stringify(profile)
    );


    showMessage(
        "Login successful! Opening dashboard...",
        "success"
    );


    setTimeout(
        function() {

            window.location.href =
                "dashboard.html";

        },
        700
    );

}


// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================

function togglePassword() {

    const passwordInput =
        document.getElementById(
            "farmerPassword"
        );


    if (!passwordInput) {
        return;
    }


    if (
        passwordInput.type ===
        "password"
    ) {

        passwordInput.type =
            "text";

    } else {

        passwordInput.type =
            "password";

    }

}


// ==========================================
// CHECK SESSION
// ==========================================

function checkFarmerSession() {

    const loggedIn =
        localStorage.getItem(
            FARMER_SESSION_KEY
        );


    if (
        loggedIn ===
        "true"
    ) {

        window.location.href =
            "dashboard.html";

    }

}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {


        checkFarmerSession();


        const form =
            document.getElementById(
                "farmerLoginForm"
            );


        if (form) {

            form.addEventListener(
                "submit",
                loginFarmer
            );

        }


    }
);