import React from "react";
import "./CharacterCard.css";

const CharacterCard = ({ character, onViewMore }) => (
  <div className="character-card">
    <img
      src={character.image}
      alt={character.name}
      className="character-card-img"
    />
    <div className="character-card-body">
      <h3 className="character-card-title">{character.name}</h3>
      <p className="character-card-desc">{character.description}</p>
      <button className="character-card-btn" onClick={onViewMore}>
        Ver más información
      </button>
    </div>
  </div>
);

export default CharacterCard;