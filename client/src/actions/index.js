import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    let recipes = await axios.get(`http://localhost:3001/recipes`);
    return dispatch({
      type: "GET_RECIPES",
      payload: recipes.data,
    });
  };
}
export function getDiets() {
  return async function (dispatch) {
    let diets = await axios.get(`http://localhost:3001/diets`);
    return dispatch({
      type: "DIETS",
      payload: diets.data,
    });
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    const response = await axios.post(`http://localhost:3001/recipes`, payload);
    return response;
  };
}

export function filterDiets(name) {
  return {
    type: "FILTER_DIETS",
    payload: name,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByPoints(payload) {
  return {
    type: "ORDER_BY_POINTS",
    payload,
  };
}

export function getNameRecipes(payload) {
  return async function (dispatch) {
    try {
      var recipesName = await axios.get(
        `http://localhost:3001/recipes?name=` + payload
      );
      return dispatch({
        type: "GET_NAME_RECIPES",
        payload: recipesName.data,
      });
    } catch (error) {}
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      var details = await axios.get(`http://localhost:3001/recipes/` + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: details.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
