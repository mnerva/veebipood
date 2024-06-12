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
            console.log(error)
        }
    }
    async function processCheckout() {
        try {
            // Send a request
            const response = await fetch(`/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action: 'checkout' })
            });
 
 
            if (!response.ok) {
                throw new Error('Failed to finish the checkout');
            }
 
 
            const result = await response.json()
            console.log('Checkout successful:', result)
 
 
        } catch (error) {
            console.error('Error finishing the process:', error);
            console.log(error)
        }
    }
 
 
    window.scrollToItems = scrollToItems;
    window.openSidebar = openSidebar;
    window.closeSidebar = closeSidebar;
    window.addToCart = addToCart;
    window.processCheckout = processCheckout;
 });
  