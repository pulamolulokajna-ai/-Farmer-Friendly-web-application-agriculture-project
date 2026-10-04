
/* =====================================================
   1. WEBSITE LOADED
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("FarmConnect website loaded successfully!");

});


/* =====================================================
   2. PRODUCT DATA
===================================================== */

const products = [

    {
        id: 1,
        name: "Fresh Tomatoes",
        category: "Vegetables",
        price: 35,
        farmer: "Ravi Kumar",
        location: "Tanuku",
        icon: "🍅"
    },

    {
        id: 2,
        name: "Fresh Mangoes",
        category: "Fruits",
        price: 80,
        farmer: "Suresh Kumar",
        location: "Vijayawada",
        icon: "🥭"
    },

    {
        id: 3,
        name: "Premium Rice",
        category: "Grains",
        price: 60,
        farmer: "Krishna Rao",
        location: "West Godavari",
        icon: "🌾"
    },

    {
        id: 4,
        name: "Fresh Potatoes",
        category: "Vegetables",
        price: 30,
        farmer: "Ramesh",
        location: "Guntur",
        icon: "🥔"
    },

    {
        id: 5,
        name: "Fresh Bananas",
        category: "Fruits",
        price: 45,
        farmer: "Anil Kumar",
        location: "East Godavari",
        icon: "🍌"
    },

    {
        id: 6,
        name: "Green Chilli",
        category: "Vegetables",
        price: 55,
        farmer: "Mahesh",
        location: "Guntur",
        icon: "🌶️"
    }

];


/* =====================================================
   3. MOBILE NAVIGATION
===================================================== */

const navbar = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav-links");


// Create mobile menu button

const menuButton = document.createElement("button");

menuButton.className = "mobile-menu-btn";

menuButton.innerHTML = "☰";

menuButton.setAttribute("aria-label", "Open navigation menu");


// Add button to navbar

if (navbar) {

    navbar.appendChild(menuButton);

}


// Open / Close menu

if (menuButton) {

    menuButton.addEventListener("click", function () {

        navLinks.classList.toggle("mobile-menu-open");

    });

}


/* =====================================================
   4. NAVIGATION LINKS
===================================================== */

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        // Close mobile menu

        if (navLinks) {

            navLinks.classList.remove("mobile-menu-open");

        }

    });

});


/* =====================================================
   5. SMOOTH SCROLLING
===================================================== */

const allLinks = document.querySelectorAll('a[href^="#"]');

allLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") {

            event.preventDefault();

            return;

        }

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* =====================================================
   6. LOGIN BUTTON
===================================================== */

const loginButton = document.querySelector(".login-btn");

if (loginButton) {

    loginButton.addEventListener("click", function (event) {

        event.preventDefault();

        showNotification(
            "Login page will be available soon.",
            "info"
        );

    });

}


/* =====================================================
   7. REGISTER BUTTON
===================================================== */

const registerButton = document.querySelector(".register-btn");

if (registerButton) {

    registerButton.addEventListener("click", function (event) {

        event.preventDefault();

        showNotification(
            "Registration page will be available soon.",
            "info"
        );

    });

}


/* =====================================================
   8. EXPLORE PRODUCTS BUTTON
===================================================== */

const exploreButton = document.querySelector(".hero .primary-btn");

if (exploreButton) {

    exploreButton.addEventListener("click", function (event) {

        event.preventDefault();

        const productSection =
            document.querySelector(".products-section");

        if (productSection) {

            productSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


/* =====================================================
   9. SELL PRODUCTS BUTTON
===================================================== */

const sellButton = document.querySelector(".secondary-btn");

if (sellButton) {

    sellButton.addEventListener("click", function (event) {

        event.preventDefault();

        showNotification(
            "Farmer product listing will be available soon.",
            "success"
        );

    });

}


/* =====================================================
   10. PRODUCT VIEW BUTTONS
===================================================== */

const productButtons =
    document.querySelectorAll(".view-btn");

productButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        const productCard =
            this.closest(".product-card");

        const productName =
            productCard.querySelector("h3").textContent;

        showNotification(
            `${productName} selected.`,
            "success"
        );

    });

});


/* =====================================================
   11. MARKET BUTTON
===================================================== */

const marketButton =
    document.querySelector(".market-content .primary-btn");

if (marketButton) {

    marketButton.addEventListener("click", function (event) {

        event.preventDefault();

        showNotification(
            "Market trends page will be available soon.",
            "info"
        );

    });

}


/* =====================================================
   12. NOTIFICATION SYSTEM
===================================================== */

function showNotification(message, type = "info") {

    // Remove existing notification

    const oldNotification =
        document.querySelector(".notification");

    if (oldNotification) {

        oldNotification.remove();

    }


    // Create notification

    const notification =
        document.createElement("div");

    notification.className =
        `notification notification-${type}`;


    notification.innerHTML = `

        <span>
            ${message}
        </span>

        <button class="notification-close">
            ×
        </button>

    `;


    document.body.appendChild(notification);


    // Close button

    const closeButton =
        notification.querySelector(".notification-close");

    closeButton.addEventListener("click", function () {

        notification.remove();

    });


    // Automatically remove after 3 seconds

    setTimeout(function () {

        if (notification) {

            notification.remove();

        }

    }, 3000);

}
