import { useContext } from "react";
import PokeDataContext from "../contexts/PokeDataContext";
import PageDataContext from "../contexts/PageDataContext";
import "./blocks/PokemonModal.css";

function PokemonModal() {
  const { pokemon, activePokemonId } = useContext(PokeDataContext);
  const { activeModal, handleCloseModalClick } = useContext(PageDataContext);

  return (
    <>
      {activeModal && (
        <div
          className={`pokemon__modal ${
            activeModal === "pokemon-modal" && "pokemon__modal_opened"
          }`}
        >
          <div className="pokemon__modal_container">
            <div className="pokemon__modal_title-container">
              <h2 className="pokemon__modal_title">
                {pokemon[activePokemonId].name}
              </h2>
              <button
                className="pokemon__modal_close-button"
                type="button"
                onClick={handleCloseModalClick}
              ></button>
            </div>
            <img
              className="pokemon__modal_image"
              src={pokemon[activePokemonId].image}
              alt={pokemon[activePokemonId].name}
            />
            <p className="pokemon__modal_description">
              {pokemon[activePokemonId].name} is{" "}
              {pokemon[activePokemonId].height / 10} meters tall. It weighs{" "}
              {pokemon[activePokemonId].weight / 10} kilograms.{" "}
              {pokemon[activePokemonId].flavorText}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default PokemonModal;
