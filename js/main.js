import { search } from "./search.js";
import { categories } from "./categories.js";
import { hideAllWindows } from "./sharableFunctions.js";
import { area } from "./area.js";
import { ingredients } from "./ingredients.js";

$(document).ready(function () {
  (function () {
    $("#mealDetails").hide();
    $(".navBarsDiv").animate({ left: "-200px" }, 0);
    function btnMovement(btn) {
      let navContentHeight = $("#nav-content").innerHeight();
      btn.css("transform", `translateY(${navContentHeight}px)`);
    }
    btnMovement($("#searchBtn"));
    btnMovement($("#categoriesBtn"));
    btnMovement($("#areaBtn"));
    btnMovement($("#ingredientsBtn"));
    btnMovement($("#contactUsId"));
  })();

  $("#toggle-icon").click(function () {
    let toggleIcon = $("#toggle-icon");
    $("#toggle-icon").toggleClass("fa-bars fa-x");
    let navBarsDiv = $(".navBarsDiv");
    if (navBarsDiv.css("left") == "0px") {
      hideNavBar();
    } else {
      navBarsDiv.animate({ left: "0px" }, 500);
    }
    if (toggleIcon.hasClass("fa-bars")) {
      hideNavIcons();
    } else {
      showNavIcons();
    }
  });

  function hideNavBar() {
    $("#toggle-icon").removeClass("fa-x");
    $("#toggle-icon").addClass("fa-bars");
    let navBarsDiv = $(".navBarsDiv");
    navBarsDiv.animate({ left: "-200px" }, 500);
    hideNavIcons();
  }

  function showNavIcons() {
    function btnShowing(btn) {
      btn.animate(
        { textIndent: 0 },
        {
          step: function () {
            $(this).css("-webkit-transform", "translateY(0px)");
          },
          duration: "slow",
        },
        "linear"
      );
    }

    setTimeout(function () {
      btnShowing($("#searchBtn"));
      setTimeout(function () {
        btnShowing($("#categoriesBtn"));
        setTimeout(function () {
          btnShowing($("#areaBtn"));
          setTimeout(function () {
            btnShowing($("#ingredientsBtn"));
            setTimeout(function () {
              btnShowing($("#contactUsId"));
            }, 200);
          }, 200);
        }, 200);
      }, 200);
    }, 400);
  }

  function hideNavIcons() {
    function btnHiding(btn) {
      let navContentHeight = $("#nav-content").innerHeight();
      btn.animate(
        { textIndent: 0 },
        {
          step: function () {
            $(this).css(
              "-webkit-transform",
              `translateY(${navContentHeight}px)`
            );
          },
          duration: "slow",
        },
        "linear"
      );
    }

    setTimeout(function () {
      btnHiding($("#searchBtn"));
      setTimeout(function () {
        btnHiding($("#categoriesBtn"));
        setTimeout(function () {
          btnHiding($("#areaBtn"));
          setTimeout(function () {
            btnHiding($("#ingredientsBtn"));
            setTimeout(function () {
              btnHiding($("#contactUsId"));
            }, 200);
          }, 200);
        }, 200);
      }, 200);
    }, 400);
  }

  let searchTab = new search();

  $("#searchBtn").click(function () {
    hideAllWindows();
    searchTab.clearWindow();
    $("#searchByName").show();
    $("#searchByFirstLetter").show();
    $("#infoCards").show();
    hideNavBar();
  });

  $("#searchByName").keyup(function () {
    let searchName = $("#searchByName").val();
    searchTab.searchByName(searchName);
  });
  $("#searchByFirstLetter").keyup(function () {
    if ($("#searchByFirstLetter").val() === "") {
      location.reload();
    } else {
      let searchLetter = $("#searchByFirstLetter").val();
      searchTab.searchByFirstLetter(searchLetter);
    }
  });

  ///start of categories implementation ///////////////

  $("#categoriesBtn").click(function () {
    hideNavBar();
    hideAllWindows();
    $("#categories").show();
    new categories(searchTab);
  });

  $("#areaBtn").click(function () {
    hideNavBar();
    hideAllWindows();
    $("#areaDiv").show();
    new area(searchTab);
  });
  $("#ingredientsBtn").click(function () {
    hideNavBar();
    hideAllWindows();
    $("#mealsByIngredients").show();
    new ingredients(searchTab);
  });
});
