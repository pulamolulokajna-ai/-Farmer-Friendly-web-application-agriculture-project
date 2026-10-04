// ==========================================
// FARMCONNECT - FARMER ORDERS
// FARMER-SPECIFIC ORDERS
// ==========================================


// ==========================================
// GET CURRENT LOGGED-IN FARMER
// ==========================================

function getCurrentFarmer() {

    try {

        const farmer =
            localStorage.getItem("currentFarmer");

        if (farmer) {

            return JSON.parse(farmer);

        }

    } catch (error) {

        console.error(
            "Error reading current farmer:",
            error
        );

    }

    return null;

}


// ==========================================
// GET ALL ORDERS
// ==========================================

function getAllOrders() {

    try {

        return JSON.parse(
            localStorage.getItem("farmOrders")
        ) || [];

    } catch (error) {

        console.error(
            "Error reading orders:",
            error
        );

        return [];

    }

}


// ==========================================
// GET ORDERS FOR CURRENT FARMER
// ==========================================

function getOrders() {

    const allOrders =
        getAllOrders();

    const farmer =
        getCurrentFarmer();


    // If farmer login information
    // is not available, show no orders.

    if (!farmer) {

        console.warn(
            "No logged-in farmer found."
        );

        return [];

    }


    const farmerId =
        String(
            farmer.id ||
            farmer.farmerId ||
            farmer.email ||
            farmer.username ||
            ""
        )
        .trim()
        .toLowerCase();


    if (!farmerId) {

        return [];

    }


    return allOrders.filter(
        function(order) {

            const orderFarmerId =
                String(
                    order.farmerId ||
                    order.farmer?.id ||
                    order.farmer?.farmerId ||
                    order.farmer?.email ||
                    order.farmer?.username ||
                    ""
                )
                .trim()
                .toLowerCase();


            return (
                orderFarmerId === farmerId
            );

        }
    );

}


// ==========================================
// DISPLAY ORDERS
// ==========================================

function displayOrders() {

    const orders =
        getOrders();


    const container =
        document.getElementById(
            "ordersContainer"
        );


    const totalOrders =
        document.getElementById(
            "totalOrders"
        );


    const pendingOrders =
        document.getElementById(
            "pendingOrders"
        );


    const acceptedOrders =
        document.getElementById(
            "acceptedOrders"
        );


    const totalRevenue =
        document.getElementById(
            "totalRevenue"
        );


    // ==========================================
    // COUNTS
    // ==========================================

    let pending = 0;

    let accepted = 0;

    let revenue = 0;


    orders.forEach(
        function(order) {

            if (
                order.status ===
                "Pending"
            ) {

                pending++;

            }


            if (
                order.status ===
                "Accepted"
            ) {

                accepted++;

            }


            if (
                order.status === "Accepted" ||
                order.status === "Delivered"
            ) {

                revenue +=
                    Number(order.total) || 0;

            }

        }
    );


    if (totalOrders) {

        totalOrders.textContent =
            orders.length;

    }


    if (pendingOrders) {

        pendingOrders.textContent =
            pending;

    }


    if (acceptedOrders) {

        acceptedOrders.textContent =
            accepted;

    }


    if (totalRevenue) {

        totalRevenue.textContent =
            "₹" + revenue;

    }


    if (!container) {

        return;

    }


    // ==========================================
    // NO ORDERS
    // ==========================================

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
                    Orders placed for your
                    products will appear here.
                </p>

            </div>

        `;

        return;

    }


    // ==========================================
    // CLEAR OLD ORDERS
    // ==========================================

    container.innerHTML = "";


    // ==========================================
    // DISPLAY ORDERS
    // ==========================================

    orders
        .slice()
        .reverse()
        .forEach(
            function(order) {


                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "order-card";


                // ==================================
                // PRODUCTS
                // ==================================

                let productsHTML = "";


                if (order.products) {

                    order.products.forEach(
                        function(product) {

                            const quantity =
                                Number(
                                    product.quantity
                                ) || 1;


                            const productTotal =
                                (
                                    Number(
                                        product.price
                                    ) || 0
                                ) * quantity;


                            productsHTML += `

                                <div class="order-product">

                                    <div class="order-product-icon">

                                        ${
                                            product.emoji ||
                                            "🌾"
                                        }

                                    </div>


                                    <div class="order-product-info">

                                        <strong>

                                            ${
                                                product.name ||
                                                "Product"
                                            }

                                        </strong>


                                        <span>

                                            ${quantity}

                                            ${
                                                product.unit ||
                                                "kg"
                                            }

                                            ×

                                            ₹${
                                                product.price ||
                                                0
                                            }

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
                // STATUS CLASS
                // ==================================

                let statusClass =
                    "status-pending";


                if (
                    order.status ===
                    "Accepted"
                ) {

                    statusClass =
                        "status-accepted";

                }


                if (
                    order.status ===
                    "Rejected"
                ) {

                    statusClass =
                        "status-rejected";

                }


                if (
                    order.status ===
                    "Delivered"
                ) {

                    statusClass =
                        "status-delivered";

                }


                // ==================================
                // ACTION BUTTONS
                // ==================================

                let actionsHTML = "";


                if (
                    order.status ===
                    "Pending"
                ) {

                    actionsHTML = `

                        <button
                            class="order-accept-btn"
                            onclick="updateOrderStatus(
                                '${order.id}',
                                'Accepted'
                            )"
                        >
                            ✅ Accept Order
                        </button>


                        <button
                            class="order-reject-btn"
                            onclick="updateOrderStatus(
                                '${order.id}',
                                'Rejected'
                            )"
                        >
                            ❌ Reject
                        </button>

                    `;

                }


                else if (
                    order.status ===
                    "Accepted"
                ) {

                    actionsHTML = `

                        <button
                            class="order-deliver-btn"
                            onclick="updateOrderStatus(
                                '${order.id}',
                                'Delivered'
                            )"
                        >
                            🚚 Mark as Delivered
                        </button>

                    `;

                }


                // ==================================
                // BUYER DETAILS
                // ==================================

                const customer =
                    order.customer || {};


                // ==================================
                // ORDER CARD
                // ==================================

                card.innerHTML = `

                    <div class="order-card-header">

                        <div>

                            <h2>
                                Order ${
                                    order.id ||
                                    "Order"
                                }
                            </h2>


                            <p>
                                ${
                                    order.date ||
                                    ""
                                }
                            </p>

                        </div>


                        <span
                            class="order-status ${statusClass}"
                        >

                            ${
                                order.status ||
                                "Pending"
                            }

                        </span>

                    </div>



                    <div class="order-buyer">

                        <h3>
                            👤 Buyer Information
                        </h3>


                        <p>

                            <strong>
                                Name:
                            </strong>

                            ${
                                customer.name ||
                                "Not available"
                            }

                        </p>


                        <p>

                            <strong>
                                Phone:
                            </strong>

                            ${
                                customer.phone ||
                                "Not available"
                            }

                        </p>


                        <p>

                            <strong>
                                Address:
                            </strong>

                            ${
                                customer.address ||
                                ""
                            }

                            ${
                                customer.city ||
                                ""
                            }

                            ${
                                customer.state ||
                                ""
                            }

                            ${
                                customer.pincode ||
                                ""
                            }

                        </p>

                    </div>



                    <div class="order-products">

                        <h3>
                            🛒 Products
                        </h3>


                        ${
                            productsHTML
                        }

                    </div>



                    <div class="order-card-footer">

                        <div>

                            <span>
                                Order Total
                            </span>


                            <strong>
                                ₹${
                                    order.total ||
                                    0
                                }
                            </strong>

                        </div>


                        <div class="order-actions">

                            ${
                                actionsHTML
                            }

                        </div>

                    </div>

                `;


                container.appendChild(
                    card
                );

            }
        );

}


// ==========================================
// UPDATE ORDER STATUS
// ==========================================

function updateOrderStatus(
    orderId,
    newStatus
) {

    const allOrders =
        getAllOrders();


    const orderIndex =
        allOrders.findIndex(
            function(order) {

                return String(
                    order.id
                ) === String(
                    orderId
                );

            }
        );


    if (orderIndex === -1) {

        alert(
            "Order could not be found."
        );

        return;

    }


    const farmer =
        getCurrentFarmer();


    if (!farmer) {

        alert(
            "Please login as a farmer first."
        );

        return;

    }


    // Make sure this order
    // actually belongs to this farmer.

    const farmerId =
        String(
            farmer.id ||
            farmer.farmerId ||
            farmer.email ||
            farmer.username ||
            ""
        )
        .trim()
        .toLowerCase();


    const orderFarmerId =
        String(
            allOrders[orderIndex].farmerId ||
            allOrders[orderIndex].farmer?.id ||
            allOrders[orderIndex].farmer?.farmerId ||
            allOrders[orderIndex].farmer?.email ||
            allOrders[orderIndex].farmer?.username ||
            ""
        )
        .trim()
        .toLowerCase();


    if (
        !farmerId ||
        farmerId !== orderFarmerId
    ) {

        alert(
            "You are not allowed to modify this order."
        );

        return;

    }


    allOrders[orderIndex].status =
        newStatus;


    localStorage.setItem(
        "farmOrders",
        JSON.stringify(
            allOrders
        )
    );


    displayOrders();

}


// ==========================================
// STORAGE UPDATE
// ==========================================

window.addEventListener(
    "storage",
    function() {

        displayOrders();

    }
);


// ==========================================
// LOAD PAGE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayOrders();

    }
);