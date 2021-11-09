import React from "react";
import paginado from "./paginado.css";

export default function Paginado({ recipePerPage, allRecipes, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipePerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <nav>
        <ul className="numberOrder">
          {pageNumbers &&
            pageNumbers.map((number) => (
              <li key={number}>
                <a className="number" onClick={() => paginado(number)}>
                  {number}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
