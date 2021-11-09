import React from "react";
import cards from "./cards.css";

export default function Cards({ name, image, dietType }) {
  return (
    <div className="cards">
      <div className="title-diets">
        <h3 className="title">{name}</h3>
        <div className="cards-diet">
          {dietType &&
            dietType.map((c, i) => {
              if (typeof c === "object") {
                if (i === 0)
                  return (
                    <span key={c.name}>
                      {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
                    </span>
                  );
                return (
                  <span key={c.name}>
                    {"  -  " + c.name.charAt(0).toUpperCase() + c.name.slice(1)}
                  </span>
                );
              }
              if (i === 0) {
                return (
                  <span key={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</span>
                );
              }
              return (
                <span key={c}>
                  {"  -  " + c.charAt(0).toUpperCase() + c.slice(1)}
                </span>
              );
            })}
        </div>
      </div>

      <img src={image} alt="img not found" className="image" />
    </div>
  );
}
