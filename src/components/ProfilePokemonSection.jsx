import { useContext } from "react";
import UserDataContext from "../contexts/UserDataContext";
import ItemCard from "./ItemCard";
import PageDataContext from "../contexts/PageDataContext";
import PokemonModal from "./PokemonModal";
import "./blocks/ProfilePokemonSection.css";
import Preloader from "./Preloader";

function ProfilePokemonSection() {
  const { favePokemonData } = useContext(UserDataContext);
  const { handlePokemonCardClick, loading } = useContext(PageDataContext);

  return (
    <div className="profile__pokemon-section">
      <h2 className="profile__pokemon-section_title">My Favorites</h2>
      <ul className="profile__pokemon-section_list">
        {favePokemonData.length > 0 &&
          favePokemonData.map((poke) => {
            return (
              <ItemCard
                name={poke.name}
                image={poke.image}
                idNumber={poke.idNumber}
                key={poke.idNumber}
                onClick={handlePokemonCardClick}
                index={poke.index}
                type={poke.type}
              />
            );
          })}
      </ul>
      <PokemonModal />
      {loading && <Preloader />}
    </div>
  );
}

export default ProfilePokemonSection;
