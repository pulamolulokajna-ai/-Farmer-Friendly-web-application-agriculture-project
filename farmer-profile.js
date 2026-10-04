// ==========================================
// FARMCONNECT - FARMER PROFILE
// ==========================================


// ==========================================
// STORAGE KEY
// ==========================================

const FARMER_PROFILE_KEY = "farmerProfile";



// ==========================================
// GET FARMER PROFILE
// ==========================================

function getFarmerProfile() {

    const savedProfile =
        localStorage.getItem(
            FARMER_PROFILE_KEY
        );

    if (!savedProfile) {

        return null;

    }

    try {

        return JSON.parse(
            savedProfile
        );

    }

    catch (error) {

        console.error(
            "Unable to read farmer profile:",
            error
        );

        return null;

    }

}



// ==========================================
// SAVE FARMER PROFILE
// ==========================================

function saveFarmerProfile(profile) {

    localStorage.setItem(
        FARMER_PROFILE_KEY,
        JSON.stringify(profile)
    );

}



// ==========================================
// LOAD PROFILE
// ==========================================

function loadFarmerProfile() {

    const profile =
        getFarmerProfile();


    if (!profile) {

        return;

    }



    const name =
        document.getElementById(
            "farmerName"
        );


    const email =
        document.getElementById(
            "farmerEmail"
        );


    const phone =
        document.getElementById(
            "farmerPhone"
        );


    const farmName =
        document.getElementById(
            "farmName"
        );


    const farmLocation =
        document.getElementById(
            "farmLocation"
        );


    const state =
        document.getElementById(
            "farmerState"
        );


    const pincode =
        document.getElementById(
            "farmerPincode"
        );


    const address =
        document.getElementById(
            "farmerAddress"
        );



    if (name) {

        name.value =
            profile.name || "";

    }


    if (email) {

        email.value =
            profile.email || "";

    }


    if (phone) {

        phone.value =
            profile.phone || "";

    }


    if (farmName) {

        farmName.value =
            profile.farmName || "";

    }


    if (farmLocation) {

        farmLocation.value =
            profile.location || "";

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



    updateFarmerName(
        profile.name
    );

}



// ==========================================
// UPDATE HEADER NAME
// ==========================================

function updateFarmerName(name) {

    const displayName =
        name || "Farmer";


    const headerName =
        document.getElementById(
            "headerFarmerName"
        );


    if (headerName) {

        headerName.textContent =
            displayName;

    }

}



// ==========================================
// SAVE PROFILE FORM
// ==========================================

function handleFarmerProfileSubmit(
    event
) {

    event.preventDefault();



    const name =
        document.getElementById(
            "farmerName"
        ).value.trim();


    const email =
        document.getElementById(
            "farmerEmail"
        ).value.trim();


    const phone =
        document.getElementById(
            "farmerPhone"
        ).value.trim();


    const farmName =
        document.getElementById(
            "farmName"
        ).value.trim();


    const location =
        document.getElementById(
            "farmLocation"
        ).value.trim();


    const state =
        document.getElementById(
            "farmerState"
        ).value.trim();


    const pincode =
        document.getElementById(
            "farmerPincode"
        ).value.trim();


    const address =
        document.getElementById(
            "farmerAddress"
        ).value.trim();



    // ======================================
    // PROFILE OBJECT
    // ======================================

    const profile = {

        name: name,

        email: email,

        phone: phone,

        farmName: farmName,

        location: location,

        state: state,

        pincode: pincode,

        address: address,

        updatedAt:
            new Date().toLocaleString()

    };



    // ======================================
    // SAVE
    // ======================================

    saveFarmerProfile(
        profile
    );



    // ======================================
    // UPDATE HEADER
    // ======================================

    updateFarmerName(
        name
    );



    // ======================================
    // MESSAGE
    // ======================================

    showFarmerMessage(
        "Farmer profile saved successfully! ✅"
    );

}



// ==========================================
// SHOW MESSAGE
// ==========================================

function showFarmerMessage(
    message
) {

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

function clearFarmerProfile() {

    const confirmClear =
        confirm(
            "Are you sure you want to clear your farmer profile information?"
        );


    if (!confirmClear) {

        return;

    }



    localStorage.removeItem(
        FARMER_PROFILE_KEY
    );



    const form =
        document.getElementById(
            "farmerProfileForm"
        );


    if (form) {

        form.reset();

    }



    updateFarmerName(
        "Farmer"
    );



    showFarmerMessage(
        "Farmer profile information cleared."
    );

}



// ==========================================
// LOGOUT
// ==========================================

function logoutFarmer(event) {

    if (event) {

        event.preventDefault();

    }


    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) {

        return;

    }


    alert(
        "You have been logged out."
    );


    window.location.href =
        "../../index.html";

}



// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {


        loadFarmerProfile();



        const form =
            document.getElementById(
                "farmerProfileForm"
            );


        if (form) {

            form.addEventListener(
                "submit",
                handleFarmerProfileSubmit
            );

        }

    }
);