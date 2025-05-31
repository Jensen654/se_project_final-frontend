import { useContext } from "react";
import PokeDataContext from "../contexts/PokeDataContext";
import PageDataContext from "../contexts/PageDataContext";
import UserDataContext from "../contexts/UserDataContext";
import "./blocks/PokemonModal.css";

function PokemonModal() {
  const { pokemon, activePokemonId } = useContext(PokeDataContext);
  const { activeModal, handleCloseModalClick } = useContext(PageDataContext);
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
      className={`pokemon__modal ${
        activeModal === "pokemon-modal" && "pokemon__modal_opened"
      }`}
    >
      <div className="pokemon__modal_container">
        <div className="pokemon__modal_title-container">
          <button
            className={`pokemon__modal_save-button ${
              favoritePokemon?.includes(findPokemon()?.idNumber)
                ? "pokemon__modal_save-button_filled"
                : ""
            }`}
            type="button"
            onClick={handleSaveClick}
          ></button>
          <h2 className="pokemon__modal_title">{findPokemon()?.name}</h2>
          <button
            className="pokemon__modal_close-button"
            type="button"
            onClick={handleCloseModalClick}
          ></button>
        </div>
        <p className="pokemon__modal_description">
          Type: {findPokemon()?.type} <br />
          Pokedex number: {findPokemon()?.idNumber} <br />
          Height: {findPokemon()?.height / 10} meters <br />
          Weight: {findPokemon()?.weight / 10} kilograms. <br />
          First Seen: {findPokemon()?.introduced} <br />
          <br />
          {findPokemon()?.flavorText[0]?.flavor_text}
        </p>
        <img
          className="pokemon__modal_image"
          src={findPokemon()?.altImage}
          alt={findPokemon()?.name}
        />
      </div>
    </div>
  );
}

export default PokemonModal;
