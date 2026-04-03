const homeSearchInput = document.getElementById("searchInput"); 

// go to stalls.html when the "enter" is pressed
if (homeSearchInput) {
    homeSearchInput.addEventListener('keypress', k => {
        if (k.key === "Enter") {
            const searchValue = encodeURIComponent(homeSearchInput.value.trim());
            window.location.href = `stalls.html?search=${searchValue}`;
        }
    });
}

// go to stalls.html with the category name in search input when the category card is pressed/clicked
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const categoryName = card.querySelector('.category-name').textContent.trim();
        window.location.href = `stalls.html?search=${encodeURIComponent(categoryName)}`;
    });
});

// go to stalls profile when a stall is pressed/clicked with the same name
const stallCards =  document.querySelectorAll('.stall-card');
stallCards.forEach(stall => {
    stall.addEventListener('click', () => {
        const stallName = stall.querySelector('.stall-name').textContent.trim();
        window.location.href = `stall_profiles/${stallName}.html`;
    })
})


//sidebar 
    function showSidebar(){
        const sidebar = document.querySelector('.sidebar')
        sidebar.style.display = 'flex'
    }
    function hideSidebar(){
        const sidebar = document.querySelector('.sidebar')
        sidebar.style.display = 'none'
    }
