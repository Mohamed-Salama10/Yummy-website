import { hideAllWindows } from "./sharableFunctions.js";
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
                id="searchResultCards"
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
    this.applyDetailsEventListner(
      document.querySelectorAll("#searchResultCards")
    );
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
    let infoCardsRow = document.getElementById("infoCardsRow");
    infoCardsRow.innerHTML = container;
    this.applyDetailsEventListner(document.querySelectorAll(".singleInfoCard"));
  }

  async displaySpecificArea(area) {
    $(".loading-screen").show();
    $("#infoCards").show();
    const response = await fetch(
      "https:" + `www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    let details = await response.json();
    this.displayMeals(details);
    $(".loading-screen").hide();
    let container = ``;
    for (const meal of details.meals) {
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
    this.applyDetailsEventListner(document.querySelectorAll(".singleInfoCard"));
  }

  applyDetailsEventListner(cards) {
    for (const card of cards) {
      card.addEventListener("click", function () {
        hideAllWindows();

        applyDetails(card);
      });
    }
  }

  //////////////////////////////end of class///////////////////////////
}
async function applyDetails(card) {
  /*
  function getMealJson(mealArray, mealName) {
    let requiredMeal = undefined;
    console.log(mealName);
    for (const meal of mealArray.meals) {
      if (meal.strMeal === mealName) {
        requiredMeal = meal;
        return requiredMeal;
      }
    }
  }
*/
  function assignMealDetails(meal) {
    console.log();
    $("#detailMealImg").attr("src", `${meal.strMealThumb}`);
    $("#detailsMealName").html(`${meal.strMeal}`);
    $("#detailsMealArea").html(
      `<span class="fw-bold">Area </span>: ${meal.strArea}`
    );
    $("#detailsMealInstructions").html(meal.strInstructions);
    $("#detailsMealCategory").html(
      `<span class="fw-bold">Category </span>: ${meal.strCategory}`
    );

    if (meal.strTags != null) {
      let tagsArray = meal.strTags.split(",");
      for (const tag of tagsArray) {
        $("#detailsMealTagsDiv").append(
          `<h6 class="alert alert-danger m-2 p-1 " id="detailsMealTag">${tag}</h6>`
        );
      }
    } else {
      $("#detailsMealTag").hide();
    }
    $("#detailsMealSourceBtn").attr("href", meal.strSource);
    $("#detailsMealYoutubeBtn").attr("href", meal.strYoutube);

    for (let index = 1; index <= 20; index++) {
      let ing = eval(`meal.strIngredient${index}`);
      if (ing !== "" && ing !== null) {
        $("#detailsMealRecipe").append(
          `<li class="alert alert-info m-2 p-1">${ing}</li>`
        );
      }
    }
  }
  $(".loading-screen").show();
  let food = card.querySelector("#cardFoodName").innerHTML;

  $("#mealDetails").show();

  const response = await fetch(
    "https:" + `www.themealdb.com/api/json/v1/1/search.php?s=${food}`
  );
  let details = await response.json();

  assignMealDetails(details.meals[0]);

  $(".loading-screen").hide();
}
