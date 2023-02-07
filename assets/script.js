// create localStorage variable to store users last search
// initial state is "japanese"
//local storage
let lastSearch = JSON.parse(localStorage.getItem("search")) || [];
// userRecipe(initialRecepie);

//event listener when user selects a cuisine from dropdown menu
$(document).ready(function () {
  $("select.form-select").change(function () {
    var selectedRecipe = $(this)
      .children("option:selected")
      .text()
      .toLowerCase();
    // console.log(selectedRecipe);
    userRecipe(selectedRecipe);
  });
});

// Make drop down menu
let cuisineOptions = [
  "african",
  "chinese",
  "japanese",
  "korean",
  "vietnamese",
  "thai",
  "indian",
  "british",
  "irish",
  "french",
  "italian",
  "mexican",
  "spanish",
  "middle eastern",
  "jewish",
  "american",
  "cajun",
  "southern",
  "greek",
  "german",
  "nordic",
  "eastern european",
  "caribbean",
  "latin american",
];

i = 0;
cuisineOptions.forEach(function (cuisine) {
  var option = $("<option>")
    .attr("value", i)
    .text(cuisine.charAt(0).toUpperCase() + cuisine.slice(1));
  $("#select-cuisine").append(option);
  i++;
});
// End of drop down menu

// // function to run depending on the cuisine selected
function userRecipe(selectedRecipe) {
  // Add last user choice to localStorage
  localStorage.initialCuisine = selectedRecipe;
  const settings = {
    async: true,
    crossDomain: true,
    url:
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?" +
      "query=" +
      selectedRecipe +
      "&" +
      "cuisine=" +
      selectedRecipe +
      "& includeIngredients=" +
      "& addRecipeInformation=true7741573ef1mshbe8aa22a9c85ee2p1b9a2cjsn22f4bd06bdf0" +
      "& sort=calories" +
      "& sortDirection=asc" +
      "& minCalories=50" +
      "& maxCalories=800",
    method: "GET",
    headers: {
      "X-RapidAPI-Key": keyAPI,
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  // API request
  $.ajax(settings).done(function (response) {
    //select results from request and put them into variable
    var recipeID = response.results;
    createCards(recipeID);
    //console.log(response);
  });
}

// open food facts Api added in the search ingredient input
function searchIngredient() {
  var userInput = $("#search-input").val();
  $.ajax({
    url: `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${userInput}&search_simple=1&action=process&json=1`,
    method: "GET",
    success: function (data) {
      var IngredientArray = data.products;
      ingredientsCards(IngredientArray);
    },
  });
}

//create cards for ingredients searched by user
function ingredientsCards(IngredientArray) {
  let objArray = IngredientArray;
  // console.log(objArray);
  let cardContainer = $(".dishes-display");
  cardContainer.empty();
  // console.log(IngredientArray);
  IngredientArray.forEach(function (IngredientArray) {
    let column = $("<div>").addClass(
      "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4"
    );
    let card = $("<div>")
      .addClass("card mb-4")
      .css("width", "18rem")
      .attr("data-ingredient", IngredientArray.id);
    let image = $("<img>")
      .addClass("card-img-top rounded mx-auto d-block p-1")
      .attr("src", "img/placeholder-icon.ico")
      .attr("src", IngredientArray.image_url)
      .attr("id", "img-size")
      .attr("alt", IngredientArray.product_name);
    let cardBody = $("<div>").addClass("card-body");
    let brand = IngredientArray.brands;
    let title = $("<h5>")
      .addClass("card-title")
      .text(IngredientArray.product_name + "-" + brand);
    // let btnLink =
    //   "https://world.openfoodfacts.org/product/" + IngredientArray.id;
    //when user clicks Show more, it will redirect them to openfacts for more info
    let btn = $("<a>")
      .addClass("btn btn-secondary")
      // .attr("href", btnLink)

      .text("Show more")
      .attr("data-toggle", "modal")
      .attr("data-target", "#exampleModalCenter");

    //add modal information
    btn.on("click", function () {
      let ingredientId = $(this).parent().parent().data("ingredient");
      // console.log(ingredientId);
      //find object
      for (let i = 0; i < objArray.length; i++) {
        if (objArray[i].id == ingredientId) {
          console.log(objArray[i]);

          // create modal structure
          let ingredientEl = objArray[i];

          let modalIngredients = $(".modal-body");
          modalIngredients.empty();

          let ingredientContainer = $("<div>");

          modalIngredients.append(ingredientContainer);

          let foodName = $("<h3>");
          console.log(ingredientEl.ciqual_food_name_tags[0]);
          let foodNameEl = ingredientEl.ciqual_food_name_tags[0];

          foodName.text(foodNameEl);
          ingredientContainer.append(foodName);

          let textIngredients = $("<p>");
          let textIngredientsEl = ingredientEl.ingredients_text;
          textIngredients.text(textIngredientsEl);

          ingredientContainer.append(textIngredients);

          let foodGroup = $("<p>");
          let foodGroupEl = ingredientEl.pnns_groups_2;
          foodGroup.text("Food Group: " + foodGroupEl);

          ingredientContainer.append(foodGroup);

          let ingredientLevel = $("h4").text("Nutrient levels:");
          ingredientContainer.append(ingredientLevel);

          let fat = $("<p>");
          let fatEl = ingredientEl.nutrient_levels.fat;
          fat.text("Fat: " + fatEl);

          ingredientContainer.append(fat);

          let salt = $("<p>");
          let saltEl = ingredientEl.nutrient_levels.salt;
          salt.text("Salt: " + saltEl);

          ingredientContainer.append(salt);

          let sugar = $("<p>");
          let sugarEl = ingredientEl.nutrient_levels.sugars;
          sugar.text("Sugar: " + sugarEl);

          ingredientContainer.append(sugar);

          //moved health-score to head of modal
          let nutriScore = $(".modal-header");
          let nutriScoreEl = ingredientEl.nutriscore_score;
          nutriScore.text("Health Score: " + nutriScoreEl);
        }
      }
    });

    cardBody.append(title).append(btn);
    card.append(image).append(cardBody);
    column.append(card);
    cardContainer.append(column);
  });
  console.log(IngredientArray);
}

// crete cards for each recepie

function createCards(recepieArray) {
  let cardContainer = $(".dishes-display");
  cardContainer.empty();
  //console.log(recepieArray);
  recepieArray.forEach(function (oneRecepie) {
    let column = $("<div>").addClass(
      "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4"
    );
    let card = $("<div>")
      .addClass("card mb-4")
      .css("width", "18rem")
      .attr("data-recipe", oneRecepie.id);
    let image = $("<img>")
      .addClass("card-img-top")
      .attr("src", oneRecepie.image)
      .attr("alt", oneRecepie.title);
    let cardBody = $("<div>").addClass("card-body");
    let title = $("<h5>").addClass("card-title").text(oneRecepie.title);
    let btn = $("<a>")
      .addClass("btn btn-primary show-recipe")
      .attr("data-recipe", oneRecepie.id)
      .attr("data-toggle", "modal")
      .attr("data-target", "#exampleModalCenter")
      .text("Show Recipe");
    //console.log(oneRecepie);
    // function that shows the modal that shows ingredients
    btn.on("click", function () {
      let recepieId = $(this).data("recipe");
      console.log(recepieId);
      getIngredients(recepieId);
      //console.log(recepieId);
    });

    cardBody.append(title).append(btn);
    card.append(image).append(cardBody);
    column.append(card);
    cardContainer.append(column);
  });
}

//added recipe in the modal
function fillmodal(ingredients) {
  let modal = $(".modal-body");
  modal.empty();
  console.log(ingredients);
  let instructionsConteiner = $("<div>");

  modal.append(instructionsConteiner);

  // added food score (I made the health score as header to make it bigger)
  let modalHeader = $(".modal-header");
  let foodScoreEl = ingredients.healthScore;

  modalHeader.text("Health Score: " + foodScoreEl + "%");

  let listOfInstructionsTitle = $("<h3>").text("Instructions");

  instructionsConteiner.append(listOfInstructionsTitle);

  if (ingredients.instructions !== null) {
    let recepieSteps = ingredients.instructions;

    recepieSteps = recepieSteps.split(".");

    let list = $("<ol>");

    recepieSteps.forEach(function (instruction) {
      if (isNaN(instruction)) {
        let newItem = $("<li>").text(instruction);
        // console.log(newItem);
        list.append(newItem);
      }
    });
    instructionsConteiner.append(list);
  } else {
    instructionsConteiner.text(
      "Oops! It looks like instructions not available at the moment."
    );
  }
  // console.log(recepieSteps);
  let listIngredientsTitle = $("<h3>").text("Ingredients");
  let ingredientList = $("<ol>");
  if (ingredients.extendedIngredients == undefined) {
    ingredients.forEach(function (oneOfTheIngredients) {
      let newIngredientItem = $("<li>").text(oneOfTheIngredients.original);
      ingredientList.append(newIngredientItem);
    });
  } else {
    ingredients.extendedIngredients.forEach(function (oneOfTheIngredients) {
      let newIngredientItem = $("<li>").text(oneOfTheIngredients.original);
      ingredientList.append(newIngredientItem);
    });
  }

  modal.append(listIngredientsTitle).append(ingredientList);
}

//function to get the ingredients once Show Recipe is clicked
function getIngredients(recipeID) {
  const settings = {
    async: true,
    crossDomain: true,
    url:
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" +
      recipeID +
      "/information",
    method: "GET",
    headers: {
      "X-RapidAPI-Key": keyAPI,
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  $.ajax(settings).done(function (response) {
    // Pass the response to render ingredients and instructions
    console.log(response);
    fillmodal(response);
  });
}

$("#search-btn").on("click", searchIngredient);

// Search works on Enter button key Up
$("#search-input").on("keyup", function (e) {
  if (e.keyCode === 13) {
    // e.preventDefault();
    $("#search-btn").click();
  }
});

//will show last user views
$(function () {
  // Retrieve the stored search values from local storage
  // var storedSearch = localStorage.getItem("search");
  // // If there are stored search values, set lastSearch to the stored values
  // var lastSearch = storedSearch ? JSON.parse(storedSearch) : [];

  $.widget("custom.catcomplete", $.ui.autocomplete, {
    _create: function () {
      this._super();
      this.widget().menu(
        "option",
        "items",
        "> :not(.ui-autocomplete-category)"
      );
    },
    _renderMenu: function (ul, items) {
      var that = this,
        currentCategory = "";
      $.each(items, function (index, item) {
        var li;
        if (item.category != currentCategory) {
          ul.append(
            "<li class='ui-autocomplete-category'>" + item.category + "</li>"
          );
          currentCategory = item.category;
        }
        li = that._renderItemData(ul, item);
        if (item.category) {
          li.attr("aria-label", item.category + " : " + item.label);
        }
      });
    },
  });
  var data = lastSearch;

  $("#search-input").catcomplete({
    delay: 0,
    source: data,
  });
});

//var local;

$("#search-btn").click(function () {
  const searchValue = $("#search-input").val();
  var local = lastSearch;
  local.push(searchValue);
  localStorage.setItem("search", JSON.stringify(local));
});

// $(function () {
//   // Retrieve the stored search values from local storage
//   var storedSearch = localStorage.getItem("search");

//   // If there are stored search values, set lastSearch to the stored values
//   var lastSearch = storedSearch ? JSON.parse(storedSearch) : [];

//   $.widget("custom.catcomplete", $.ui.autocomplete, {
//     _create: function () {
//       this._super();
//       this.widget().menu(
//         "option",
//         "items",
//         "> :not(.ui-autocomplete-category)"
//       );
//     },
//     _renderMenu: function (ul, items) {
//       var that = this,
//         currentCategory = "";
//       $.each(items, function (index, item) {
//         var li;
//         if (item.category != currentCategory) {
//           ul.append(
//             "<li class='ui-autocomplete-category'>" + item.category + "</li>"
//           );
//           currentCategory = item.category;
//         }
//         li = that._renderItemData(ul, item);
//         if (item.category) {
//           li.attr("aria-label", item.category + " : " + item.label);
//         }
//       });
//     },
//   });
//   var data = lastSearch;

//   $("#search-input").catcomplete({
//     delay: 0,
//     source: data,
//   });
// });

// $("#search-btn").click(function () {
//   const searchValue = $("#search-input").val();

//   // Add the new search value to the array
//   lastSearch.push(searchValue);

//   // Store the updated array in local storage
//   localStorage.setItem("search", JSON.stringify(lastSearch));
// });
