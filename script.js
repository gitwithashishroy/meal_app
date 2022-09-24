const mealList = document.getElementById("meal");

// most popular meal pemanent in local storage
function getPopular(){
  localStorage.setItem('popular' , '[]') ; 
  var popular_data = JSON.parse(localStorage.getItem('popular')); 
  popular_data.push(52795) ; 
  popular_data.push(52865) ; 
  popular_data.push(52806) ; 
  localStorage.setItem('popular' , JSON.stringify(popular_data)) ; 
}

getPopular() ; 

// show most popular meal on the page
let popularData = JSON.parse(localStorage.getItem('popular')) ; 
let tittle = document.getElementById('tittle') ; 
   tittle.innerText = " Most Popular Meal :- " ; 
    popularData.forEach((meald)=>{
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
                              <input type="button" onclick="addFav(this)" value="add to fav" class="fav-btn" id="${meal.idMeal}" >
                      </div>
                  </div>
                  `;
                //   });
                }
                var parent = document.getElementById('meal');
                var newChild = html;
                parent.insertAdjacentHTML('beforeend', newChild);
                // console.log(data);
            }); 
    
      });



// your search meal result ... 
// get meal list

let form = document.getElementById('form') ; 

form.addEventListener('submit' , function(e){
  e.preventDefault() ;
  let tittle = document.getElementById('tittle');
  tittle.innerText = "Your search result :- " ; 
  let searchInputText = document.getElementById("search-input").value;
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputText}`
   )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
        <div class="meal-item" data-id="${meal.idMeal}" >
            <div class="meal-img">
                <a href="./details/detail.html" target="_blank" >
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}.jpg"  onclick="anchortag(this)" id="${meal.idMeal}" />
                </a>
            </div>
            <div class="meal-name">
                    <h4>${meal.strMeal}</h4>
                    <input type="button" onloadstart="fav()" onclick="addFav(this)"  value="add to fav" class="fav-btn" id="${meal.idMeal}" >
            </div>
        </div>
        `;
        });
      }else{
        html = `<h3>Sorry we could not find your meal ! </h3>` ; 
      }
      mealList.innerHTML = html;
    });

  // console.log("form submitted");
})


function anchortag(img) {
  localStorage.setItem("mealId" , img.id) ; 
  // alert(img.id) ; 
}




function addFav(btn){
    let value = btn.getAttribute('value') ; 
    btn.setAttribute("value" , "favourite") ; 
    btn.style.backgroundColor = "orange" ; 
   let new_data = btn.id ;
  //  console.log(new_data);
    if(localStorage.getItem('data') == null){
      localStorage.setItem('data' , '[]') ; 
    }

    var old_data = JSON.parse(localStorage.getItem('data')); 

    if(!old_data.includes(new_data)){
       old_data.push(new_data) ; 
       localStorage.setItem('data' , JSON.stringify(old_data)) ; 
    }
       
}

function fav(btn){
  console.log(btn);
  console.log("favourite");
  var favdata = JSON.parse(localStorage.getItem('data')); 
  console.log(favdata);
  if(favdata.includes(bt.id)){
    let value = bt.getAttribute('value') ; 
    btn.setAttribute("value" , "favourite") ; 
    btn.style.backgroundColor = "orange" ; 
  } 
}

fav() ; 