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

        const categories = Array.isArray(stall.category)
            ? stall.category.join(', ')
            : stall.category ?? '';

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

if (searchInput) {
    searchInput.addEventListener('keypress', k => {
        if (k.key === "Enter" && !window.location.href.includes("stalls.html")) {
            const value = encodeURIComponent(searchInput.value.trim());
            window.location.href = `stalls.html?search=${value}`;
        }
    });
}