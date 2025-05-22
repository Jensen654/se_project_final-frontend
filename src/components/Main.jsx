import ItemCard from "./ItemCard";
import { useContext } from "react";
import PokeDataContext from "../contexts/PokeDataContext";
import "./blocks/Main.css";
import PokemonModal from "./PokemonModal";

function Main({ onClick }) {
  const { pokemon } = useContext(PokeDataContext);

  return (
    <div className="main">
      <ul className="pokemon__list">
        {pokemon.length > 0 &&
          pokemon.map((card) => {
            console.log(card.index);
            return (
              <ItemCard
                name={card.name}
                image={card.image}
                idNumber={card.idNumber}
                key={card.idNumber}
                onClick={onClick}
                index={card.index}
              />
            );
          })}
      </ul>
      <PokemonModal />
    </div>
  );
}

export default Main;
