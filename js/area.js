import { hideAllWindows } from "./sharableFunctions.js";
export class area {
  constructor(searchRef) {
    this.searchRef = searchRef;
    this.getAreaMeals();
  }

  async getAreaMeals() {
    $(".loading-screen").show();
    let response = await fetch(
      "https:" + "www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    let areaDetails = await response.json();
    this.displayMealsByArea(areaDetails);
    $(".loading-screen").hide();
  }

  displayMealsByArea(mealsByArea) {
    let container = ``;
    for (const meal of mealsByArea.meals) {
      container += `
        <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="mt-3 text-white text-center" id='mealsByAreaDiv'>
                <i class="fa-solid fa-house-laptop fa-6x mb-3"></i>
                <h2>${meal.strArea}</h2>
              </div>
            </div>
        `;
    }

    let areaCardsRow = document.getElementById("mealsByAreaRow");
    areaCardsRow.innerHTML = container;
    this.createAreaEnvent(this.searchRef)
  }

  createAreaEnvent(searchRef) {
    let areasDivs = document.querySelectorAll("#mealsByAreaDiv");
    for (const div of areasDivs) {
      div.addEventListener("click", function () {
        hideAllWindows();
        let clickedArea = this.querySelector("#mealsByAreaDiv h2").innerHTML;
        searchRef.displaySpecificArea(clickedArea);
      });
    }
  }

  ///end of class///////
}
