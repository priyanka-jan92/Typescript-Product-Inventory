"use strict";
// ============================================================
// PRODUCT INVENTORY MANAGER
// Part B - Advanced Web Technologies
// TypeScript + Tailwind CSS
// ============================================================
// ============================================================
// 2. INITIAL PRODUCT DATA
// ============================================================
// Array containing the initial products.
let products = [
    {
        id: 1,
        name: "Laptop",
        price: 55000,
        inStock: true,
        tags: ["Electronics", "Computer"]
    },
    {
        id: 2,
        name: "Smartphone",
        price: 25000,
        inStock: true,
        tags: ["Electronics", "Mobile"]
    },
    {
        id: 3,
        name: "Headphones",
        price: 3000,
        inStock: false,
        tags: ["Audio"]
    },
    {
        id: 4,
        name: "Keyboard",
        price: 1500,
        inStock: true,
        tags: ["Computer", "Accessories"]
    }
];
// ============================================================
// 3. GET HTML ELEMENTS
// ============================================================
// Product form.
const productForm = document.getElementById("productForm");
// Product name input.
const productNameInput = document.getElementById("productName");
// Product price input.
const productPriceInput = document.getElementById("productPrice");
// Product tags input.
const productTagsInput = document.getElementById("productTags");
// Product stock checkbox.
const productStockInput = document.getElementById("productStock");
// Product list container.
const productList = document.getElementById("productList");
// Total products counter.
const totalProducts = document.getElementById("totalProducts");
// Available products counter.
const availableProducts = document.getElementById("availableProducts");
// Out-of-stock counter.
const outOfStockProducts = document.getElementById("outOfStockProducts");
// Show Available button.
const showAvailableButton = document.getElementById("showAvailable");
// Show All button.
const showAllButton = document.getElementById("showAll");
// ============================================================
// 4. GET AVAILABLE PRODUCTS
// ============================================================
// Returns products where inStock is true.
function getAvailableProducts(productArray) {
    return productArray.filter((product) => {
        return product.inStock === true;
    });
}
// ============================================================
// 5. GET OUT-OF-STOCK PRODUCTS
// ============================================================
// Returns products where inStock is false.
function getOutOfStockProducts(productArray) {
    return productArray.filter((product) => {
        return product.inStock === false;
    });
}
// ============================================================
// 6. CALCULATE DISCOUNT
// ============================================================
// Calculates the discounted price.
//
// Default discount = 10%
function calculateDiscount(price, discountPercent = 10) {
    const discountAmount = price * discountPercent / 100;
    return price - discountAmount;
}
// ============================================================
// 7. DISPLAY PRODUCTS
// ============================================================
// Displays products on the webpage.
function displayProducts(productArray) {
    // Clear existing products.
    productList.innerHTML = "";
    // If no products are available.
    if (productArray.length === 0) {
        productList.innerHTML = `

            <div class="col-span-full
                        rounded-2xl
                        border border-slate-800
                        bg-slate-950/50
                        p-10 text-center">

                <div class="text-4xl mb-3">
                    📦
                </div>

                <p class="text-slate-500">
                    No products available.
                </p>

            </div>

        `;
        return;
    }
    // Display every product.
    productArray.forEach((product) => {
        // Create product card.
        const productCard = document.createElement("div");
        // Tailwind CSS styling.
        productCard.className =
            "rounded-2xl border " +
                "border-slate-800 " +
                "bg-slate-950/60 " +
                "p-5 shadow-sm " +
                "transition duration-300 " +
                "hover:-translate-y-1 " +
                "hover:border-indigo-500/40 " +
                "hover:shadow-lg";
        // Stock status text.
        const stockStatus = product.inStock
            ? "In Stock"
            : "Out of Stock";
        // Stock badge styling.
        const stockClass = product.inStock
            ? "text-emerald-400 " +
                "bg-emerald-500/10 " +
                "border-emerald-500/20"
            : "text-rose-400 " +
                "bg-rose-500/10 " +
                "border-rose-500/20";
        // Convert tags into text.
        const productTags = product.tags &&
            product.tags.length > 0
            ? product.tags.join(", ")
            : "No tags";
        // Calculate discounted price.
        const discountedPrice = calculateDiscount(product.price);
        // Product card HTML.
        productCard.innerHTML = `

                <!-- Product Header -->

                <div class="flex items-start
                            justify-between
                            gap-3 mb-4">

                    <div>

                        <div class="mb-2 flex
                                    h-10 w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-indigo-500/10">

                            📦

                        </div>

                        <h3 class="text-lg
                                   font-bold
                                   text-white">

                            ${product.name}

                        </h3>

                    </div>


                    <!-- Stock Badge -->

                    <span class="${stockClass}
                                 rounded-full
                                 border
                                 px-3 py-1
                                 text-xs
                                 font-medium">

                        ${stockStatus}

                    </span>

                </div>


                <!-- Product ID -->

                <div class="mb-3">

                    <p class="text-xs
                              uppercase
                              tracking-wider
                              text-slate-600">

                        Product ID

                    </p>

                    <p class="mt-1
                              text-sm
                              text-slate-300">

                        ${product.id}

                    </p>

                </div>


                <!-- Price -->

                <div class="mb-3">

                    <p class="text-xs
                              uppercase
                              tracking-wider
                              text-slate-600">

                        Price

                    </p>

                    <p class="mt-1
                              text-xl
                              font-bold
                              text-white">

                        ₹${product.price}

                    </p>

                </div>


                <!-- Discount Price -->

                <div class="mb-3
                            rounded-xl
                            border
                            border-indigo-500/10
                            bg-indigo-500/5
                            p-3">

                    <p class="text-xs
                              text-indigo-400">

                        10% Discount Price

                    </p>

                    <p class="mt-1
                              font-semibold
                              text-indigo-300">

                        ₹${discountedPrice}

                    </p>

                </div>


                <!-- Tags -->

                <div>

                    <p class="text-xs
                              uppercase
                              tracking-wider
                              text-slate-600">

                        Tags

                    </p>

                    <p class="mt-1
                              text-sm
                              text-slate-400">

                        ${productTags}

                    </p>

                </div>

            `;
        // Add card to product list.
        productList.appendChild(productCard);
    });
}
// ============================================================
// 8. UPDATE INVENTORY SUMMARY
// ============================================================
// Updates:
//
// Total Products
// Available Products
// Out of Stock Products
function updateSummary() {
    // Get total number of products.
    const total = products.length;
    // Get available products.
    const available = getAvailableProducts(products);
    // Get out-of-stock products.
    const outOfStock = getOutOfStockProducts(products);
    // Update Total Products.
    totalProducts.textContent =
        total.toString();
    // Update Available Products.
    availableProducts.textContent =
        available.length.toString();
    // Update Out-of-Stock Products.
    outOfStockProducts.textContent =
        outOfStock.length.toString();
}
// ============================================================
// 9. ADD NEW PRODUCT
// ============================================================
// Runs when the Add Product form is submitted.
productForm.addEventListener("submit", (event) => {
    // Prevent page refresh.
    event.preventDefault();
    // Get product name.
    const name = productNameInput.value.trim();
    // Convert price to number.
    const price = Number(productPriceInput.value);
    // Convert comma-separated tags
    // into an array.
    const tags = productTagsInput.value
        .split(",")
        .map((tag) => {
        return tag.trim();
    })
        .filter((tag) => {
        return tag.length > 0;
    });
    // Read checkbox status.
    //
    // Checked   = true
    // Unchecked = false
    const inStock = productStockInput.checked;
    // Generate product ID.
    const id = products.length + 1;
    // Create new product.
    const newProduct = {
        id: id,
        name: name,
        price: price,
        inStock: inStock,
        tags: tags
    };
    // Add product to array.
    products.push(newProduct);
    // Display complete inventory.
    displayProducts(products);
    // Update all counters.
    updateSummary();
    // Clear form.
    productForm.reset();
    // Keep checkbox checked
    // for the next product.
    productStockInput.checked = true;
});
// ============================================================
// 10. SHOW AVAILABLE PRODUCTS
// ============================================================
// Displays only products that are in stock.
showAvailableButton.addEventListener("click", () => {
    const available = getAvailableProducts(products);
    displayProducts(available);
});
// ============================================================
// 11. SHOW ALL PRODUCTS
// ============================================================
// Displays the complete inventory,
// including out-of-stock products.
showAllButton.addEventListener("click", () => {
    displayProducts(products);
});
// ============================================================
// 12. INITIAL PAGE LOAD
// ============================================================
// Display all products initially.
displayProducts(products);
// Set initial counters.
updateSummary();
// ============================================================
// END OF PRODUCT INVENTORY MANAGER
// ============================================================
