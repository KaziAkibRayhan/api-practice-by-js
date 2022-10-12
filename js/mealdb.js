const loadMeal = (search) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayFood(data.meals))
}

const displayFood = (meals) => {
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = '';
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col-md-4');
        mealDiv.innerHTML = `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-5">
                    <img src="${meal.strMealThumb}" class="img-fluid h-100" alt="...">
                </div>
                <div class="col-md-7">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 100)}...</p>
                        <button onclick="loadMealDetails(${meal.idMeal})" class="btn btn-outline-info">Food Details</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        mealContainer.appendChild(mealDiv);
    });
}

const loadMealDetails = (meal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]))
};

const displayMealDetails = (meal) => {
    const displayMealContainer = document.getElementById('display-detail-container');
    displayMealContainer.innerHTML = '';
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.style.width = '50rem';
    cardDiv.innerHTML = `
    <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-7">
                    <img src="${meal.strMealThumb}" class="img-fluid h-100" alt="...">
                </div>
                <div class="col-md-5">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 500)}...</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    displayMealContainer.appendChild(cardDiv);
};

const searchFood = () => {
    const foodField = document.getElementById('food-field');
    const fooText = foodField.value;
    loadMeal(fooText);
    foodField.value = '';
};


loadMeal('');

