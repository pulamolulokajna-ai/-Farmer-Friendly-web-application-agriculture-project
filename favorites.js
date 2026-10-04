// ==========================================
// FARMCONNECT - FAVORITES
// ==========================================


// ==========================================
// GET FAVORITES
// ==========================================

function getFavorites() {

    return JSON.parse(
        localStorage.getItem("buyerFavorites")
    ) || [];

}



// ==========================================
// SAVE FAVORITES
// ==========================================

function saveFavorites(favorites) {

    localStorage.setItem(
        "buyerFavorites",
        JSON.stringify(favorites)
    );

}



// ==========================================
// TOGGLE FAVORITE
// ==========================================

function toggleFavorite(product) {

    let favorites =
        getFavorites();


    const existingIndex =
        favorites.findIndex(
            function(item) {

                return String(item.id) ===
                    String(product.id);

            }
        );


    if (existingIndex !== -1) {

        favorites.splice(
            existingIndex,
            1
        );

    }

    else {

        favorites.push(product);

    }


    saveFavorites(favorites);


    displayFavorites();

}



// ==========================================
// CHECK FAVORITE
// ==========================================

function isFavorite(productId) {

    const favorites =
        getFavorites();


    return favorites.some(
        function(product) {

            return String(product.id) ===
                String(productId);

        }
    );

}



// ==========================================
// DISPLAY FAVORITES
// ==========================================

function displayFavorites() {

    const container =
        document.getElementById(
            "favoritesContainer"
        );


    if (!container) {

        return;

    }


    const favorites =
        getFavorites();


    // ======================================
    // EMPTY
    // ======================================

    if (favorites.length === 0) {

        container.innerHTML = `

            <div class="empty-products">

                <div class="empty-icon">
                    ❤️
                </div>

                <h2>
                    No Favorites Yet
                </h2>

                <p>
                    Save products you like and
                    they will appear here.
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
    // DISPLAY
    // ======================================

    container.innerHTML = "";


    favorites.forEach(
        function(product) {


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
                        ${product.category || "Product"}
                    </p>


                    <div class="product-details">

                        <p>
                            <strong>Price:</strong>
                            ₹${product.price}/${product.unit || "kg"}
                        </p>

                        <p>
                            <strong>Location:</strong>
                            ${product.location || "Not available"}
                        </p>

                    </div>


                    <p class="product-description">

                        ${product.description || "Fresh agricultural product."}

                    </p>


                    <div class="product-actions">

                        <button
                            onclick='removeFavorite("${product.id}")'
                        >
                            ❤️ Remove
                        </button>

                    </div>

                </div>

            `;


            container.appendChild(card);

        }
    );

}



// ==========================================
// REMOVE FAVORITE
// ==========================================

function removeFavorite(productId) {

    let favorites =
        getFavorites();


    favorites =
        favorites.filter(
            function(product) {

                return String(product.id) !==
                    String(productId);

            }
        );


    saveFavorites(favorites);


    displayFavorites();

}



// ==========================================
// LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    displayFavorites
);