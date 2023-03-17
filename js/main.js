$(document).ready(function () {
  (function () {
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
    $(toggleIcon).toggleClass("fa-bars fa-x");
    let navBarsDiv = $(".navBarsDiv");
    if (navBarsDiv.css("left") == "0px") {
      navBarsDiv.animate({ left: "-200px" }, 500);
    } else {
      navBarsDiv.animate({ left: "0px" }, 500);
    }
    if (toggleIcon.hasClass("fa-bars")) {
      hideNavIcons();
    } else {
      showNavIcons();
    }
  });

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
});