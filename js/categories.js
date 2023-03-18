import { hideAllWindows } from "./sharableFunctions.js";
import { search } from "./search.js";
export class categories {
  constructor(searchRef) {
    this.searchRef = searchRef;
    this.getCategories();
  }

  async getCategories() {
    $(".loading-screen").show();
    const category = await fetch(
      "https:" + "www.themealdb.com/api/json/v1/1/categories.php"
    );

    const detailedCats = await category.json();
    this.displayCategories(detailedCats);

    $(".loading-screen").hide();
  }

  displayCategories(cats) {
    let container = ``;
    for (const cat of cats.categories) {
      container += `
      <div class="col-lg-3 col-md-6 col-sm-12 catCards">
      <div>
        <div
          class="mt-5 rounded-3 position-relative singleInfoCard overflow-hidden"
        >
          <img
            src=${cat.strCategoryThumb}
            class="img-fluid"
            alt=""
          />
          <div class="infoOverlayLayer position-absolute top-0 start-0 end-0 bottom-0 rounded-3 ">
                <div class="d-flex flex-column text-center w-100 h-100 py-2">
                      <p class="fs-2" id='catParagraph'>${cat.strCategory}</p>
                      <p class="w-100 fs-6">${cat.strCategoryDescription.slice(
                        0,
                        100
                      )}</p>
                    </div>
                  </div>
        </div>
      </div>
    </div>
        `;
    }

    let infoCardsRow = document.getElementById("categoriesCardsRow");
    infoCardsRow.innerHTML = container;
    this.createCatEventListner(this.searchRef);
  }

  createCatEventListner(searchRef) {
    let divs = document.querySelectorAll(".catCards");
    for (const div of divs) {
      div.addEventListener("click", function () {
        hideAllWindows();
        let clickedCat = this.querySelector("#catParagraph").innerHTML;
        searchRef.displaySpecificCat(clickedCat);
      });
    }
  }

  //////////////////////////////end of class///////////////////////////
}
