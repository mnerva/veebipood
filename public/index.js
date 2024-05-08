function scrollToItems() {
    const itemsSection = document.getElementById('items');
    itemsSection.scrollIntoView({ behavior: 'smooth' });
}
function openSidebar(itemName, itemDescription) {
    console.log('Opening sidebar...');
    const sidebar = document.getElementById('sidebar');
    console.log('Sidebar element:', sidebar);
    const sidebarTitle = document.getElementById('sidebar-title');
    const sidebarDescription = document.getElementById('sidebar-description');

    sidebarTitle.textContent = itemName;
    sidebarDescription.textContent = itemDescription;

    sidebar.classList.add('open');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('open');
}

function addToCart() {
    // Add item to cart logic
    closeSidebar()
}