// ==========================================
// FARMCONNECT - BUYER DASHBOARD / SHOPPING
// ==========================================


function readJSON(key, fallback) {

    try {

        const value =
            localStorage.getItem(key);

        return value
            ? JSON.parse(value)
            : fallback;

    } catch (error) {

        console.error(
            "FarmConnect storage error:",
            error
        );

        return fallback;

    }

}


// ==========================================
// GET FARM PRODUCTS
// ==========================================

function getFarmProducts() {

    return readJSON(
        "farmProducts",
        []
    );

}


// ==========================================
// GET CART
// ==========================================

function getBuyerCart() {

    return readJSON(
        "buyerCart",
        []
    );

}


// ==========================================
// GET ORDERS
// ==========================================

function getBuyerOrders() {

    return readJSON(
        "farmOrders",
        []
    );

}


// ==========================================
// GET FAVORITES
// ==========================================

function getBuyerFavorites() {

    return readJSON(
        "buyerFavorites",
        []
    );

}


// ==========================================
// SAVE CART
// ==========================================

function saveBuyerCart(cart) {

    localStorage.setItem(
        "buyerCart",
        JSON.stringify(cart)
    );

}


// ==========================================
// SAVE FAVORITES
// ==========================================

function saveBuyerFavorites(favorites) {

    localStorage.setItem(
        "buyerFavorites",
        JSON.stringify(favorites)
    );

}


// ==========================================
// PRODUCT KEY
// ==========================================

function productKey(product) {

    if (!product) {
        return "";
    }

    return String(
        product.id ||
        product.productId ||
        product._id ||
        product.name ||
        ""
    )
        .trim()
        .toLowerCase();

}


// ==========================================
// PRODUCT QUANTITY
// ==========================================

function getProductQuantity(product) {

    return Number(

        product.availableQuantity ??
        product.available ??
        product.stock ??
        product.quantity ??
        0

    ) || 0;

}


// ==========================================
// PRODUCT UNIT
// ==========================================

function getProductUnit(product) {

    return product.unit || "kg";

}


// ==========================================
// UPDATE DASHBOARD COUNTS
// ==========================================

function updateDashboardCounts() {

    const products =
        getFarmProducts();

    const cart =
        getBuyerCart();

    const orders =
        getBuyerOrders();

    const favorites =
        getBuyerFavorites();


    const availableProducts =
        document.getElementById(
            "availableProducts"
        );

    const cartCount =
        document.getElementById(
            "cartCount"
        );

    const orderCount =
        document.getElementById(
            "orderCount"
        );

    const favoriteCount =
        document.getElementById(
            "favoriteCount"
        );


    if (availableProducts) {

        availableProducts.textContent =
            products.length;

    }


    let totalCartItems = 0;


    cart.forEach(function(item) {

        totalCartItems +=
            Number(item.quantity) || 1;

    });


    if (cartCount) {

        cartCount.textContent =
            totalCartItems;

    }


    if (orderCount) {

        orderCount.textContent =
            orders.length;

    }


    if (favoriteCount) {

        favoriteCount.textContent =
            favorites.length;

    }

}


// ==========================================
// CHECK FAVORITE
// ==========================================

function isFavorite(product) {

    const key =
        productKey(product);

    return getBuyerFavorites()
        .some(function(item) {

            return productKey(item) === key;

        });

}


// ==========================================
// TOGGLE FAVORITE
// ==========================================

function toggleFavorite(index) {

    const products =
        getFarmProducts();

    const product =
        products[index];


    if (!product) {
        return;
    }


    const favorites =
        getBuyerFavorites();

    const key =
        productKey(product);


    const existingIndex =
        favorites.findIndex(
            function(item) {

                return productKey(item) === key;

            }
        );


    if (existingIndex >= 0) {

        favorites.splice(
            existingIndex,
            1
        );

    } else {

        favorites.push(product);

    }


    saveBuyerFavorites(
        favorites
    );


    displayBuyerProducts(
        currentCategory,
        currentSearch
    );


    updateDashboardCounts();

}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(index) {

    const products =
        getFarmProducts();

    const product =
        products[index];


    if (!product) {

        alert(
            "Product could not be found."
        );

        return;

    }


    const available =
        getProductQuantity(product);


    const cart =
        getBuyerCart();


    const key =
        productKey(product);


    const existing =
        cart.find(function(item) {

            return productKey(item) === key;

        });


    if (existing) {

        const currentQuantity =
            Number(existing.quantity) || 1;


        if (
            available > 0 &&
            currentQuantity >= available
        ) {

            alert(
                "You cannot add more than the available quantity."
            );

            return;

        }


        existing.quantity =
            currentQuantity + 1;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveBuyerCart(cart);


    updateDashboardCounts();


    const button =
        document.querySelector(
            '[data-cart-index="' +
            index +
            '"]'
        );


    if (button) {

        const oldText =
            button.innerHTML;


        button.innerHTML =
            "✅ Added to Cart";


        setTimeout(function() {

            if (button) {

                button.innerHTML =
                    oldText;

            }

        }, 900);

    }

}


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayBuyerProducts(
    category,
    searchTerm
) {

    const container =
        document.getElementById(
            "buyerProducts"
        );


    if (!container) {
        return;
    }


    const products =
        getFarmProducts();


    const categoryFilter =
        category || "All";


    const search =
        (searchTerm || "")
            .trim()
            .toLowerCase();


    const filtered =
        products.filter(
            function(product) {

                const productCategory =
                    String(
                        product.category ||
                        "Other"
                    );


                const matchesCategory =
                    categoryFilter === "All" ||
                    productCategory
                        .toLowerCase() ===
                    categoryFilter
                        .toLowerCase();


                const text = [

                    product.name,
                    product.category,
                    product.description,
                    product.location

                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();


                return (

                    matchesCategory &&
                    (
                        !search ||
                        text.includes(search)
                    )

                );

            }
        );


    if (filtered.length === 0) {

        container.innerHTML = `

            <div class="buyer-empty-products">

                <div class="empty-icon">
                    🌱
                </div>

                <h3>
                    No Products Found
                </h3>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    filtered.forEach(
        function(product) {

            const originalIndex =
                products.indexOf(product);


            const favorite =
                isFavorite(product);


            const quantity =
                getProductQuantity(product);


            const unit =
                getProductUnit(product);


            const categoryName =
                product.category ||
                "Other";


            const location =
                product.location ||
                product.farmLocation ||
                "India";


            const description =
                product.description ||
                "Fresh agricultural product from the farmer.";


            const emoji =
                product.emoji ||
                "🌾";


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "buyer-product-card";


            card.innerHTML = `

                <div class="buyer-product-image">

                    <span class="product-category-badge">
                        ${categoryName}
                    </span>


                    <button
                        type="button"
                        class="favorite-button"
                        onclick="toggleFavorite(${originalIndex})"
                        aria-label="Toggle favorite"
                    >
                        ${favorite ? "❤️" : "🤍"}
                    </button>


                    ${emoji}

                </div>


                <div class="buyer-product-info">

                    <h3>
                        ${product.name || "Unnamed Product"}
                    </h3>


                    <div class="category">
                        ${categoryName}
                    </div>


                    <div class="buyer-product-price">

                        <strong>
                            ₹${product.price || 0}
                        </strong>

                        <span>
                            /${unit}
                        </span>

                    </div>


                    <div class="buyer-product-location">

                        <strong>
                            Available:
                        </strong>

                        ${quantity} ${unit}

                        <br>

                        <strong>
                            Location:
                        </strong>

                        ${location}

                        <br>

                        ${description}

                    </div>


                    <button
                        type="button"
                        class="add-cart-button"
                        data-cart-index="${originalIndex}"
                        onclick="addToCart(${originalIndex})"
                    >
                        🛒 Add to Cart
                    </button>

                </div>

            `;


            container.appendChild(card);

        }
    );

}


// ==========================================
// CURRENT FILTER
// ==========================================

let currentCategory =
    "All";

let currentSearch =
    "";


// ==========================================
// FILTER CATEGORY
// ==========================================

function filterCategory(category) {

    currentCategory =
        category || "All";


    currentSearch =
        "";


    const search =
        document.getElementById(
            "productSearch"
        );


    if (search) {

        search.value = "";

    }


    displayBuyerProducts(
        currentCategory,
        currentSearch
    );


    scrollToProducts();

}


// ==========================================
// SHOW ALL PRODUCTS
// ==========================================

function showAllProducts() {

    currentCategory =
        "All";


    currentSearch =
        "";


    const search =
        document.getElementById(
            "productSearch"
        );


    if (search) {

        search.value = "";

    }


    displayBuyerProducts(
        "All",
        ""
    );


    scrollToProducts();

}


// ==========================================
// SCROLL TO PRODUCTS
// ==========================================

function scrollToProducts() {

    const section =
        document.getElementById(
            "products"
        );


    if (section) {

        section.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }

}


// ==========================================
// GO TO CART
// ==========================================

function goToCart() {

    window.location.href =
        "cart.html";

}


// ==========================================
// GO TO ORDERS
// ==========================================

function goToOrders() {

    window.location.href =
        "buyer-orders.html";

}


// ==========================================
// GO TO FAVORITES
// ==========================================

function goToFavorites() {

    window.location.href =
        "favorites.html";

}


// ==========================================
// GO TO PRODUCTS
// ==========================================

function goToProducts() {

    window.location.href =
        "products.html";

}


// ==========================================
// LOGOUT
// ==========================================

function confirmLogout() {

    return confirm(
        "Are you sure you want to logout?"
    );

}


// ==========================================
// RECENT ORDERS
// ==========================================

function displayRecentOrders() {

    const container =
        document.getElementById(
            "recentOrders"
        );


    if (!container) {
        return;
    }


    const orders =
        getBuyerOrders();


    if (orders.length === 0) {

        container.innerHTML = `

            <div class="buyer-empty-products">

                <div class="empty-icon">
                    📦
                </div>

                <h3>
                    No Orders Yet
                </h3>

                <p>
                    Your placed orders will appear here.
                </p>

                <button
                    class="view-all-button"
                    onclick="scrollToProducts()"
                >
                    🛍️ Start Shopping
                </button>

            </div>

        `;

        return;

    }


    const recentOrders =
        orders
            .slice()
            .reverse()
            .slice(0, 3);


    container.innerHTML = "";


    recentOrders.forEach(
        function(order) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "recent-order-card";


            let statusClass =
                "pending";


            if (
                order.status ===
                "Accepted"
            ) {

                statusClass =
                    "accepted";

            }


            if (
                order.status ===
                "Rejected"
            ) {

                statusClass =
                    "rejected";

            }


            if (
                order.status ===
                "Delivered"
            ) {

                statusClass =
                    "delivered";

            }


            const productNames =
                order.products

                    ? order.products
                        .map(
                            function(product) {
                                return product.name;
                            }
                        )
                        .join(", ")

                    : "Products";


            card.innerHTML = `

                <div class="recent-order-icon">
                    📦
                </div>


                <div class="recent-order-info">

                    <h3>
                        ${order.id || "Order"}
                    </h3>

                    <p>
                        ${productNames}
                    </p>

                    <small>
                        ${order.date || ""}
                    </small>

                </div>


                <div class="recent-order-right">

                    <strong>
                        ₹${order.total || 0}
                    </strong>

                    <span
                        class="order-status-${statusClass}"
                    >
                        ${order.status || "Pending"}
                    </span>

                </div>

            `;


            container.appendChild(card);

        }
    );

}


// ==========================================
// SEARCH
// ==========================================

function setupSearch() {

    const search =
        document.getElementById(
            "productSearch"
        );


    if (!search) {
        return;
    }


    search.addEventListener(
        "input",
        function() {

            currentSearch =
                search.value;


            displayBuyerProducts(
                currentCategory,
                currentSearch
            );

        }
    );

}


// ==========================================
// LOAD DASHBOARD
// ==========================================

function loadBuyerDashboard() {

    updateDashboardCounts();

    displayBuyerProducts(
        "All",
        ""
    );

    displayRecentOrders();

    setupSearch();

}


// ==========================================
// STORAGE UPDATE
// ==========================================

window.addEventListener(
    "storage",
    function() {

        updateDashboardCounts();

        displayBuyerProducts(
            currentCategory,
            currentSearch
        );

        displayRecentOrders();

    }
);


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadBuyerDashboard
);