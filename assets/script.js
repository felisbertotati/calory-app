//event listener when user selects a cuisine from dropdown menu
$(document).ready(function () {
  $("select.form-select").change(function () {
    var selectedRecipe = $(this).children("option:selected").text();
    console.log(selectedRecipe);

    userRecipe(selectedRecipe);
  });
});

// function to get ingredients from selected recipe
function getIngredients(recipeID) {
  // var selectedRecipeID = selectedRecipe.results.id.val()
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
    var ingredients = response["extendedIngredients"];
    console.log(ingredients);
  });
}

// Make drop down menu
let cousineOptions = [
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
cousineOptions.forEach(function (cousine) {
  var option = $("<option>").attr("value", i).text(cousine);
  $("#select-cousine").append(option);
  i++;
});
// End of drop down menu

// function to run depending on the cuisine selected
function userRecipe(selectedRecipe) {
  $(".dishes-display").empty();

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
      "& addRecipeInformation=true" +
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
    var recipeID = response.results;
    createCards(recipeID);
  });
}

// open food facts Api added in the search ingredient input
function searchIngredient() {
  var userInput = $("#search-input").val();
  $.ajax({
    url: `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${userInput}&search_simple=1&action=process&json=1`,
    method: "GET",
    success: function (data) {
      var IngredientArray = data.products
      ingredientsCards(IngredientArray);
    },
  });
}

//create cards for ingredients searched by user
function ingredientsCards(IngredientArray){
  let cardContainer = $(".dishes-display");
  cardContainer.empty();
  console.log(IngredientArray)
  IngredientArray.forEach(function (IngredientArray) {
    let column = $("<div>").addClass(
      "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4"
    );
    let card = $("<div>")
      .addClass("card mb-4")
      .css("width", "18rem")
      .attr("data-ingredient", IngredientArray.id);
    let image = $("<img>")
      .addClass("card-img-top")
      .attr("src","img/placeholder-icon.ico")
      .attr("src",IngredientArray.image_url)
      .attr('id', "img-size")
      .attr("alt", IngredientArray.product_name);
    let cardBody = $("<div>").addClass("card-body");
    let brand = IngredientArray.brands
    let title = $("<h5>").addClass("card-title").text(IngredientArray.product_name + "-" + brand);
    let btnLink = "https://world.openfoodfacts.org/product/"+ IngredientArray.id
    //when user clicks Show more, it will redirect them to openfacts for more info
    let btn = $("<a>")
      .addClass("btn btn-secondary")
      .attr("href", btnLink)
      .attr("target","_blank")
      .text("Show more");

      cardBody.append(title).append(btn);
      card.append(image).append(cardBody);
      column.append(card);
      cardContainer.append(column);
});
};

// crete cards for each recepie

function createCards(recepieArray) {
  let cardContainer = $(".dishes-display");
  cardContainer.empty();
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
      .text("Show Recipe");

    // function that shows the modal that shows ingredients
    btn.on("click", function () {
      let recepieId = $(this).data("recipe");
      console.log(recepieId);
      getIngredients(recepieId);

      $("#myModal").removeClass("d-none");
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
}

$("#search-btn").on("click", searchIngredient);
