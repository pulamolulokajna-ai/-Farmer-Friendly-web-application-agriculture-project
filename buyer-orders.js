// ==========================================
// FARMCONNECT - BUYER ORDERS
// ==========================================


// ==========================================
// GET ORDERS
// ==========================================

function getBuyerOrders() {

    return JSON.parse(
        localStorage.getItem("farmOrders")
    ) || [];

}



// ==========================================
// DISPLAY ORDERS
// ==========================================

function displayBuyerOrders() {

    const orders =
        getBuyerOrders();


    const container =
        document.getElementById(
            "buyerOrdersContainer"
        );


    const totalOrders =
        document.getElementById(
            "buyerTotalOrders"
        );


    const pendingOrders =
        document.getElementById(
            "buyerPendingOrders"
        );


    const completedOrders =
        document.getElementById(
            "buyerCompletedOrders"
        );


    const totalSpent =
        document.getElementById(
            "buyerTotalSpent"
        );


    if (!container) {

        return;

    }


    // ======================================
    // CALCULATE STATISTICS
    // ======================================

    let pending = 0;

    let completed = 0;

    let spent = 0;


    orders.forEach(function(order) {

        if (order.status === "Pending") {

            pending++;

        }


        if (
            order.status === "Accepted" ||
            order.status === "Delivered"
        ) {

            completed++;

        }


        if (
            order.status === "Accepted" ||
            order.status === "Delivered"
        ) {

            spent +=
                Number(order.total) || 0;

        }

    });


    if (totalOrders) {

        totalOrders.textContent =
            orders.length;

    }


    if (pendingOrders) {

        pendingOrders.textContent =
            pending;

    }


    if (completedOrders) {

        completedOrders.textContent =
            completed;

    }


    if (totalSpent) {

        totalSpent.textContent =
            "₹" + spent;

    }



    // ======================================
    // NO ORDERS
    // ======================================

    if (orders.length === 0) {

        container.innerHTML = `

            <div class="empty-orders">

                <div class="empty-orders-icon">
                    📦
                </div>

                <h2>
                    No Orders Yet
                </h2>

                <p>
                    You haven't placed any orders yet.
                </p>

                <a
                    href="products.html"
                    class="add-first-product"
                >
                    🛍️ Browse Products
                </a>

            </div>

        `;

        return;

    }



    // ======================================
    // CLEAR
    // ======================================

    container.innerHTML = "";



    // ======================================
    // DISPLAY ORDERS
    // ======================================

    orders
        .slice()
        .reverse()
        .forEach(function(order) {


            let statusClass =
                "status-pending";


            if (order.status === "Accepted") {

                statusClass =
                    "status-accepted";

            }


            if (order.status === "Rejected") {

                statusClass =
                    "status-rejected";

            }


            if (order.status === "Delivered") {

                statusClass =
                    "status-delivered";

            }



            // ==================================
            // PRODUCTS
            // ==================================

            let productsHTML = "";


            if (order.products) {

                order.products.forEach(
                    function(product) {

                        const quantity =
                            Number(product.quantity) || 1;


                        const productTotal =
                            Number(product.price) *
                            quantity;


                        productsHTML += `

                            <div class="order-product">

                                <div class="order-product-icon">
                                    ${product.emoji || "🌾"}
                                </div>

                                <div class="order-product-info">

                                    <strong>
                                        ${product.name}
                                    </strong>

                                    <span>
                                        ${quantity}
                                        ${product.unit || "kg"}
                                        × ₹${product.price}
                                    </span>

                                </div>

                                <strong>
                                    ₹${productTotal}
                                </strong>

                            </div>

                        `;

                    }
                );

            }



            // ==================================
            // ORDER CARD
            // ==================================

            const card =
                document.createElement("div");


            card.className =
                "order-card";


            card.innerHTML = `

                <div class="order-card-header">

                    <div>

                        <h2>
                            Order ${order.id}
                        </h2>

                        <p>
                            ${order.date || ""}
                        </p>

                    </div>


                    <span
                        class="order-status ${statusClass}"
                    >
                        ${order.status || "Pending"}
                    </span>

                </div>


                <div class="order-products">

                    <h3>
                        🛒 Products
                    </h3>

                    ${productsHTML}

                </div>


                <div class="order-card-footer">

                    <div>

                        <span>
                            Order Total
                        </span>

                        <strong>
                            ₹${order.total || 0}
                        </strong>

                    </div>

                </div>

            `;


            container.appendChild(card);

        });

}



// ==========================================
// LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    displayBuyerOrders
);



// ==========================================
// AUTO REFRESH
// ==========================================

window.addEventListener(
    "storage",
    function() {

        displayBuyerOrders();

    }
);