// ==========================================
// FARMCONNECT - BUYER PROFILE
// ACCOUNT-SPECIFIC VERSION
// ==========================================


// ==========================================
// GET CURRENT LOGGED-IN BUYER
// ==========================================

function getCurrentLoggedInBuyer() {

    const possibleKeys = [

        "currentBuyer",

        "loggedInBuyer",

        "farmconnectCurrentBuyer",

        "buyerCurrentUser"

    ];


    for (
        let i = 0;
        i < possibleKeys.length;
        i++
    ) {

        const stored =
            localStorage.getItem(
                possibleKeys[i]
            );


        if (!stored) {

            continue;

        }


        try {

            const buyer =
                JSON.parse(stored);


            if (buyer) {

                return buyer;

            }

        }

        catch (error) {

            console.log(
                "Buyer data could not be read."
            );

        }

    }


    return null;

}



// ==========================================
// GET UNIQUE BUYER ID
// ==========================================

function getBuyerUniqueId() {

    const buyer =
        getCurrentLoggedInBuyer();


    if (!buyer) {

        return null;

    }


    /*
       Email is used as the account identifier.

       This means:

       buyer1@gmail.com
       and
       buyer2@gmail.com

       will have completely separate profiles.
    */

    if (buyer.email) {

        return String(
            buyer.email
        )
            .trim()
            .toLowerCase();

    }


    if (buyer.id) {

        return String(
            buyer.id
        );

    }


    if (buyer.username) {

        return String(
            buyer.username
        )
            .trim()
            .toLowerCase();

    }


    return null;

}



// ==========================================
// CREATE PROFILE STORAGE KEY
// ==========================================

function getProfileStorageKey() {

    const buyerId =
        getBuyerUniqueId();


    if (!buyerId) {

        return null;

    }


    return (
        "buyerProfile_" +
        encodeURIComponent(
            buyerId
        )
    );

}



// ==========================================
// GET PROFILE
// ==========================================

function getBuyerProfile() {

    const storageKey =
        getProfileStorageKey();


    if (!storageKey) {

        return null;

    }


    const storedProfile =
        localStorage.getItem(
            storageKey
        );


    if (!storedProfile) {

        return null;

    }


    try {

        return JSON.parse(
            storedProfile
        );

    }

    catch (error) {

        console.log(
            "Profile data could not be read."
        );

        return null;

    }

}



// ==========================================
// SAVE PROFILE
// ==========================================

function saveBuyerProfile(profile) {

    const storageKey =
        getProfileStorageKey();


    if (!storageKey) {

        console.log(
            "No logged-in buyer found."
        );

        return false;

    }


    localStorage.setItem(

        storageKey,

        JSON.stringify(
            profile
        )

    );


    return true;

}



// ==========================================
// LOAD PROFILE
// ==========================================

function loadProfile() {


    const buyer =
        getCurrentLoggedInBuyer();


    // --------------------------------------
    // NO LOGGED-IN BUYER
    // --------------------------------------

    if (!buyer) {

        showProfileMessage(
            "Please login as a buyer first."
        );

        return;

    }



    // --------------------------------------
    // GET SAVED PROFILE
    // --------------------------------------

    const profile =
        getBuyerProfile();



    // --------------------------------------
    // FORM ELEMENTS
    // --------------------------------------

    const name =
        document.getElementById(
            "profileName"
        );


    const email =
        document.getElementById(
            "profileEmail"
        );


    const phone =
        document.getElementById(
            "profilePhone"
        );


    const city =
        document.getElementById(
            "profileCity"
        );


    const state =
        document.getElementById(
            "profileState"
        );


    const pincode =
        document.getElementById(
            "profilePincode"
        );


    const address =
        document.getElementById(
            "profileAddress"
        );



    // ======================================
    // EXISTING PROFILE
    // ======================================

    if (profile) {


        if (name) {

            name.value =
                profile.name || "";

        }


        if (email) {

            email.value =
                profile.email ||
                buyer.email ||
                "";

        }


        if (phone) {

            phone.value =
                profile.phone || "";

        }


        if (city) {

            city.value =
                profile.city || "";

        }


        if (state) {

            state.value =
                profile.state || "";

        }


        if (pincode) {

            pincode.value =
                profile.pincode || "";

        }


        if (address) {

            address.value =
                profile.address || "";

        }


        updateProfileDisplay(
            profile.name ||
            buyer.name ||
            "Buyer"
        );


        return;

    }



    // ======================================
    // FIRST TIME PROFILE
    // ======================================

    /*
       IMPORTANT:

       We do NOT load the old "buyerProfile"
       key anymore.

       A new buyer gets their own empty
       profile with only their login name
       and email.
    */


    if (name) {

        name.value =
            buyer.name || "";

    }


    if (email) {

        email.value =
            buyer.email || "";

    }


    if (phone) {

        phone.value =
            "";

    }


    if (city) {

        city.value =
            "";

    }


    if (state) {

        state.value =
            "";

    }


    if (pincode) {

        pincode.value =
            "";

    }


    if (address) {

        address.value =
            "";

    }


    updateProfileDisplay(

        buyer.name ||
        "Buyer"

    );

}



// ==========================================
// UPDATE PROFILE DISPLAY
// ==========================================

function updateProfileDisplay(name) {


    const displayName =
        name || "Buyer";


    const profileDisplayName =
        document.getElementById(
            "profileDisplayName"
        );


    const headerProfileName =
        document.getElementById(
            "headerProfileName"
        );


    if (profileDisplayName) {

        profileDisplayName.textContent =
            displayName;

    }


    if (headerProfileName) {

        headerProfileName.textContent =
            displayName;

    }

}



// ==========================================
// SAVE PROFILE FORM
// ==========================================

function handleProfileSubmit(event) {


    event.preventDefault();



    const buyer =
        getCurrentLoggedInBuyer();


    if (!buyer) {

        showProfileMessage(
            "Please login as a buyer first."
        );

        return;

    }



    // ======================================
    // GET FORM VALUES
    // ======================================

    const name =
        document.getElementById(
            "profileName"
        )
        .value
        .trim();


    const email =
        document.getElementById(
            "profileEmail"
        )
        .value
        .trim();


    const phone =
        document.getElementById(
            "profilePhone"
        )
        .value
        .trim();


    const city =
        document.getElementById(
            "profileCity"
        )
        .value
        .trim();


    const state =
        document.getElementById(
            "profileState"
        )
        .value
        .trim();


    const pincode =
        document.getElementById(
            "profilePincode"
        )
        .value
        .trim();


    const address =
        document.getElementById(
            "profileAddress"
        )
        .value
        .trim();



    // ======================================
    // CREATE PROFILE
    // ======================================

    const profile = {

        name: name,

        email:
            email ||
            buyer.email ||
            "",

        phone: phone,

        city: city,

        state: state,

        pincode: pincode,

        address: address,

        updatedAt:
            new Date().toLocaleString()

    };



    // ======================================
    // SAVE ACCOUNT-SPECIFIC PROFILE
    // ======================================

    const saved =
        saveBuyerProfile(
            profile
        );


    if (!saved) {

        showProfileMessage(
            "Unable to save profile. Please login again."
        );

        return;

    }



    // ======================================
    // UPDATE DISPLAY
    // ======================================

    updateProfileDisplay(
        name
    );



    // ======================================
    // SUCCESS
    // ======================================

    showProfileMessage(
        "Profile saved successfully! ✅"
    );

}



// ==========================================
// SUCCESS MESSAGE
// ==========================================

function showProfileMessage(message) {


    const messageElement =
        document.getElementById(
            "profileMessage"
        );


    if (!messageElement) {

        return;

    }


    messageElement.textContent =
        message;


    messageElement.style.display =
        "block";


    setTimeout(
        function() {

            messageElement.style.display =
                "none";

        },
        3000
    );

}



// ==========================================
// CLEAR PROFILE
// ==========================================

function clearProfile() {


    const confirmClear =
        confirm(
            "Are you sure you want to clear your profile information?"
        );


    if (!confirmClear) {

        return;

    }



    const storageKey =
        getProfileStorageKey();


    if (storageKey) {

        localStorage.removeItem(
            storageKey
        );

    }



    const form =
        document.getElementById(
            "profileForm"
        );


    if (form) {

        form.reset();

    }



    // Put logged-in buyer's basic
    // information back into form

    const buyer =
        getCurrentLoggedInBuyer();


    const name =
        document.getElementById(
            "profileName"
        );


    const email =
        document.getElementById(
            "profileEmail"
        );


    if (buyer) {


        if (name) {

            name.value =
                buyer.name || "";

        }


        if (email) {

            email.value =
                buyer.email || "";

        }


        updateProfileDisplay(
            buyer.name ||
            "Buyer"
        );

    }

    else {

        updateProfileDisplay(
            "Buyer"
        );

    }



    showProfileMessage(
        "Profile information cleared."
    );

}



// ==========================================
// LOGOUT
// ==========================================

function confirmLogout() {


    const confirmed =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmed) {

        return false;

    }


    /*
       IMPORTANT:

       Remove the current logged-in buyer
       when possible.

       This prevents the next user from
       being treated as the previous user.
    */

    try {

        if (
            typeof logoutBuyer ===
            "function"
        ) {

            logoutBuyer();

        }

        else {

            localStorage.removeItem(
                "currentBuyer"
            );

            localStorage.removeItem(
                "loggedInBuyer"
            );

            localStorage.removeItem(
                "farmconnectCurrentBuyer"
            );

            localStorage.removeItem(
                "buyerCurrentUser"
            );

        }

    }

    catch (error) {

        console.log(
            "Logout cleanup completed."
        );

    }


    return true;

}



// ==========================================
// CHECK LOGIN
// ==========================================

function checkBuyerLogin() {


    const buyer =
        getCurrentLoggedInBuyer();


    if (!buyer) {

        return false;

    }


    return true;

}



// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {


        // ----------------------------------
        // CHECK LOGGED-IN BUYER
        // ----------------------------------

        const loggedIn =
            checkBuyerLogin();


        if (!loggedIn) {

            console.log(
                "No logged-in buyer found."
            );

            return;

        }



        // ----------------------------------
        // LOAD PROFILE
        // ----------------------------------

        loadProfile();



        // ----------------------------------
        // FORM
        // ----------------------------------

        const form =
            document.getElementById(
                "profileForm"
            );


        if (form) {

            form.addEventListener(
                "submit",
                handleProfileSubmit
            );

        }


    }
);