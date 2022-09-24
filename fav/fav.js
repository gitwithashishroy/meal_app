
let mealList = document.getElementById('meal') ; 
let mealdata = JSON.parse(localStorage.getItem('data')) ; 

//  if user has not added any favourite meal . 
if(mealdata.length===0){
   let tittle = document.getElementById('tittle') ; 
   tittle.innerText = "Please add your favourite item." ; 
   console.log("tittle");
}
else{
   let tittle = document.getElementById('tittle') ; 
   tittle.innerText = "Your favourite meal : " ; 
    mealdata.forEach((meald)=>{
        fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meald}`)
            .then((response) => response.json())
            .then((data) => {
                let html = "";
                if (data.meals) {
                  let meal = data.meals[0] ; 
                //   data.meals.forEach((meal) => {
                 html += `
                  <div class="meal-item" data-id="${meal.idMeal}" >
                      <div class="meal-img">
                          <a href="../details/detail.html" target="_blank" >
                              <img src="${meal.strMealThumb}" alt="${meal.strMeal}.jpg"  onclick="anchortag(this)" id="${meal.idMeal}"  />
                          </a>
                      </div>
                      <div class="meal-name">
                              <h4>${meal.strMeal}</h4>
                              <input type="button" onclick="removeFav(this)" value="remove" class="fav-btn" id="${meal.idMeal}" >
                      </div>
                  </div>
                  `;
                //   });
                }else{
                  html = `<h3>Sorry we could not find your meal ! </h3>` ; 
                }  
                var parent = document.getElementById('meal');
                var newChild = html;
                parent.insertAdjacentHTML('beforeend', newChild);
                // console.log(data);
            }); 
    
      });

    }


  function anchortag(img) {
      localStorage.setItem("mealId" , img.id) ; 
      // alert(img.id) ; 
    }


// remove element from favourite list . 
    
function removeFav(btn){
        console.log(btn.parentNode);
        let remove_id = btn.id ;
        var old_data = JSON.parse(localStorage.getItem('data')); 
        var index = old_data.indexOf(remove_id);  
        old_data.splice(index , 1) ; 
        localStorage.setItem('data' , JSON.stringify(old_data)) ; 
        console.log(remove_id);
        btn.parentNode.parentNode.remove() ; 
}


console.log("javascript is called !");

