// ==========================================
// FARMCONNECT - MY PRODUCTS
// ==========================================


// Get products from localStorage
function getProducts() {

    return JSON.parse(
        localStorage.getItem("farmProducts")
    ) || [];

}


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts() {

    const products = getProducts();

    const container =
        document.getElementById("productsContainer");

    const totalProducts =
        document.getElementById("totalProducts");


    // Update product count
    if (totalProducts) {

        totalProducts.textContent =
            products.length;

    }


    if (!container) {
        return;
    }


    // No products
    if (products.length === 0) {

        container.innerHTML = `

            <div class="empty-products">

                <div class="empty-icon">
                    📦
                </div>

                <h2>
                    No Products Yet
                </h2>

                <p>
                    You haven't added any products.
                </p>

                <a
                    href="add-product.html"
                    class="add-first-product">

                    ➕ Add Your First Product

                </a>

            </div>

        `;

        return;

    }


    // Clear container
    container.innerHTML = "";


    // Display every product
    products.forEach(function(product, index) {

        const card =
            document.createElement("div");

        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-card-icon">
                ${product.emoji || "🌾"}
            </div>


            <div class="product-card-content">

                <h2>
                    ${product.name}
                </h2>

                <p class="product-category">
                    ${product.category}
                </p>


                <div class="product-details">

                    <p>
                        <strong>Price:</strong>
                        ₹${product.price}/${product.unit}
                    </p>

                    <p>
                        <strong>Quantity:</strong>
                        ${product.quantity} ${product.unit}
                    </p>

                    <p>
                        <strong>Location:</strong>
                        ${product.location}
                    </p>

                </div>


                <p class="product-description">

                    ${product.description || "No description added."}

                </p>


                <small>
                    Added on: ${product.dateAdded}
                </small>

            </div>


            <div class="product-actions">

                <button
                    onclick="editProduct(${index})">

                    ✏️ Edit

                </button>


                <button
                    onclick="deleteProduct(${index})">

                    🗑️ Delete

                </button>

            </div>

        `;


        container.appendChild(card);

    });

}



// ==========================================
// DELETE PRODUCT
// ==========================================

function deleteProduct(index) {

    const products = getProducts();


    const product =
        products[index];


    const confirmDelete =
        confirm(
            `Delete "${product.name}"?`
        );


    if (!confirmDelete) {

        return;

    }


    // Remove product
    products.splice(index, 1);


    // Save updated products
    localStorage.setItem(
        "farmProducts",
        JSON.stringify(products)
    );


    // Refresh page
    displayProducts();

}



// ==========================================
// EDIT PRODUCT
// ==========================================

function editProduct(index) {

    const products = getProducts();

    const product =
        products[index];


    // Save which product is being edited
    localStorage.setItem(
        "editingProductIndex",
        index
    );


    // Store product temporarily
    localStorage.setItem(
        "editingProduct",
        JSON.stringify(product)
    );


    alert(
        "Edit Product page will be connected next."
    );

}



// ==========================================
// LOAD PRODUCTS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    displayProducts
);