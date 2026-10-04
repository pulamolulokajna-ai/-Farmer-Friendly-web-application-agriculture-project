// ==========================================
// FARMCONNECT FARMER DASHBOARD
// DYNAMIC FRONTEND DATA
// ==========================================


// ------------------------------------------
// GET PRODUCTS FROM LOCAL STORAGE
// ------------------------------------------

function getProducts() {

    const products =
        localStorage.getItem("farmProducts");

    if (products) {

        return JSON.parse(products);

    }

    return [];

}



// ------------------------------------------
// GET ORDERS FROM LOCAL STORAGE
// ------------------------------------------

function getOrders() {

    const orders =
        localStorage.getItem("farmOrders");

    if (orders) {

        return JSON.parse(orders);

    }

    return [];

}



// ------------------------------------------
// GET FARMER PROFILE
// ------------------------------------------

function getFarmerProfile() {

    const profile =
        localStorage.getItem("farmerProfile");

    if (profile) {

        return JSON.parse(profile);

    }

    return null;

}



// ------------------------------------------
// LOAD DASHBOARD
// ------------------------------------------

function loadDashboard() {

    const products = getProducts();

    const orders = getOrders();

    const profile = getFarmerProfile();



    // -------------------------------
    // PRODUCT COUNT
    // -------------------------------

    const productCount =
        document.getElementById("productCount");

    if (productCount) {

        productCount.textContent =
            products.length;

    }



    // -------------------------------
    // ORDER COUNT
    // -------------------------------

    const orderCount =
        document.getElementById("orderCount");

    if (orderCount) {

        orderCount.textContent =
            orders.length;

    }



    // -------------------------------
    // TOTAL SALES
    // -------------------------------

    const totalSales =
        document.getElementById("totalSales");


    let sales = 0;


    orders.forEach(function(order) {

        /*
         * Count accepted and delivered
         * orders as sales.
         */

        if (
            order.status === "Accepted" ||
            order.status === "Delivered"
        ) {

            sales +=
                Number(order.total) || 0;

        }

    });


    if (totalSales) {

        totalSales.textContent =
            "₹" + sales;

    }



    // -------------------------------
    // CUSTOMER COUNT
    // -------------------------------

    const customerCount =
        document.getElementById("customerCount");


    const customers = [];


    orders.forEach(function(order) {

        if (
            order.customer &&
            order.customer.name
        ) {

            const customerName =
                order.customer.name;


            if (
                !customers.includes(customerName)
            ) {

                customers.push(customerName);

            }

        }

    });


    if (customerCount) {

        customerCount.textContent =
            customers.length;

    }



    // -------------------------------
    // FARMER NAME
    // -------------------------------

    if (profile) {

        const farmerName =
            document.getElementById("farmerName");

        const welcomeMessage =
            document.getElementById("welcomeMessage");

        const profileName =
            document.getElementById("profileName");

        const farmName =
            document.getElementById("farmName");

        const farmLocation =
            document.getElementById("farmLocation");


        if (farmerName) {

            farmerName.textContent =
                profile.name || "Farmer";

        }


        if (welcomeMessage) {

            welcomeMessage.textContent =
                `Welcome back, ${profile.name || "Farmer"}! 👋`;

        }


        if (profileName) {

            profileName.textContent =
                profile.name || "Not added";

        }


        if (farmName) {

            farmName.textContent =
                profile.farmName || "Not added";

        }


        if (farmLocation) {

            farmLocation.textContent =
                profile.location || "Not added";

        }

    }



    // -------------------------------
    // DISPLAY RECENT PRODUCTS
    // -------------------------------

    displayRecentProducts(products);

}



// ------------------------------------------
// DISPLAY RECENT PRODUCTS
// ------------------------------------------

function displayRecentProducts(products) {

    const container =
        document.getElementById("recentProducts");


    if (!container) {

        return;

    }


    // No products

    if (products.length === 0) {

        container.innerHTML = `

            <div class="empty-message">

                <p>
                    You haven't added any products yet.
                </p>

                <button
                    class="add-first-product"
                    onclick="goToAddProduct()">

                    ➕ Add Your First Product

                </button>

            </div>

        `;

        return;

    }



    // Show latest 3 products

    const recentProducts =
        products.slice(-3).reverse();


    container.innerHTML = "";


    recentProducts.forEach(function(product) {


        const productCard =
            document.createElement("div");


        productCard.className =
            "recent-product";


        productCard.innerHTML = `

            <div class="product-icon">
                ${product.emoji || "🌾"}
            </div>


            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.category || "Product"}
                </p>

            </div>


            <div class="product-price">

                <strong>
                    ₹${product.price}
                </strong>

                <small>
                    /${product.unit || "kg"}
                </small>

            </div>

        `;


        container.appendChild(productCard);

    });

}



// ------------------------------------------
// GO TO ADD PRODUCT
// ------------------------------------------

function goToAddProduct() {

    window.location.href =
        "add-product.html";

}



// ------------------------------------------
// GO TO PRODUCTS
// ------------------------------------------

function goToProducts() {

    window.location.href =
        "products.html";

}



// ------------------------------------------
// GO TO ORDERS
// ------------------------------------------

function goToOrders() {

    window.location.href =
        "orders.html";

}



// ------------------------------------------
// EDIT PROFILE
// ------------------------------------------

function editProfile() {

    alert(
        "Farmer Profile page will be added next."
    );

}



// ------------------------------------------
// COMING SOON
// ------------------------------------------

function showComingSoon(event) {

    if (event) {

        event.preventDefault();

    }


    alert(
        "This section will be connected soon."
    );

}



// ------------------------------------------
// LOGOUT
// ------------------------------------------

function logoutUser(event) {

    if (event) {

        event.preventDefault();

    }


    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (confirmLogout) {

        alert(
            "You have been logged out."
        );

        window.location.href =
            "../../index.html";

    }

}



// ------------------------------------------
// LOAD WHEN PAGE OPENS
// ------------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    loadDashboard
);