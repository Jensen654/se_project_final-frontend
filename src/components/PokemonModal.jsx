import { useContext } from "react";
import PokeDataContext from "../contexts/PokeDataContext";
import PageDataContext from "../contexts/PageDataContext";
import UserDataContext from "../contexts/UserDataContext";
import "./blocks/PokemonModal.css";

function PokemonModal() {
  const { pokemon, activePokemonId } = useContext(PokeDataContext);
  const { activeModal, handleCloseModalClick, stopModalPropagation } =
    useContext(PageDataContext);
  const { favoritePokemon, setFavoritePokemon, favePokemonData } =
    useContext(UserDataContext);

  const handleSaveClick = (e) => {
    e.stopPropagation();
    if (favoritePokemon?.includes(findPokemon()?.idNumber)) {
      return setFavoritePokemon(
        favoritePokemon.filter((id) => id !== findPokemon()?.idNumber)
      );
    }
    setFavoritePokemon([...favoritePokemon, findPokemon()?.idNumber]);
  };

  const findPokemon = () => {
    const initialPokemon = pokemon.find((p) => p.idNumber === activePokemonId);
    const favePokemon = favePokemonData.find(
      (p) => p.idNumber === activePokemonId
    );
    if (initialPokemon) {
      return initialPokemon;
    } else if (favePokemon) {
      return favePokemon;
    } else {
      console.log("error finding pokemon modal data");
    }
  };

  return (
    <div
      className={`pokemon-modal ${
        activeModal === "pokemon-modal" && "pokemon-modal_opened"
      }`}
      onClick={handleCloseModalClick}
    >
      <div className="pokemon-modal__container" onClick={stopModalPropagation}>
        <div className="pokemon-modal__title-container">
          <button
            className={`pokemon-modal__save ${
              favoritePokemon?.includes(findPokemon()?.idNumber)
                ? "pokemon-modal__save_filled"
                : ""
            }`}
            type="button"
            onClick={handleSaveClick}
          ></button>
          <h2 className="pokemon-modal__title">{findPokemon()?.name}</h2>
          <button
            className="pokemon-modal__close"
            type="button"
            onClick={handleCloseModalClick}
          ></button>
        </div>
        <p className="pokemon-modal__description">
          Type: {findPokemon()?.type} <br />
          Pokedex number: {findPokemon()?.idNumber} <br />
          Height: {findPokemon()?.height / 10} meters <br />
          Weight: {findPokemon()?.weight / 10} kilograms. <br />
          First Seen: {findPokemon()?.introduced} <br />
          <br />
          {findPokemon()?.flavorText[0]?.flavor_text}
        </p>
        <img
          className="pokemon-modal__image"
          src={findPokemon()?.altImage}
          alt={findPokemon()?.name}
        />
      </div>
    </div>
  );
}

export default PokemonModal;
