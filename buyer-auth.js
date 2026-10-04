// ==========================================
// FARMCONNECT - BUYER ACCOUNT SYSTEM
// FRONTEND ONLY - LOCAL STORAGE
// ==========================================


// ==========================================
// STORAGE KEYS
// ==========================================

const BUYER_ACCOUNTS_KEY = "buyerAccounts";

const CURRENT_BUYER_KEY = "currentBuyer";



// ==========================================
// GET ALL BUYER ACCOUNTS
// ==========================================

function getBuyerAccounts() {

    return JSON.parse(
        localStorage.getItem(
            BUYER_ACCOUNTS_KEY
        )
    ) || {};

}



// ==========================================
// SAVE ALL BUYER ACCOUNTS
// ==========================================

function saveBuyerAccounts(accounts) {

    localStorage.setItem(
        BUYER_ACCOUNTS_KEY,
        JSON.stringify(accounts)
    );

}



// ==========================================
// GET CURRENT BUYER
// ==========================================

function getCurrentBuyer() {

    return localStorage.getItem(
        CURRENT_BUYER_KEY
    );

}



// ==========================================
// SET CURRENT BUYER
// ==========================================

function setCurrentBuyer(email) {

    localStorage.setItem(
        CURRENT_BUYER_KEY,
        email
    );

}



// ==========================================
// LOGOUT BUYER
// ==========================================

function logoutBuyer() {

    localStorage.removeItem(
        CURRENT_BUYER_KEY
    );

}



// ==========================================
// CHECK WHETHER BUYER IS LOGGED IN
// ==========================================

function isBuyerLoggedIn() {

    return !!getCurrentBuyer();

}



// ==========================================
// GET LOGGED-IN BUYER DATA
// ==========================================

function getLoggedInBuyer() {

    const email =
        getCurrentBuyer();


    if (!email) {

        return null;

    }


    const accounts =
        getBuyerAccounts();


    return accounts[email] || null;

}



// ==========================================
// CREATE BUYER ACCOUNT
// ==========================================

function createBuyerAccount(
    name,
    email,
    password
) {

    const accounts =
        getBuyerAccounts();


    email =
        email.trim().toLowerCase();


    name =
        name.trim();


    password =
        password.trim();


    // Check required fields

    if (
        !name ||
        !email ||
        !password
    ) {

        return {

            success: false,

            message:
                "Please fill all required fields."

        };

    }


    // Check whether account already exists

    if (accounts[email]) {

        return {

            success: false,

            message:
                "An account with this email already exists."

        };

    }


    // Create account

    accounts[email] = {

        name: name,

        email: email,

        password: password,

        phone: "",

        address: "",

        city: "",

        state: "",

        pincode: "",

        createdAt:
            new Date().toLocaleString()

    };


    // Save accounts

    saveBuyerAccounts(
        accounts
    );


    return {

        success: true,

        message:
            "Account created successfully!"

    };

}



// ==========================================
// LOGIN BUYER
// ==========================================

function loginBuyer(
    email,
    password
) {

    const accounts =
        getBuyerAccounts();


    email =
        email.trim().toLowerCase();


    password =
        password.trim();


    // Check account

    if (!accounts[email]) {

        return {

            success: false,

            message:
                "No account found with this email."

        };

    }


    // Check password

    if (
        accounts[email].password !==
        password
    ) {

        return {

            success: false,

            message:
                "Incorrect password."

        };

    }


    // Set current buyer

    setCurrentBuyer(
        email
    );


    return {

        success: true,

        message:
            "Login successful!"

    };

}



// ==========================================
// UPDATE BUYER ACCOUNT
// ==========================================

function updateBuyerAccount(
    updatedData
) {

    const email =
        getCurrentBuyer();


    if (!email) {

        return false;

    }


    const accounts =
        getBuyerAccounts();


    if (!accounts[email]) {

        return false;

    }


    accounts[email] = {

        ...accounts[email],

        ...updatedData

    };


    saveBuyerAccounts(
        accounts
    );


    return true;

}



// ==========================================
// DELETE BUYER ACCOUNT
// ==========================================

function deleteBuyerAccount() {

    const email =
        getCurrentBuyer();


    if (!email) {

        return false;

    }


    const accounts =
        getBuyerAccounts();


    if (!accounts[email]) {

        return false;

    }


    delete accounts[email];


    saveBuyerAccounts(
        accounts
    );


    logoutBuyer();


    return true;

}