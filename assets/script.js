//event listener when user selects a cuisine from dropdown menu
$(document).ready(function () {
  $("select.form-select").change(function () {
    var selectedRecipe = $(this).children("option:selected").text();
    console.log(selectedRecipe);

    userRecipe(selectedRecipe);

  });
});

// function to run depending on the cuisine selected
function userRecipe(selectedRecipe) {

  $('.dishes-display').empty()

  const settings = {
    async: true,
    crossDomain: true,
    url:
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?" +
      "query=" +
      selectedRecipe + "&" +
      "cuisine=" + selectedRecipe +
      // + "& excludeCuisine=greek"
      // + "& diet=vegetarian"
      // + "& intolerances=gluten"
      // + "& equipment=pan"
      "& includeIngredients=" +
      // + "& excludeIngredients=eggs"
      // + "& type=main % 20course"
      // + "& instructionsRequired=true"
      // + "& fillIngredients=false" 
      "& addRecipeInformation=true" +
      // + "& titleMatch=Crock % 20Pot"
      // + "& maxReadyTime=20"
      // + "& ignorePantry=true"
      "& sort=calories" +
      "& sortDirection=asc" +
      // + "& minCarbs=10"
      // + "& maxCarbs=100"
      // + "& minProtein=10"
      // + "& maxProtein=100"
      "& minCalories=50" +
      "& maxCalories=800",
    // + "& minFat=10"
    // + "& maxFat=100"
    // + "& minAlcohol=0"
    // + "& maxAlcohol=100"
    // + "& minCaffeine=0"
    // + "& maxCaffeine=100"
    // + "& minCopper=0"
    // + "& maxCopper=100"
    // + "& minCalcium=0"
    // + "& maxCalcium=100"
    // + "& minCholine=0"
    // + "& maxCholine=100"
    // + "& minCholesterol=0"
    // + "& maxCholesterol=100"
    // + "& minFluoride=0"
    // + "& maxFluoride=100"
    // + "& minSaturatedFat=0"
    // + "& maxSaturatedFat=100"
    // + "& minVitaminA=0"
    // + "& maxVitaminA=100"
    // + "& minVitaminC=0"
    // + "& maxVitaminC=100"
    // + "& minVitaminD=0"
    // + "& maxVitaminD=100"
    // + "& minVitaminE=0"
    // + "& maxVitaminE=100"
    // + "& minVitaminK=0"
    // + "& maxVitaminK=100"
    // + "& minVitaminB1=0"
    // + "& maxVitaminB1=100"
    // + "& minVitaminB2=0"
    // + "& maxVitaminB2=100"
    // + "& minVitaminB5=0"
    // + "& maxVitaminB5=100"
    // + "& minVitaminB3=0"
    // + "& maxVitaminB3=100"
    // + "& minVitaminB6=0"
    // + "& maxVitaminB6=100"
    // + "& minVitaminB12=0"
    // + "& maxVitaminB12=100"
    // + "& minFiber=0"
    // + "& maxFiber=100"
    // + "& minFolate=0"
    // + "& maxFolate=100"
    // + "& minFolicAcid=0"
    // + "& maxFolicAcid=100"
    // + "& minIodine=0"
    // + "& maxIodine=100"
    // + "& minIron=0"
    // + "& maxIron=100"
    // + "& minMagnesium=0"
    // + "& maxMagnesium=100"
    // + "& minManganese=0"
    // + "& maxManganese=100"
    // + "& minPhosphorus=0"
    // + "& maxPhosphorus=100"
    // + "& minPotassium=0"
    // + "& maxPotassium=100"
    // + "& minSelenium=0"
    // + "& maxSelenium=100"
    // + "& minSodium=0"
    // + "& maxSodium=100"
    // + "& minSugar=0"
    // + "& maxSugar=100"
    // + "& minZinc=0"
    // + "& maxZinc=100"
    // + "& offset=0"
    // + "& number=10"
    // + "& limitLicense=false"
    // + "& ranking=2"
    method: "GET",
    headers: {
      "X-RapidAPI-Key": keyAPI,
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };


  // API request
  $.ajax(settings).done(function (response) {
    // console.log(response)
    createCards(response.results);
  });
};

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


//ingredients function
const searchTerm = "tomatoes";
async function searchProducts() {
  const response = await fetch(
    `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&search_simple=1&action=process&json=1`
  );
  const data = await response.json();
  console.log(data);
}
// searchProducts();



// crete cards for each recepie

function createCards(recepieArray) {
  let cardContainer = $(".dishes-display");
  cardContainer.empty();
  recepieArray.forEach(function (oneRecepie) {
    let column = $("<div>").addClass(
      "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4"
    );
    let card = $("<div>")
      .addClass("card")
      .css("width", "18rem")
      .attr("data-recipe", oneRecepie.id);
    let image = $("<img>")
      .addClass("card-img-top")
      .attr("src", oneRecepie.image)
      .attr("alt", oneRecepie.title);
    let cardBody = $("<div>").addClass("card-body");
    let title = $("<h5>").addClass("card-title").text(oneRecepie.title);
    let btn = $("<a>")
      .addClass("btn btn-primary")
      // .attr("href", "#")
      .attr("data-recipe", oneRecepie.id)
      .text("Show Recipe");
    cardBody.append(title).append(btn);
    card.append(image).append(cardBody);
    column.append(card)
    cardContainer.append(column);
  });
  // event listener to get ingredients from selected recipe
  $('.btn').on("click", getIngredients)
};

//function to get the ingredients once Show Recipe is clicked
function getIngredients() {
  var recipeID = $(this).attr('data-recipe');
  console.log(recipeID);
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+ recipeID.toString() +"/information",
    "method": "GET",
    "headers": {
      "X-RapidAPI-Key": keyAPI,
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
    }
  };

  $.ajax(settings).done(function (response) {
    var ingredients = response['extendedIngredients']
    console.log(ingredients);
  });
};

