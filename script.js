document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    async function fetchProducts(category = '') {
        try {
            const url = category ? `https://fakestoreapi.com/products/category/${category}` : 'https://fakestoreapi.com/products';
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }

    async function displayHomeProducts() {
        const menProducts = await fetchProducts("men's clothing");
        const womenProducts = await fetchProducts("women's clothing");

        productList.innerHTML = '';

        const interleavedProducts = [];
        for (let i = 0; i < Math.max(menProducts.length, womenProducts.length); i++) {
            if (menProducts[i]) interleavedProducts.push(menProducts[i]);
            if (womenProducts[i]) interleavedProducts.push(womenProducts[i]);
        }

        const limitedProducts = interleavedProducts.slice(0, 4);
        displayProducts(limitedProducts);
    }

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p class="price">$${product.price}</p>
                <button class="buy-btn">Buy Now</button>
                <button class="cart-btn">Add to Cart</button>
                <p>Delivery and Shipping Options Available</p>
            `;

            productList.appendChild(productCard);
        });
    }

    async function searchProducts(query) {
        const allProducts = await fetchProducts();
        const filteredProducts = allProducts.filter(product => 
            product.title.toLowerCase().includes(query.toLowerCase())
        );
        displayProducts(filteredProducts);
    }

    document.getElementById('home-tab').addEventListener('click', () => {
        displayHomeProducts();
    });

    document.getElementById('men-tab').addEventListener('click', async () => {
        const menProducts = await fetchProducts("men's clothing");
        displayProducts(menProducts);
    });

    document.getElementById('women-tab').addEventListener('click', async () => {
        const womenProducts = await fetchProducts("women's clothing");
        displayProducts(womenProducts);
    });

    
    document.getElementById('contact-tab').addEventListener('click', () => {
        productList.innerHTML = `
            <div class="contact-section">
                <h2>Contact Us</h2>
                <p>If you have any questions, feel free to reach out to our customer care team:</p>
                <p>Email: support@ajiostore.com</p>
                <form>
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Your Email" required>
                    <textarea placeholder="Your Message" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        `;
    });

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value;
        searchProducts(query);
    });

    
    displayHomeProducts();
});
