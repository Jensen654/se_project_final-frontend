import "./blocks/ItemCard.css";
import { useContext } from "react";
import UserDataContext from "../contexts/UserDataContext";

function ItemCard({ name, image, idNumber, onClick, type }) {
  const { favoritePokemon, setFavoritePokemon, user } =
    useContext(UserDataContext);

  const handleSaveClick = (e) => {
    e.stopPropagation();
    if (favoritePokemon?.includes(idNumber)) {
      return setFavoritePokemon(
        favoritePokemon.filter((id) => id !== idNumber)
      );
    }
    setFavoritePokemon([...favoritePokemon, idNumber]);
  };

  const handleClick = () => {
    onClick(idNumber);
  };

  return (
    <li className="pokemon__item-card_container" onClick={handleClick}>
      <img className="pokemon__image" src={image} alt="Pokemon" />
      {user.name?.length > 0 && (
        <button
          className={`pokemon__button ${
            favoritePokemon?.includes(idNumber) ? "pokemon__button-filled" : ""
          }`}
          type="button"
          onClick={handleSaveClick}
        ></button>
      )}
      <p className="pokemon__name">
        Name: {name} <br /> Type: {type}
      </p>
    </li>
  );
}

export default ItemCard;
