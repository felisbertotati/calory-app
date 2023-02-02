//event listener when user selects a cuisine from dropdown menu
$(document).ready(function(){
  $("select.form-select").change(function(){
      var selectedRecipe = $(this).children("option:selected").text();
      console.log(selectedRecipe);
      
      userRecipe(selectedRecipe);
  });
});

// function to run depending on the cuisine selected
function userRecipe(selectedRecipe){

const settings = {
  async: true,
  crossDomain: true,
  url:
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?" +
    "query=" +
    selectedRecipe + "&" +
    "cuisine=" + selectedRecipe  +
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
  console.log(response)
  for (var i = 0; i < response.results.length; i++){
   var recipeID = response.results[i].id
   console.log(recipeID);
   getIngredients(recipeID);};
  

  
});
};


// function to get ingredients from selected recipe
function getIngredients(recipeID) {
  // var selectedRecipeID = selectedRecipe.results.id.val()
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+ recipeID + "/information",
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
}


// Make drop down menue
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
// End of drop down menue



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