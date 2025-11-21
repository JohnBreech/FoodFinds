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