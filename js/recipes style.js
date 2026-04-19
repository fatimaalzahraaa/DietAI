document.addEventListener('DOMContentLoaded', function () {
    const cards = Array.from(document.querySelectorAll('.report-card'));
    const searchInput = document.getElementById('recipe-filter');
    const categorySelect = document.getElementById('recipe-category');

    function applyFilters() {
        const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
        const selectedCategory = categorySelect ? categorySelect.value : 'all';

        cards.forEach(card => {
            const cardTitle = card.querySelector('h2').textContent.toLowerCase();
            const ingredients = (card.dataset.ingredients || '').toLowerCase();
            const categories = (card.dataset.category || '').toLowerCase();

            const matchesSearch =
                !searchTerm ||
                cardTitle.includes(searchTerm) ||
                ingredients.includes(searchTerm);

           
            const matchesCategory =
                selectedCategory === 'all' ||
                categories.includes(selectedCategory);

            if (matchesSearch && matchesCategory) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', applyFilters);
    }

    applyFilters();

    // Save icon functionality - same as reports page
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
});
