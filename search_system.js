const searchInput = document.getElementById("searchInput")

let stalls = []
const stallGroup = document.getElementById("stallsGroup")



//STALL CARD
if (window.location.href.includes('stalls.html')) {
    fetch('stalls.json')
        .then(res => res.json())
        .then(data => { 
            displayStalls(data);
        })
        .catch(err => console.error('Error loading data:', err));
}

function displayStalls(list) {
    stallGroup.innerHTML = '';

    list.forEach(stall => {
        // create card
        const stallCard = document.createElement("div");
        stallCard.classList.add("stall-card");

        // inject HTML
        stallCard.innerHTML = `
            <div class="stall-image">
                <img src="${stall.image}" alt="">
            </div>

            <div class="stall-info">
                <h2 class="stall-name">${stall.name}</h2>
                <p class="operating-hrs">Category: ${stall.category.join(', ')}</p>
                <p class="price-location">Floor: ${stall.floor}</p>
            </div>
        `;

        stallGroup.appendChild(stallCard);

        // store reference for filtering later if needed
        stall.element = stallCard;
    });
}

searchInput.addEventListener('input', e => {
        const searchTerm = e.target.value.toLowerCase();
        
        stalls.forEach(stall => {
            const match =
            stall.name.toLowerCase().includes(searchTerm) ||
            stall.category.join(' ').toLowerCase().includes(searchTerm) ||
            String(stall.floor).includes(searchTerm);
            
            stall.element.classList.toggle('hide', !match);
        });
});

if (searchInput) {

    searchInput.addEventListener('keypress', k => { //to go to another window if enter is press
            if (k.key === "Enter" && !window.location.href.includes("stalls.html")) {
                const value = encodeURIComponent(searchInput.value);
                window.location.href = `stalls.html?search=${value}`;
            }
    });

    if (window.location.href.includes('stalls.html')) {
        const params = new URLSearchParams(window.location.search);
        const searchTerm = params.get('search');
        
        if (searchTerm) {
            searchInput.value = searchTerm;
        }
    }
}

