import ItemCard from "./ItemCard";
import { useContext } from "react";
import PokeDataContext from "../contexts/PokeDataContext";
import "./blocks/Main.css";
import PokemonModal from "./PokemonModal";

function Main({ onClick }) {
  const { pokemon } = useContext(PokeDataContext);

  return (
    <main>
      <ul className="pokemon-list">
        {pokemon.length > 0 &&
          pokemon.map((card) => {
            return (
              <ItemCard
                name={card.name}
                image={card.image}
                idNumber={card.idNumber}
                key={card.idNumber}
                onClick={onClick}
                index={card.index}
                type={card.type}
              />
            );
          })}
      </ul>
      <PokemonModal />
    </main>
  );
}

export default Main;
