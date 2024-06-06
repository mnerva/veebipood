document.addEventListener('DOMContentLoaded', () => {
    function scrollToItems() {
        const itemsSection = document.getElementById('items');
        itemsSection.scrollIntoView({ behavior: 'smooth' });
    }

    function openSidebar(itemId, itemName, itemDescription) {
        const sidebar = document.getElementById('sidebar');
        const sidebarTitle = document.getElementById('sidebar-title');
        const sidebarDescription = document.getElementById('sidebar-description');

        sidebar.dataset.itemId = itemId;
        sidebarTitle.textContent = itemName;
        sidebarDescription.textContent = itemDescription;

        sidebar.classList.add('open');
    }

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

    window.scrollToItems = scrollToItems;
    window.openSidebar = openSidebar;
    window.closeSidebar = closeSidebar;
    window.addToCart = addToCart;
});
