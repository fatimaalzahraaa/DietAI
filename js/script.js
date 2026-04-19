const searchInput = document.getElementById("filter");
const cards = document.querySelectorAll(".report-card");

searchInput.addEventListener("input", () => {
    const val = searchInput.value.toLowerCase();
    cards.forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(val) ? "flex" : "none";
    });
});

document.getElementById("categoryFilter").addEventListener("change", () => {
    const selected = categoryFilter.value;
    cards.forEach(card => {
        const match = selected === "all" || card.dataset.category === selected;
        card.style.display = match ? "flex" : "none";
    });
});

document.querySelectorAll(".save-icon").forEach(icon => {
    const id = icon.dataset.id;
    let saved = JSON.parse(localStorage.getItem("savedRecipes")) || [];

    // Load saved state on page load
    if (saved.includes(id)) {
        icon.textContent = "bookmark_added";
        icon.classList.add("saved");
    }

    icon.addEventListener("click", () => {
        if (saved.includes(id)) {
            saved = saved.filter(item => item !== id);
            icon.textContent = "bookmark_add";
            icon.classList.remove("saved");
        } else {
            saved.push(id);
            icon.textContent = "bookmark_added";
            icon.classList.add("saved");
        }
        localStorage.setItem("savedRecipes", JSON.stringify(saved));
    });
});
