import React from "react";
import characters from "../../data/characters";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import "./Characters.css";

const Characters = () => (
  <div className="characters-container">
    <h2>Personajes</h2>
    <div className="characters-list">
      {characters.map(character => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  </div>
);

export default Characters;
