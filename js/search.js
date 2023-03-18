export class search {
  constructor() {
    this.getMealData();
  }

  async getMealData() {
    $(".loading-screen").show();
    const response = await fetch(
      "https:" + "www.themealdb.com/api/json/v1/1/search.php?s="
    );
    let details = await response.json();
    this.displayMeals(details);
    $(".loading-screen").hide();
  }

  displayMeals(mealArray) {
    let container = ``;
    for (const meal of mealArray.meals) {
      container += `
        <div class="col-lg-3 col-md-6 col-sm-12">
              <div
                class="mt-5 bg-white rounded-3 position-relative singleInfoCard overflow-hidden"
              >
                <img
                  src=${meal.strMealThumb}
                  class="img-fluid"
                  alt=""
                />
                <div
                  class="infoOverlayLayer position-absolute top-0 start-0 end-0 bottom-0 rounded-3 d-flex align-items-center p-2 fs-2"
                >
                  <p class="" id="cardFoodName">${meal.strMeal}</p>
                </div>
              </div>
            </div>
        `;
    }

    let infoCardsRow = document.getElementById("infoCardsRow");
    infoCardsRow.innerHTML = container;
  }

  clearWindow() {
    let infoCardsRow = document.getElementById("infoCardsRow");
    infoCardsRow.innerHTML = "";
  }

  async searchByName(name) {
    $(".loading-screen").show();
    const response = await fetch(
      "https:" + `www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );

    let details = await response.json();
    if (details.meals == null) {
      this.clearWindow();
      $(".loading-screen").hide();
    } else {
      this.displayMeals(details);
      $(".loading-screen").hide();
    }
  }

  async searchByFirstLetter(fl) {
    $(".loading-screen").show();
    const response = await fetch(
      "https:" + `www.themealdb.com/api/json/v1/1/search.php?f=${fl}`
    );

    let details = await response.json();
    if (details.meals == null) {
      this.clearWindow();
      $(".loading-screen").hide();
    } else {
      this.displayMeals(details);
      $(".loading-screen").hide();
    }
  }

  searchTest() {
    console.log("hi in search ");
  }

  async displaySpecificCat(cat) {
    $(".loading-screen").show();
    $("#infoCards").show();
    const response = await fetch(
      "https:" + "www.themealdb.com/api/json/v1/1/search.php?s="
    );
    let details = await response.json();
    this.displayMeals(details);
    $(".loading-screen").hide();
    console.log(cat)
    let container = ``;
    for (const meal of details.meals) {
      if (meal.strCategory == cat) {
        container += `
        <div class="col-lg-3 col-md-6 col-sm-12">
              <div
                class="mt-5 bg-white rounded-3 position-relative singleInfoCard overflow-hidden"
              >
                <img
                  src=${meal.strMealThumb}
                  class="img-fluid"
                  alt=""
                />
                <div
                  class="infoOverlayLayer position-absolute top-0 start-0 end-0 bottom-0 rounded-3 d-flex align-items-center p-2 fs-2"
                >
                  <p class="" id="cardFoodName">${meal.strMeal}</p>
                </div>
              </div>
            </div>
        `;
      }
    }
    console.log(container)
    let infoCardsRow = document.getElementById("infoCardsRow");
    infoCardsRow.innerHTML = container;
  }

  //////////////////////////////end of class///////////////////////////
}
