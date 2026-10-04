// ==========================================
// FARMCONNECT - CHECKOUT
// FARMER-SPECIFIC ORDERS
// ==========================================


// ==========================================
// READ JSON
// ==========================================

function readCheckoutJSON(key, fallback) {

    try {

        const value =
            localStorage.getItem(key);

        return value
            ? JSON.parse(value)
            : fallback;

    } catch (error) {

        console.error(
            "FarmConnect checkout storage error:",
            error
        );

        return fallback;

    }

}


// ==========================================
// GET CART
// ==========================================

function getCheckoutCart() {

    return readCheckoutJSON(
        "buyerCart",
        []
    );

}


// ==========================================
// GET CURRENT BUYER
// ==========================================

function getCurrentBuyer() {

    const possibleKeys = [
        "currentBuyer",
        "buyerProfile",
        "buyer"
    ];


    for (
        let i = 0;
        i < possibleKeys.length;
        i++
    ) {

        const data =
            localStorage.getItem(
                possibleKeys[i]
            );


        if (data) {

            try {

                return JSON.parse(data);

            } catch (error) {

                console.error(
                    "Buyer data error:",
                    error
                );

            }

        }

    }


    return null;

}


// ==========================================
// GET ALL ORDERS
// ==========================================

function getCheckoutOrders() {

    return readCheckoutJSON(
        "farmOrders",
        []
    );

}


// ==========================================
// DISPLAY CHECKOUT ITEMS
// ==========================================

function displayCheckoutItems() {

    const cart =
        getCheckoutCart();


    const container =
        document.getElementById(
            "checkoutItems"
        );


    const subtotalElement =
        document.getElementById(
            "checkoutSubtotal"
        );


    const totalElement =
        document.getElementById(
            "checkoutTotal"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    let total = 0;


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="buyer-empty-products">

                <div class="empty-icon">
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add products before checkout.
                </p>

            </div>

        `;


        if (subtotalElement) {

            subtotalElement.textContent =
                "₹0";

        }


        if (totalElement) {

            totalElement.textContent =
                "₹0";

        }


        return;

    }


    cart.forEach(
        function(product) {

            const quantity =
                Number(
                    product.quantity
                ) || 1;


            const price =
                Number(
                    product.price
                ) || 0;


            const productTotal =
                price * quantity;


            total +=
                productTotal;


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "checkout-item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${
                            product.emoji ||
                            "🌾"
                        }

                        ${
                            product.name ||
                            "Product"
                        }
                    </strong>


                    <p>

                        ${quantity}

                        ${
                            product.unit ||
                            "kg"
                        }

                        × ₹${price}

                    </p>

                </div>


                <strong>
                    ₹${productTotal}
                </strong>

            `;


            container.appendChild(
                item
            );

        }
    );


    if (subtotalElement) {

        subtotalElement.textContent =
            "₹" + total;

    }


    if (totalElement) {

        totalElement.textContent =
            "₹" + total;

    }

}


// ==========================================
// PLACE ORDER
// ==========================================

function placeOrder(event) {

    event.preventDefault();


    const cart =
        getCheckoutCart();


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    // ==========================================
    // GET DELIVERY DETAILS
    // ==========================================

    const name =
        document.getElementById(
            "fullName"
        )?.value.trim();


    const phone =
        document.getElementById(
            "phone"
        )?.value.trim();


    const address =
        document.getElementById(
            "address"
        )?.value.trim();


    const city =
        document.getElementById(
            "city"
        )?.value.trim();


    const state =
        document.getElementById(
            "state"
        )?.value.trim();


    const pincode =
        document.getElementById(
            "pincode"
        )?.value.trim();


    // ==========================================
    // VALIDATION
    // ==========================================

    if (
        !name ||
        !phone ||
        !address ||
        !city ||
        !state ||
        !pincode
    ) {

        alert(
            "Please fill all delivery details."
        );

        return;

    }


    // ==========================================
    // CURRENT BUYER
    // ==========================================

    const buyer =
        getCurrentBuyer();


    // ==========================================
    // CALCULATE TOTAL
    // ==========================================

    let total = 0;


    cart.forEach(
        function(product) {

            const quantity =
                Number(
                    product.quantity
                ) || 1;


            const price =
                Number(
                    product.price
                ) || 0;


            total +=
                price * quantity;

        }
    );


    // ==========================================
    // CREATE ORDER ID
    // ==========================================

    const orderId =
        "FC" +
        Date.now();


    // ==========================================
    // CREATE ORDER
    // ==========================================

    const order = {

        id: orderId,

        date:
            new Date().toLocaleString(),

        status:
            "Pending",

        total:
            total,


        // ======================================
        // BUYER INFORMATION
        // ======================================

        customer: {

            name:
                name,

            phone:
                phone,

            address:
                address,

            city:
                city,

            state:
                state,

            pincode:
                pincode,

            buyerId:
                buyer?.id ||
                buyer?.buyerId ||
                buyer?.email ||
                buyer?.username ||
                ""

        },


        // ======================================
        // PRODUCTS
        // ======================================

        products:
            cart.map(
                function(product) {

                    return {

                        id:
                            product.id ||
                            product.productId ||
                            product._id ||
                            "",

                        name:
                            product.name ||
                            "Product",

                        category:
                            product.category ||
                            "Other",

                        price:
                            Number(
                                product.price
                            ) || 0,

                        quantity:
                            Number(
                                product.quantity
                            ) || 1,

                        unit:
                            product.unit ||
                            "kg",

                        emoji:
                            product.emoji ||
                            "🌾",


                        // IMPORTANT:
                        // Save the farmer who owns
                        // this product.

                        farmerId:
                            product.farmerId ||
                            product.farmerID ||
                            product.ownerId ||
                            product.sellerId ||
                            product.farmer?.id ||
                            product.farmer?.farmerId ||
                            product.farmer?.email ||
                            product.farmer?.username ||
                            "",

                        farmerName:
                            product.farmerName ||
                            product.farmer?.name ||
                            ""

                    };

                }
            )

    };


    // ==========================================
    // GET EXISTING ORDERS
    // ==========================================

    const orders =
        getCheckoutOrders();


    // ==========================================
    // IMPORTANT
    //
    // ONE BUYER ORDER MAY CONTAIN PRODUCTS
    // FROM MULTIPLE FARMERS.
    //
    // Therefore create one farmer order
    // for each farmer.
    // ==========================================

    const farmerGroups = {};


    cart.forEach(
        function(product) {

            const farmerId =
                String(

                    product.farmerId ||
                    product.farmerID ||
                    product.ownerId ||
                    product.sellerId ||
                    product.farmer?.id ||
                    product.farmer?.farmerId ||
                    product.farmer?.email ||
                    product.farmer?.username ||
                    ""

                )
                .trim()
                .toLowerCase();


            if (!farmerId) {

                return;

            }


            if (
                !farmerGroups[farmerId]
            ) {

                farmerGroups[farmerId] = [];

            }


            farmerGroups[farmerId].push(
                product
            );

        }
    );


    // ==========================================
    // CREATE FARMER-SPECIFIC ORDERS
    // ==========================================

    const farmerIds =
        Object.keys(
            farmerGroups
        );


    // ==========================================
    // IF PRODUCTS DO NOT HAVE FARMER ID
    // ==========================================

    if (farmerIds.length === 0) {

        alert(

            "The products in your cart are missing farmer information. Please refresh the products and add them to the cart again."

        );

        return;

    }


    farmerIds.forEach(
        function(farmerId, farmerIndex) {


            const farmerProducts =
                farmerGroups[farmerId];


            let farmerTotal =
                0;


            farmerProducts.forEach(
                function(product) {

                    farmerTotal +=

                        (
                            Number(
                                product.price
                            ) || 0
                        )

                        *

                        (
                            Number(
                                product.quantity
                            ) || 1
                        );

                }
            );


            const farmerOrder = {

                id:
                    orderId +
                    "-" +
                    (farmerIndex + 1),

                date:
                    new Date()
                        .toLocaleString(),

                status:
                    "Pending",

                total:
                    farmerTotal,


                // ==================================
                // FARMER ID
                // ==================================

                farmerId:
                    farmerId,


                // ==================================
                // BUYER
                // ==================================

                customer:
                    order.customer,


                // ==================================
                // FARMER PRODUCTS
                // ==================================

                products:
                    farmerProducts.map(
                        function(product) {

                            return {

                                id:
                                    product.id ||
                                    product.productId ||
                                    product._id ||
                                    "",

                                name:
                                    product.name ||
                                    "Product",

                                category:
                                    product.category ||
                                    "Other",

                                price:
                                    Number(
                                        product.price
                                    ) || 0,

                                quantity:
                                    Number(
                                        product.quantity
                                    ) || 1,

                                unit:
                                    product.unit ||
                                    "kg",

                                emoji:
                                    product.emoji ||
                                    "🌾",

                                farmerId:
                                    product.farmerId ||
                                    product.farmerID ||
                                    product.ownerId ||
                                    product.sellerId ||
                                    product.farmer?.id ||
                                    product.farmer?.farmerId ||
                                    product.farmer?.email ||
                                    product.farmer?.username ||
                                    "",

                                farmerName:
                                    product.farmerName ||
                                    product.farmer?.name ||
                                    ""

                            };

                        }
                    )

            };


            orders.push(
                farmerOrder
            );

        }
    );


    // ==========================================
    // SAVE ORDERS
    // ==========================================

    localStorage.setItem(
        "farmOrders",
        JSON.stringify(
            orders
        )
    );


    // ==========================================
    // CLEAR CART
    // ==========================================

    localStorage.removeItem(
        "buyerCart"
    );


    // ==========================================
    // SUCCESS MESSAGE
    // ==========================================

    alert(
        "Order placed successfully! 🎉"
    );


    // ==========================================
    // GO TO BUYER ORDERS
    // ==========================================

    window.location.href =
        "buyer-orders.html";

}


// ==========================================
// FORM SUBMIT
// ==========================================

function setupCheckoutForm() {

    const form =
        document.getElementById(
            "checkoutForm"
        );


    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        placeOrder
    );

}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayCheckoutItems();

        setupCheckoutForm();

    }
);