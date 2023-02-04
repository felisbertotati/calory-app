// create localStorage variable to store users last search
// let initialRecepie = localStorage.initialCuisine || [];
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

// function to get ingredients from selected recipe
// function getIngredients(recipeID) {
//   // var selectedRecipeID = selectedRecipe.results.id.val()
//   const settings = {
//     async: true,
//     crossDomain: true,
//     url:
//       "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" +
//       recipeID +
//       "/information",
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": keyAPI,
//       "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//     },
//   };

//   $.ajax(settings).done(function (response) {
//     var ingredients = response["extendedIngredients"];
//     console.log(ingredients);
//   });
// }

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

// function to run depending on the cuisine selected
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
  let cardContainer = $(".dishes-display");
  cardContainer.empty();
  console.log(IngredientArray);
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
      .attr("target", "_blank")
      .text("Show more");

    cardBody.append(title).append(btn);
    card.append(image).append(cardBody);
    column.append(card);
    cardContainer.append(column);
  });
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
  });
  // add staff to the modal
  // let instructions = $("<p>");
  // var instructionsEl = recipeID.instructions;
}

$("#search-btn").on("click", searchIngredient);

// Search works on Enter button key Up
$("#search-input").on("keyup", function (e) {
  if (e.keyCode === 13) {
    // e.preventDefault();
    $("#search-btn").click();
  }
});
