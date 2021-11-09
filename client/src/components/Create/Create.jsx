import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../../actions";
import create from "./create.css";

function validate(input) {
  let errors = {};
  if (!input.title) {
    errors.title = "se requiere un titulo";
  } else if (!input.summary) {
    errors.summary = "se requiere un resumen";
  }
  return errors;
}

export default function Create() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({});

  let dietsRender = diets.map((d) => {
    return (
      <div key={d.id}>
        <label className="titulo-input">{d.name}</label>
        <input
          className="checks-create"
          type="checkbox"
          value={d.id}
          name={d.name}
          onChange={handleCheck}
        />
      </div>
    );
  });
  const [input, setInput] = useState({
    title: "",
    summary: "",
    spoonacularScore: 0,
    healthScore: 0,
    steps: [],
    image: "",
    diets: [],
    dishType: "",
  });

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (errors.title || errors.summary) {
      return alert("llena todos los campos");
    }
    dispatch(postRecipe(input));
    alert("receta creada");
    setInput({
      title: "",
      summary: "",
      spoonacularScore: 0,
      healthScore: 0,
      steps: [],
      image: "",
      diets: [],
      dishType: "",
    });
    history.push("/home");
  }

  return (
    <div className="body-create">
      <div>
        <Link to="/home" className="links">
          <button className="button-volver">
            <span>volver</span>{" "}
          </button>
        </Link>
      </div>

      <div>
        <h1 className="title-create">Crea tu receta!</h1>
      </div>

      <div className="form-create">
        <form onSubmit={handleSubmit} className="form-all">
          <div>
            <div>
              <label className="titulo-input">Titulo</label>
              <input
                className="input-create"
                type="text"
                placeholder="titulo de tu receta"
                value={input.title}
                name="title"
                onChange={handleChange}
              />

              {errors.title && <p className="error">{errors.title}</p>}
            </div>
            <div>
              <label className="titulo-input">Tipo de plato</label>
              <input
                className="input-create"
                type="text"
                placeholder="tipo de tu receta"
                value={input.dishType}
                name="dishType"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="titulo-input">Resumen</label>
              <textarea
                className="textarea-create"
                type="text"
                placeholder="resumen de tu receta"
                value={input.summary}
                name="summary"
                onChange={handleChange}
              />
              {errors.summary && <p className="error">{errors.summary}</p>}
            </div>
            <div>
              <label className="titulo-input">pasos</label>
              <textarea
                className="textarea-create"
                type="text"
                placeholder="pasos de tu receta"
                value={input.steps}
                name="steps"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="titulo-input">Puntuacion</label>
              <input
                className="input-create"
                type="number"
                placeholder="Puntuación de tu receta"
                value={input.spoonacularScore}
                name="spoonacularScore"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="titulo-input">Salud</label>
              <input
                className="input-create"
                type="number"
                placeholder="salud de tu receta"
                value={input.healthScore}
                name="healthScore"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="titulo-input">imagen</label>
              <input
                className="input-create"
                type="text"
                placeholder="imagen de tu receta"
                value={input.image}
                name="image"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            {dietsRender}
            {/* <label className="titulo-input">gluten free</label>
            <input
              className="checks-create"
              type="checkbox"
              value="gluten free"
              name="gluten free"
              onChange={handleCheck}
            />

            <label className="titulo-input">dairy free</label>
            <input
              className="checks-create"
              type="checkbox"
              value="dairy free"
              name="diary free"
              onChange={handleCheck}
            />

            <label className="titulo-input">lacto ovo vegetarian</label>
            <input
              className="checks-create"
              type="checkbox"
              value="lacto ovo vegetarian"
              name="lacto ovo vegetarian"
              onChange={handleCheck}
            />

            <label className="titulo-input">vegan</label>
            <input
              className="checks-create"
              type="checkbox"
              value="vegan"
              name="vegan"
              onChange={handleCheck}
            />

            <label className="titulo-input">paleolithic</label>
            <input
              className="checks-create"
              type="checkbox"
              value="paleolithic"
              name="paleolithic"
              onChange={handleCheck}
            />

            <label className="titulo-input">primal</label>
            <input
              className="checks-create"
              type="checkbox"
              value="primal"
              name="primal"
              onChange={handleCheck}
            />

            <label className="titulo-input">pescatarian</label>
            <input
              className="checks-create"
              type="checkbox"
              value="pescatarian"
              name="pescatarian"
              onChange={handleCheck}
            /> */}
          </div>
          <div>
            <button type="submit" className="button-create">
              <span>Crear receta</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
