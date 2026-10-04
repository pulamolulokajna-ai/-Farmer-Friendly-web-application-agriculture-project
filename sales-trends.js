// ==========================================
// FARMCONNECT - SALES & MARKETING TRENDS
// FARMER SIDE
// ==========================================


// ==========================================
// GET PRODUCTS
// ==========================================

function getSalesProducts() {

    const products =
        localStorage.getItem("farmProducts");

    if (products) {

        try {

            return JSON.parse(products);

        }

        catch (error) {

            console.log(
                "Products data could not be read."
            );

        }

    }

    return [];

}



// ==========================================
// GET ORDERS
// ==========================================

function getSalesOrders() {

    const orders =
        localStorage.getItem("farmOrders");

    if (orders) {

        try {

            return JSON.parse(orders);

        }

        catch (error) {

            console.log(
                "Orders data could not be read."
            );

        }

    }

    return [];

}



// ==========================================
// GET FARMER PROFILE
// ==========================================

function getSalesFarmerProfile() {

    const profile =
        localStorage.getItem(
            "farmerProfile"
        );

    if (profile) {

        try {

            return JSON.parse(profile);

        }

        catch (error) {

            console.log(
                "Farmer profile could not be read."
            );

        }

    }

    return null;

}



// ==========================================
// CHECK COMPLETED ORDER
// ==========================================

function isCompletedSale(order) {

    return (
        order.status === "Accepted" ||
        order.status === "Delivered"
    );

}



// ==========================================
// GET ORDER TOTAL
// ==========================================

function getOrderAmount(order) {

    return Number(
        order.total
    ) || 0;

}



// ==========================================
// LOAD SALES DASHBOARD
// ==========================================

function loadSalesTrends() {

    const products =
        getSalesProducts();


    const orders =
        getSalesOrders();


    const profile =
        getSalesFarmerProfile();



    // ======================================
    // FARMER NAME
    // ======================================

    const farmerName =
        document.getElementById(
            "farmerName"
        );


    if (
        farmerName &&
        profile
    ) {

        farmerName.textContent =
            profile.name ||
            "Farmer";

    }



    // ======================================
    // ONLY COMPLETED SALES
    // ======================================

    const completedOrders =
        orders.filter(
            function(order) {

                return isCompletedSale(
                    order
                );

            }
        );



    // ======================================
    // TOTAL SALES
    // ======================================

    let totalSales = 0;


    completedOrders.forEach(
        function(order) {

            totalSales +=
                getOrderAmount(
                    order
                );

        }
    );



    const totalSalesElement =
        document.getElementById(
            "trendTotalSales"
        );


    if (totalSalesElement) {

        totalSalesElement.textContent =
            "₹" +
            totalSales.toLocaleString(
                "en-IN"
            );

    }



    // ======================================
    // ORDER COUNT
    // ======================================

    const orderCountElement =
        document.getElementById(
            "trendOrderCount"
        );


    if (orderCountElement) {

        orderCountElement.textContent =
            completedOrders.length;

    }



    // ======================================
    // CUSTOMER COUNT
    // ======================================

    const customers = [];


    completedOrders.forEach(
        function(order) {

            if (
                order.customer &&
                order.customer.name
            ) {

                const name =
                    order.customer.name;


                if (
                    !customers.includes(
                        name
                    )
                ) {

                    customers.push(
                        name
                    );

                }

            }

        }
    );


    const customerCountElement =
        document.getElementById(
            "trendCustomerCount"
        );


    if (customerCountElement) {

        customerCountElement.textContent =
            customers.length;

    }



    // ======================================
    // PRODUCT COUNT
    // ======================================

    const productCountElement =
        document.getElementById(
            "trendProductCount"
        );


    if (productCountElement) {

        productCountElement.textContent =
            products.length;

    }



    // ======================================
    // SALES CHART
    // ======================================

    createSalesChart(
        completedOrders
    );



    // ======================================
    // BEST SELLING PRODUCTS
    // ======================================

    displayBestProducts(
        completedOrders
    );



    // ======================================
    // PRODUCT PERFORMANCE
    // ======================================

    displayProductPerformance(
        completedOrders,
        products
    );

}



// ==========================================
// CREATE SALES CHART
// ==========================================

function createSalesChart(orders) {


    const container =
        document.getElementById(
            "salesChart"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";



    // --------------------------------------
    // LAST 6 MONTHS
    // --------------------------------------

    const now =
        new Date();


    const months = [];


    for (
        let i = 5;
        i >= 0;
        i--
    ) {

        const date =
            new Date(
                now.getFullYear(),
                now.getMonth() - i,
                1
            );


        months.push({

            month:
                date.getMonth(),

            year:
                date.getFullYear(),

            label:
                date.toLocaleString(
                    "en-IN",
                    {
                        month: "short"
                    }
                ),

            sales: 0

        });

    }



    // --------------------------------------
    // ADD SALES TO MONTHS
    // --------------------------------------

    orders.forEach(
        function(order) {


            const orderDate =
                getOrderDate(
                    order
                );


            if (!orderDate) {

                return;

            }


            const monthData =
                months.find(
                    function(item) {

                        return (
                            item.month ===
                            orderDate.getMonth() &&

                            item.year ===
                            orderDate.getFullYear()
                        );

                    }
                );


            if (monthData) {

                monthData.sales +=
                    getOrderAmount(
                        order
                    );

            }

        }
    );



    // --------------------------------------
    // FIND MAXIMUM
    // --------------------------------------

    let maxSales = 0;


    months.forEach(
        function(item) {

            if (
                item.sales >
                maxSales
            ) {

                maxSales =
                    item.sales;

            }

        }
    );



    // --------------------------------------
    // EMPTY CHART
    // --------------------------------------

    if (
        orders.length === 0
    ) {

        container.innerHTML = `

            <div class="trend-empty">

                <div class="trend-empty-icon">
                    📊
                </div>

                <p>
                    No sales data available yet.
                </p>

            </div>

        `;

        return;

    }



    // --------------------------------------
    // CREATE BARS
    // --------------------------------------

    months.forEach(
        function(item) {


            const column =
                document.createElement(
                    "div"
                );


            column.className =
                "chart-column";



            let height = 5;


            if (
                maxSales > 0
            ) {

                height =
                    (
                        item.sales /
                        maxSales
                    ) * 100;

            }



            const value =
                document.createElement(
                    "div"
                );


            value.className =
                "chart-value";


            value.textContent =
                "₹" +
                formatCompactNumber(
                    item.sales
                );



            const bar =
                document.createElement(
                    "div"
                );


            bar.className =
                "chart-bar";


            bar.style.height =
                height + "%";



            const label =
                document.createElement(
                    "div"
                );


            label.className =
                "chart-label";


            label.textContent =
                item.label;



            column.appendChild(
                value
            );


            column.appendChild(
                bar
            );


            column.appendChild(
                label
            );


            container.appendChild(
                column
            );

        }
    );

}



// ==========================================
// GET ORDER DATE
// ==========================================

function getOrderDate(order) {


    const possibleDates = [

        order.date,

        order.createdAt,

        order.orderDate,

        order.created_at

    ];


    for (
        let i = 0;
        i < possibleDates.length;
        i++
    ) {


        if (
            possibleDates[i]
        ) {

            const date =
                new Date(
                    possibleDates[i]
                );


            if (
                !isNaN(
                    date.getTime()
                )
            ) {

                return date;

            }

        }

    }


    return null;

}



// ==========================================
// FORMAT LARGE NUMBERS
// ==========================================

function formatCompactNumber(number) {


    if (
        number >= 100000
    ) {

        return (
            (number / 100000)
                .toFixed(1)
                .replace(".0", "")
            +
            "L"
        );

    }


    if (
        number >= 1000
    ) {

        return (
            (number / 1000)
                .toFixed(1)
                .replace(".0", "")
            +
            "K"
        );

    }


    return Math.round(
        number
    );

}



// ==========================================
// BEST SELLING PRODUCTS
// ==========================================

function displayBestProducts(
    orders
) {


    const container =
        document.getElementById(
            "bestProducts"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";



    // --------------------------------------
    // PRODUCT SALES
    // --------------------------------------

    const productSales = {};



    orders.forEach(
        function(order) {


            const productName =
                getProductName(
                    order
                );


            if (!productName) {

                return;

            }


            const amount =
                getOrderAmount(
                    order
                );


            if (
                !productSales[
                    productName
                ]
            ) {

                productSales[
                    productName
                ] = {

                    name:
                        productName,

                    sales:
                        0,

                    quantity:
                        0,

                    emoji:
                        getProductEmoji(
                            order
                        )

                };

            }


            productSales[
                productName
            ].sales +=
                amount;


            productSales[
                productName
            ].quantity +=
                getOrderQuantity(
                    order
                );

        }
    );



    // --------------------------------------
    // SORT
    // --------------------------------------

    const products =
        Object.values(
            productSales
        )
        .sort(
            function(a, b) {

                return (
                    b.sales -
                    a.sales
                );

            }
        )
        .slice(
            0,
            5
        );



    // --------------------------------------
    // EMPTY
    // --------------------------------------

    if (
        products.length === 0
    ) {

        container.innerHTML = `

            <div class="trend-empty">

                <div class="trend-empty-icon">
                    🌾
                </div>

                <p>
                    No completed sales yet.
                </p>

            </div>

        `;

        return;

    }



    // --------------------------------------
    // DISPLAY
    // --------------------------------------

    products.forEach(
        function(product) {


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "best-product";


            item.innerHTML = `

                <div class="best-product-icon">

                    ${
                        product.emoji ||
                        "🌾"
                    }

                </div>


                <div class="best-product-info">

                    <h3>
                        ${
                            product.name
                        }
                    </h3>


                    <p>
                        ${
                            product.quantity
                        }
                        units sold
                    </p>

                </div>


                <div class="best-product-sales">

                    ₹${
                        product.sales
                            .toLocaleString(
                                "en-IN"
                            )
                    }

                </div>

            `;


            container.appendChild(
                item
            );

        }
    );

}



// ==========================================
// PRODUCT PERFORMANCE
// ==========================================

function displayProductPerformance(
    orders,
    products
) {


    const container =
        document.getElementById(
            "productPerformance"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";



    // --------------------------------------
    // CALCULATE PRODUCT SALES
    // --------------------------------------

    const productSales = {};



    orders.forEach(
        function(order) {


            const name =
                getProductName(
                    order
                );


            if (!name) {

                return;

            }


            if (
                !productSales[name]
            ) {

                productSales[name] =
                    0;

            }


            productSales[name] +=
                getOrderAmount(
                    order
                );

        }
    );



    // --------------------------------------
    // CONVERT TO ARRAY
    // --------------------------------------

    let performance =
        Object.keys(
            productSales
        )
        .map(
            function(name) {

                return {

                    name:
                        name,

                    sales:
                        productSales[name]

                };

            }
        )
        .sort(
            function(a, b) {

                return (
                    b.sales -
                    a.sales
                );

            }
        )
        .slice(
            0,
            8
        );



    // --------------------------------------
    // IF NO SALES
    // --------------------------------------

    if (
        performance.length === 0
    ) {

        container.innerHTML = `

            <div class="trend-empty">

                <div class="trend-empty-icon">
                    📦
                </div>

                <p>
                    Product performance will appear
                    after your first completed order.
                </p>

            </div>

        `;

        return;

    }



    // --------------------------------------
    // MAX SALES
    // --------------------------------------

    const maxSales =
        performance[0].sales;



    // --------------------------------------
    // DISPLAY
    // --------------------------------------

    performance.forEach(
        function(item) {


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "performance-item";



            let percentage = 0;


            if (
                maxSales > 0
            ) {

                percentage =
                    (
                        item.sales /
                        maxSales
                    ) * 100;

            }



            row.innerHTML = `

                <div class="performance-name">

                    ${
                        item.name
                    }

                </div>


                <div
                    class="performance-bar-container"
                >

                    <div
                        class="performance-bar"
                        style="width:${percentage}%"
                    ></div>

                </div>


                <div class="performance-value">

                    ₹${
                        item.sales
                            .toLocaleString(
                                "en-IN"
                            )
                    }

                </div>

            `;


            container.appendChild(
                row
            );

        }
    );

}



// ==========================================
// GET PRODUCT NAME FROM ORDER
// ==========================================

function getProductName(order) {


    if (
        order.product &&
        order.product.name
    ) {

        return order.product.name;

    }


    if (
        order.productName
    ) {

        return order.productName;

    }


    if (
        order.name
    ) {

        return order.name;

    }


    return "Unknown Product";

}



// ==========================================
// GET PRODUCT EMOJI
// ==========================================

function getProductEmoji(order) {


    if (
        order.product &&
        order.product.emoji
    ) {

        return order.product.emoji;

    }


    if (
        order.emoji
    ) {

        return order.emoji;

    }


    return "🌾";

}



// ==========================================
// GET ORDER QUANTITY
// ==========================================

function getOrderQuantity(order) {


    if (
        order.quantity
    ) {

        return (
            Number(
                order.quantity
            ) || 1
        );

    }


    if (
        order.product &&
        order.product.quantity
    ) {

        return (
            Number(
                order.product.quantity
            ) || 1
        );

    }


    return 1;

}



// ==========================================
// LOGOUT
// ==========================================

function logoutUser(event) {


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
// COMING SOON
// ==========================================

function showComingSoon(event) {


    if (event) {

        event.preventDefault();

    }


    alert(
        "This section will be connected soon."
    );

}



// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadSalesTrends();

    }
);