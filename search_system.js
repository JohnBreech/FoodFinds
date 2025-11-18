const searchInput = document.getElementById("searchInput");

let stalls = [];
const stallGroup = document.getElementById("stallsGroup");
const stallsGroup2 = document.getElementById("stallsGroup2");


if (window.location.href.includes('stalls.html')) {
    fetch('stalls.json')
        .then(res => res.json())
        .then(data => { 
            displayStalls(data);

            
            const params = new URLSearchParams(window.location.search);
            const searchTerm = params.get('search');

            if (searchTerm) {
                searchInput.value = searchTerm;
                runSearch(searchTerm.toLowerCase());
            }
        })
        .catch(err => console.error('Error loading data:', err));
}

function displayStalls(list) {
    stallGroup.innerHTML = '';
    stallsGroup2.innerHTML = '';
    stalls = [];

    list.forEach(stall => {
        const card = document.createElement('div');
        card.classList.add('stall-card');

        const categories = Array.isArray(stall.category) ? stall.category.join(', ') : stall.category ?? '';

        card.innerHTML = `
            <div class="stall-image">
                <img src="${stall.image}" alt="${stall.name}">
            </div>
            <div class="stall-info">
                <h2 class="stall-name">${stall.name}</h2>
                <p class="operating-hrs">Category: ${categories}</p>
                <p class="price-location">Floor: ${stall.floor}</p>
            </div>
        `;

        // Add to correct floor
        if (stall.floor === 1) {
            stallGroup.appendChild(card);
        } else if (stall.floor === 2) {
            stallsGroup2.appendChild(card);
        }
        
        stalls.push({
            name: stall.name,
            category: stall.category,
            floor: stall.floor,
            element: card
        }); 
    });
    stalls.forEach(stall => {
        stall.element.addEventListener('click', () => {
            window.location.href = `${stall.name}.html`;
    })

});
}

function runSearch(searchTerm) {
    stalls.forEach(stall => {
        const match =
            stall.name.toLowerCase().includes(searchTerm) ||
            stall.category.join(' ').toLowerCase().includes(searchTerm) ||
            String(stall.floor).includes(searchTerm);

        stall.element.classList.toggle('hide', !match);
    });
}

if (window.location.href.includes('stalls.html')) {
    searchInput.addEventListener('input', e => {
        runSearch(e.target.value.toLowerCase());
    });
}

if (window.location.href.includes('homepage.html')) {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        const categoryName = card.querySelector('.category-name'); // text inside the card
        card.addEventListener('click', () => {
            window.location.href = `stalls.html?search=${encodeURIComponent(categoryName.textContent)}`;
        });
    });

    const stallCards = document.querySelectorAll('.stall-card');

    stallCards.forEach(card => {
        const stallName = card.querySelector('.stall-name').textContent.trim();

        card.addEventListener('click', () => {
            window.location.href = `${stallName}.html`;
        });
    });

}


if (searchInput) {
    searchInput.addEventListener('keypress', k => {
        if (k.key === "Enter" && !window.location.href.includes("stalls.html")) {
            const value = encodeURIComponent(searchInput.value.trim());
            window.location.href = `stalls.html?search=${value}`;
        }
    });
}