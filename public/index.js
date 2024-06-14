document.addEventListener('DOMContentLoaded', () => {
    function scrollToItems() {
        const itemSection = document.getElementById('items-container');
        itemSection.scrollIntoView({ behavior: 'smooth' });
    }

    // fetch and display items
    function fetchAndDisplayItems() {
        fetch('/items')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                return response.json();
            })
            .then(data => {
                // container for items
                const itemsContainer = document.getElementById('items-container');
                itemsContainer.innerHTML = ''; // Clear any existing content

                data.Item.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'item';

                    const image = document.createElement('img');
                    image.src = item.imageURL;
                    itemDiv.appendChild(image);

                    const nameHeading = document.createElement('h2');
                    nameHeading.innerText = item.item_name;
                    itemDiv.appendChild(nameHeading);

                    const priceDiv = document.createElement('div');
                    priceDiv.innerText = 'Price: $' + item.price;
                    priceDiv.classList.add('price');
                    itemDiv.appendChild(priceDiv);

                    const viewDetailsButton = document.createElement('button');
                viewDetailsButton.innerText = 'View Details'; // Change button text
                viewDetailsButton.classList.add('view-details-button'); // Update class name
                viewDetailsButton.addEventListener('click', function () {
                    openSidebar(item); // Call openSidebar instead of addToCart
                });
                itemDiv.appendChild(viewDetailsButton);

                itemsContainer.appendChild(itemDiv);
                });
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    }

    // sidebar open
    function openSidebar(item) {
        console.log('Received item:', item);

        const sidebar = document.getElementById('sidebar');
        const sidebarId = document.getElementById('sidebar-id');
        const sidebarPicture = document.getElementById('sidebar-picture');
        const sidebarTitle = document.getElementById('sidebar-title');
        const sidebarDescription = document.getElementById('sidebar-description');
        const sidebarPrice = document.getElementById('sidebar-price');
        const sidebarQuantity = document.getElementById('sidebar-quantity');
        const addToCartButton = document.getElementById('sidebar-add-to-cart-button');

        // Remove any existing event listener to avoid duplicates
        addToCartButton.removeEventListener('click', addToCartHandler);

        // Add event listener to the "Add to Cart" button in the sidebar
        addToCartButton.addEventListener('click', addToCartHandler);

        function addToCartHandler() {
            addToCart(item.id); // Pass the item ID to addToCart function
        }

        // sidebar content
        sidebarPicture.src = item.imageURL;
        sidebarId.textContent = item.id;
        sidebarTitle.textContent = item.item_name;
        sidebarDescription.textContent = item.description;
        sidebarPrice.textContent = item.price + '$';
        sidebarQuantity.textContent = item.quantity + ' units left in stock.';

        sidebar.classList.add('open');
    }


    // sidebar close
    function closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('open');
    }

    
async function addToCart() {
    try {
        const sidebar = document.getElementById('sidebar');
        const itemId = sidebar.dataset.itemId;
        const quantity = 1; // Set the quantity as needed

        // Send a request to add the item to the cart
        const addToCartResponse = await fetch(`/item/${itemId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: quantity })
        });

        if (!addToCartResponse.ok) {
            throw new Error('Failed to add item to cart');
        }

        // Close the sidebar after adding the item to the cart
        closeSidebar();
    } catch (error) {
        console.error('Error adding item to cart:', error);
        // Handle error appropriately (e.g., show error message to user)
    }
}

    // export
    window.scrollToItems = scrollToItems;
    window.onload = fetchAndDisplayItems;
    window.closeSidebar = closeSidebar;
    window.addToCart = addToCart;
});