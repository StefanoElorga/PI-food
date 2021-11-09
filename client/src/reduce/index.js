const initialState = {
  recipes: [],
  copyRecipes: [],
  diets: [],
  details: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        copyRecipes: action.payload,
      };

    case "FILTER_DIETS":
      console.log(action.payload);
      const recipes = state.recipes;
      return {
        ...state,
        copyRecipes:
          action.payload === "todas"
            ? recipes
            : state.recipes.filter((r) => r.diets.includes(action.payload)),
      };

    case "DIETS":
      return {
        ...state,
        diets: action.payload,
      };

    case "ORDER_BY_NAME": {
      let sortArr =
        action.payload === "asc"
          ? state.copyRecipes.sort(function (a, b) {
              if (a.title > b.title) {
                return 1;
              }
              if (a.title < b.title) {
                return -1;
              }
              return 0;
            })
          : state.copyRecipes.sort(function (a, b) {
              if (a.title > b.title) {
                return -1;
              }
              if (b.title > a.title) {
                return 1;
              }
              return 0;
            });
      console.log(sortArr);
      return {
        ...state,
        copyRecipes: sortArr,
      };
    }
    case "ORDER_BY_POINTS":
      let sortArr =
        action.payload === "menor"
          ? state.copyRecipes.sort(function (a, b) {
              if (a.spoonacularScore > b.spoonacularScore) {
                return 1;
              }
              if (a.spoonacularScore < b.spoonacularScore) {
                return -1;
              }
              return 0;
            })
          : state.copyRecipes.sort(function (a, b) {
              if (a.spoonacularScore > b.spoonacularScore) {
                return -1;
              }
              if (b.spoonacularScore > a.spoonacularScore) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        copyRecipes: sortArr,
      };

    case "GET_NAME_RECIPES": {
      return {
        ...state,
        recipes: action.payload,
        copyRecipes: action.payload,
      };
    }

    case "POST_RECIPE": {
      return {
        ...state,
      };
    }

    case "GET_DETAILS": {
      console.log(action.payload);
      return {
        ...state,
        details: action.payload,
      };
    }

    default:
      return state;
  }
}
