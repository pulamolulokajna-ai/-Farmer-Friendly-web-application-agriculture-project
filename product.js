// ==========================================
// FARMCONNECT - ADD PRODUCT
// ==========================================


// Get the product form
const productForm = document.getElementById("productForm");


// ==========================================
// WHEN FARMER SUBMITS THE FORM
// ==========================================

if (productForm) {

    productForm.addEventListener("submit", function (event) {

        // Stop the page from refreshing
        event.preventDefault();


        // ----------------------------------
        // GET DATA FROM FORM
        // ----------------------------------

        const productName =
            document.getElementById("productName").value.trim();

        const category =
            document.getElementById("category").value;

        const price =
            document.getElementById("price").value;

        const unit =
            document.getElementById("unit").value;

        const quantity =
            document.getElementById("quantity").value;

        const location =
            document.getElementById("location").value.trim();

        const description =
            document.getElementById("description").value.trim();

        const emoji =
            document.getElementById("emoji").value;


        // ----------------------------------
        // CREATE PRODUCT OBJECT
        // ----------------------------------

        const newProduct = {

            id: Date.now(),

            name: productName,

            category: category,

            price: Number(price),

            unit: unit,

            quantity: Number(quantity),

            location: location,

            description: description,

            emoji: emoji,

            dateAdded: new Date().toLocaleDateString()

        };


        // ----------------------------------
        // GET EXISTING PRODUCTS
        // ----------------------------------

        let products =
            JSON.parse(
                localStorage.getItem("farmProducts")
            ) || [];


        // ----------------------------------
        // ADD NEW PRODUCT
        // ----------------------------------

        products.push(newProduct);


        // ----------------------------------
        // SAVE PRODUCTS
        // ----------------------------------

        localStorage.setItem(
            "farmProducts",
            JSON.stringify(products)
        );


        // ----------------------------------
        // SUCCESS MESSAGE
        // ----------------------------------

        alert(
            "Product added successfully! 🌾"
        );


        // ----------------------------------
        // GO TO MY PRODUCTS
        // ----------------------------------

        window.location.href =
            "products.html";

    });

}