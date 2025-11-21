// 1. DATA (Must be at the top)
const stallsData = [
    {
        "images": "images/stalls/matcha_cafe_front_image.jpg",
        "name": "Matcha Cafe",
        "category": ["Sweets", "Drinks", "Chicken", "Fries", "Burgers", "Coffee", "Halal"],
        "floor": 1
    },
    {
        "images": "images/stalls/lavivienda.jpg",
        "name": "Grilled Shawarma (La Vivienda)",
        "category": ["Shawarma", "Beef", "Chicken", "Fries", "Rice", "Halal"],
        "floor": 1
    },
    {
        "images": "images/stalls/alcuis.svg",
        "name": "Alcuis Food",
        "category": ["Filipino", "Siomai", "Beef", "Chicken", "Bread", "Burgers", "Coffee"],
        "floor": 1
    },
    {
        "images": "images/stalls/easybite.svg",
        "name": "Easy Bite",
        "category": ["Chicken", "Fries", "Halal"],
        "floor": 2
    },
    {
        "images": "images/stalls/gobblehaus.svg",
        "name": "Gobble House",
        "category": ["Beef", "Chicken", "Rice", "Filipino", "Drinks", "Sweets", "Fruits", "Desserts", "Halal"],
        "floor": 2
    }
];

const searchInput = document.getElementById("searchInput");

if (window.location.pathname.includes("stalls.html")) {
    const group1 = document.getElementById("stallsGroup");
    const group2 = document.getElementById("stallsGroup2");

    let rendered = [];

    function displayStalls() {
        group1.innerHTML = "";
        group2.innerHTML = "";
        rendered = [];

        stallsData.forEach(stall => {
            const card = document.createElement("div");
            card.classList.add("stall-card");

            card.innerHTML = `
                <div class="stall-image">
                    <img src="${stall.images}">
                </div>
                <div class="stall-info">
                    <h2 class="stall-name">${stall.name}</h2>
                    <p class="operating-hrs">Category: ${stall.category.join(", ")}</p>
                    <p class="price-location">Floor: ${stall.floor}</p>
                </div>
            `;

            card.addEventListener("click", () => {
                window.location.href = `stall_profiles/${stall.name}.html`;
            });

            if (stall.floor === 1) {
                group1.append(card);
            } else if (stall.floor === 2) {
                group2.append(card)
            }

            rendered.push({
                ...stall,
                element: card
            });
        });
    }

    displayStalls();

    // Read search term
    const params = new URLSearchParams(window.location.search);
    const term = params.get("search")?.toLowerCase() ?? "";

    const searchBox = document.getElementById("searchInput");
    searchBox.value = term;

    searchBox.addEventListener("input", () => runSearch(searchBox.value.toLowerCase()));

    function runSearch(q) {
        rendered.forEach(stall => {
            const match =
                stall.name.toLowerCase().includes(q) ||
                stall.category.join(" ").toLowerCase().includes(q) ||
                String(stall.floor).includes(q);

            stall.element.classList.toggle("hide", !match);
        });
    }

    runSearch(term);
}
