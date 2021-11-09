import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../actions";
import { useEffect } from "react";
import { useParams } from "react-router";
import details from "./details.css";

export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch]);

  const myRecipe = useSelector((state) => state.details);

  console.log("este", myRecipe);
  return (
    <div>
      {myRecipe.id ? (
        <div>
          <h1>{myRecipe.title}</h1>
          <img src={myRecipe.image} />
          <p>{myRecipe.dishType}</p>
          {<p>{myRecipe.diets}</p>}
          <p>spoonacularScore: {myRecipe.spoonacularScore}</p>
          <p>healthScore: {myRecipe.healthScore}</p>
          <div
            dangerouslySetInnerHTML={{ __html: myRecipe.summary }}
            className="recipe-summary"
          ></div>
          {
            <div>
              {myRecipe.analyzedInstructions?.map((s) =>
                s.steps.map((c) => {
                  return <p> {c.step} </p>;
                })
              )}
            </div>
          }
        </div>
      ) : (
        <div>
          <p>Cargando...</p>
        </div>
      )}
      <div>
        <Link to="/home">
          <button>volver</button>
        </Link>
      </div>
    </div>
  );
}
