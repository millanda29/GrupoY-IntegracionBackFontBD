import React from "react";
import "./ActorCard.css";

const ActorCard = ({ actor, onViewMore }) => (
  <div className="actor-card">
    <img
      src={actor.image}
      alt={actor.nombre}
      className="actor-card-img"
    />
    <div className="actor-card-body">
      <h3 className="actor-card-title">{actor.nombre}</h3>
      <button className="actor-card-btn" onClick={onViewMore}>
        Ver más información
      </button>
    </div>
  </div>
);

export default ActorCard;
