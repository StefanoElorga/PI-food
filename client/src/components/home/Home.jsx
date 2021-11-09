import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import {
  getDiets,
  getRecipes,
  filterDiets,
  orderByName,
  orderByPoints,
} from "../../actions/index";
import { Link } from "react-router-dom";
import Cards from "../cards/Cards";
import Paginado from "../paginado/Paginado";
import SearchBar from "../searchBar/SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.copyRecipes);
  const allDiets = useSelector((state) => state.diets);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipePerPage, setRecipePerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipePerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage;
  const currentRecipes = allRecipes?.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  console.log(allRecipes);
  console.log(currentRecipes);
  useEffect(() => {
    dispatch(getRecipes());

    if (!allDiets.length) {
      dispatch(getDiets());
    }
  }, [dispatch]);

  const diets = allDiets.map((d) => <option value={d.name}>{d.name}</option>);

  function dietsSelector(e) {
    if (e.target.value !== "dietas") {
      dispatch(filterDiets(e.target.value));
      setCurrentPage(1);
    }
  }

  function handleSort(e) {
    e.preventDefault();
    if (e.target.value !== "orden por nombre") {
      dispatch(orderByName(e.target.value));
      setCurrentPage(1);
      setOrder(`Ordenado ${e.target.value}`);
    }
  }

  function handleSortPoints(e) {
    e.preventDefault();
    if (e.target.value !== "orden por punt.") {
      dispatch(orderByPoints(e.target.value));
      setCurrentPage(1);
      setOrder(`Ordenado ${e.target.value}`);
    }
  }

  return (
    <div className="body">
      <h1 className="titulo">Recetas!</h1>
      <div>
        <Link to="/" className="link">
          <button className="buttons">
            <span>salir</span>
          </button>
        </Link>
        <Link to="/crear" className="link">
          <button className="buttons">
            <span>crear</span>
          </button>
        </Link>
      </div>
      <div>
        <SearchBar />
      </div>

      <div>
        <div className="selectores">
          <select onClick={dietsSelector} className="selector">
            <optgroup>
              {" "}
              <option>dietas</option>{" "}
            </optgroup>
            <option value="todas">todas</option>
            {diets}
          </select>

          <select onClick={handleSort} className="selector">
            <optgroup>
              <option>orden por nombre</option>
            </optgroup>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>

          <select onClick={handleSortPoints} className="selector">
            <optgroup>
              <option>orden por punt.</option>
            </optgroup>
            <option value="mayor">Mayor punt.</option>
            <option value="menor">Menor punt.</option>
          </select>
        </div>
      </div>
      <div>
        <Paginado
          recipePerPage={recipePerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />
      </div>
      <div className="cartas">
        {currentRecipes?.map((r) => {
          return (
            <div>
              <Link to={"/details/" + r.id} className="link">
                {" "}
                <Cards
                  name={r.title}
                  image={r.image}
                  dietType={r.diets}
                ></Cards>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
