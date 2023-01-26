let mealDetail = document.getElementById("container");

function getDetails() {
  let mealId = localStorage.getItem("mealId");
  console.log(mealId);
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
            <div class="meal-details-content">
            <h2 class="meal-tittle">${meal.strMeal}</h2>
            <p class="meal-category">${meal.strCategory}</p>

            <div class="instruct-img"> 
               <div class="meal-instruct">
                <h3>Instruction</h3>
                <p>
                   ${meal.strInstructions}
                </p>
               </div>
              <div class="meal-img">
                 <img src="${meal.strMealThumb}" alt="food.jpg">
              </div>
           </div>
             
          </div>
          `;
        });
        // console.log(data);
      }
      mealDetail.innerHTML = html;
    });

  localStorage.removeItem("mealId");
}

getDetails();
