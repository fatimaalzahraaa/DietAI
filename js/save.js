// Reports data
const allReportsData = [
    {id: "id", title: "Nutrition Study on Avocado", desc: "Avocados are rich in healthy fats and support heart health.", img: "../img/avo.jpg", link: "avocado.html", type: "report"},
    {id: "idd", title: "Study on Mediterranean Diet", desc: "The Mediterranean diet is linked to reduced heart disease risk.", img: "../img/medi.jpg", link: "mediterranean.html", type: "report"},
    {id: "iddd", title: "High-Protein Diet & Weight Loss", desc: "High-protein diets are known to increase satiety and metabolism.", img: "../img/ng.jpg", link: "protein.html", type: "report"},
    {id: "idddd", title: "Keto Diet and Brain Health", desc: "Exploring how a ketogenic diet may enhance cognitive function and focus.", img: "../img/keto.jpg", link: "keto.html", type: "report"},
    {id: "iddddd", title: "Plant-Based Proteins Study", desc: "Investigating the benefits of plant-based proteins on muscle growth and recovery.", img: "../img/vegan.jpg", link: "vegan.html", type: "report"},
    {id: "idddddd", title: "Low-Carb Diet & Blood Sugar", desc: "A study on how low-carb diets can stabilize blood sugar and improve insulin sensitivity.", img: "../img/low.jpg", link: "lowcarb.html", type: "report"}
];

// Recipes data
const allRecipesData = [
    {id: "recipe-herb-chicken", title: "Herb Chicken with Baby Potatoes", desc: "Juicy herb-marinated chicken served with roasted potatoes and sautéed green beans.", img: "../img/chicken & potatoes.jpeg", link: "recipe-herb-chicken.html", type: "recipe"},
    {id: "recipe-avocado-breakfast", title: "Fresh Avocado For Breakfast", desc: "A nutrient-rich avocado loaded with healthy fats & vitamins.", img: "../img/avocado recp..jpeg", link: "recipe-avocado-breakfast.html", type: "recipe"},
    {id: "recipe-fried-eggs", title: "Fried Eggs", desc: "Simple fried eggs, perfect for a high-protein breakfast.", img: "../img/egg recp..jpeg", link: "recipe-fried-eggs.html", type: "recipe"},
    {id: "recipe-baby-potatoes", title: "Golden Baby Potatoes", desc: "Soft & crispy roasted baby potatoes seasoned with herbs.", img: "../img/potatoes with rosemary and garlic.jpeg", link: "recipe-baby-potatoes.html", type: "recipe"},
    {id: "recipe-healthy-beans", title: "Healthy Beans For Lunch", desc: "High protein — keto friendly.", img: "../img/beans rcp..jpeg", link: "recipe-healthy-beans.html", type: "recipe"},
    {id: "recipe-pancake-parfait", title: "Pan Cake with Greek Yogurt Berry Parfait", desc: "Layers of Pan Cakes + Greek yogurt, fresh berries, and a drizzle of honey for a light sweet treat.", img: "../img/healthy pan cake .jpeg", link: "recipe-pancake-parfait.html", type: "recipe"},
    {id: "recipe-dark-chocolate-bites", title: "Dark Chocolate Almond Bites", desc: "Healthy Cake in dark chocolate — a satisfying low-carb sweet snack.", img: "../img/healthy cake.jpeg", link: "recipe-dark-chocolate-bites.html", type: "recipe"},
    {id: "recipe-oat-cookies", title: "Oatmeal Banana and Chocolate Cookies", desc: "Soft cookies made with oats, Chocolate and banana, naturally sweet and great with tea.", img: "../img/healthy cooki.jpeg", link: "recipe-oat-cookies.html", type: "recipe"}
];

// Combine all data
const allData = [...allReportsData, ...allRecipesData];

const recipesTab = document.getElementById("recipes-tab");
const reportsTab = document.getElementById("reports-tab");
const recipesContent = document.getElementById("saved-list-recipes");
const reportsContent = document.getElementById("saved-list-reports");

recipesTab.addEventListener("click", () => {
    recipesTab.classList.add("active");
    reportsTab.classList.remove("active");
    recipesContent.style.display = "grid";
    reportsContent.style.display = "none";
});

reportsTab.addEventListener("click", () => {
    reportsTab.classList.add("active");
    recipesTab.classList.remove("active");
    reportsContent.style.display = "grid";
    recipesContent.style.display = "none";
});

function updateEmptyState() {
    const allCards = document.querySelectorAll(".card");
    const emptyState = document.getElementById("empty-state");
    if (emptyState) {
        emptyState.style.display = allCards.length ? "none" : "block";
    }
}

function attachRemoveButtons() {
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".card");
            if (card) {
                card.remove();
                if (card.dataset.id) {
                    let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
                    savedRecipes = savedRecipes.filter(id => id !== card.dataset.id);
                    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
                }
                updateEmptyState();
            }
        });
    });
}

function createCard(item) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = item.id;
    
    const linkText = item.type === "recipe" ? "View Recipe" : "Read More";
    
    card.innerHTML = `
        <img src="${item.img}" class="card-img" alt="${item.title}">
        <div class="card-content">
            <h3 class="card-title">${item.title}</h3>
            <p>${item.desc}</p>
            <div class="card-footer">
                <a href="${item.link}" class="read-more-link">${linkText}</a>
                <button class="remove-btn">Remove</button>
            </div>
        </div>`;
    
    return card;
}

// Load saved reports
const savedReportsContainer = document.getElementById("saved-list-recipes");
if (savedReportsContainer) {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    const savedReports = savedRecipes
        .map(id => allData.find(item => item.id === id && item.type === "report"))
        .filter(item => item !== undefined);
    
    savedReports.forEach(report => {
        const card = createCard(report);
        savedReportsContainer.appendChild(card);
    });
    
    attachRemoveButtons();
    updateEmptyState();
}

// Load saved recipes
const savedRecipesContainer = document.getElementById("saved-list-reports");
if (savedRecipesContainer) {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    const savedRecipeItems = savedRecipes
        .map(id => allData.find(item => item.id === id && item.type === "recipe"))
        .filter(item => item !== undefined);
    
    savedRecipeItems.forEach(recipe => {
        const card = createCard(recipe);
        savedRecipesContainer.appendChild(card);
    });
    
    attachRemoveButtons();
    updateEmptyState();
}
