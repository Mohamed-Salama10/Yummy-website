import { hideAllWindows } from "./sharableFunctions.js";
export class ingredients {
  constructor(searchRef) {
    this.searchRef = searchRef;
    this.getIngredientsData();
  }

  async getIngredientsData() {
    $(".loading-screen").show();
    let response = await fetch(
      "https:" + `www.themealdb.com/api/json/v1/1/list.php?i=list`
    );

    let ingData = await response.json();
    let ingeredientData = ingData.meals.splice(0, 20);
    $(".loading-screen").hide();
    this.displayIngredinetData(ingeredientData);
  }

  displayIngredinetData(ingData) {
    let container = ``;

    for (const ing of ingData) {
      container += `
        <div class="col-lg-3 col-md-6 col-sm-12" id='mealsByIngredientsCol'>
              <div class="mt-3 text-white text-center">
                <i class="fa-solid fa-drumstick-bite fa-6x mb-3"></i>
                <h2>${ing.strIngredient}</h2>
                <p>
                  ${ing.strDescription.slice(0, 101)}
                </p>
              </div>
            </div>
        `;
    }

    document.getElementById("mealsByIngredientsRow").innerHTML = container;
    this.createIngEnvent(this.searchRef);
  }

  createIngEnvent(searchRef) {
    let areasDivs = document.querySelectorAll("#mealsByIngredientsCol");
    for (const div of areasDivs) {
      div.addEventListener("click", function () {
        //hideAllWindows();
        let clickedIng = this.querySelector(
          "#mealsByIngredientsCol h2"
        ).innerHTML;
        searchRef.displaySpecificIng(clickedIng);
      });
    }
  }
  //end of class///////////////
}
