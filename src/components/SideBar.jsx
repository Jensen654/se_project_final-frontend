import "./blocks/SideBar.css";
import { useContext, useState } from "react";
import UserDataContext from "../contexts/UserDataContext";
import PageDataContext from "../contexts/PageDataContext";
import PokeDataContext from "../contexts/PokeDataContext";
import { getPokemon, getPokemonInfo } from "../utils/PokeApi";

function SideBar() {
  const { user } = useContext(UserDataContext);
  const { setActiveModal } = useContext(PageDataContext);
  const { pokemon, setPokemon, setActivePokemonId } =
    useContext(PokeDataContext);
  const [pokeNumber, setPokeNumber] = useState("");

  const handleEditClick = () => {
    setActiveModal("edit-modal");
  };

  const handleLogOutClick = () => {
    setActiveModal("delete-modal");
  };

  const handleFormChange = (e) => {
    setPokeNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveModal("pokemon-modal");

    async function getPokemonData() {
      const requests = await Promise.all([
        getPokemon(e.target[0].value),
        getPokemonInfo(e.target[0].value),
      ]);

      const results = await Promise.all(requests).catch((err) => {
        alert(
          "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later."
        );
        console.error(err);
      });
      const pokeResults = {
        index: pokemon.length,
        name:
          results[0].name.charAt(0).toUpperCase() + results[0].name.slice(1),
        image: results[0].sprites.other.home.front_default,
        altImage: results[0].sprites.front_default,
        idNumber: results[0].id,
        height: results[0].height,
        weight: results[0].weight,
        type: results[0].types[0].type.name,
        flavorText: results[1].flavor_text_entries.filter((textEntry) => {
          return textEntry.language.name == "en";
        }),
        introduced:
          results[1].generation.name.charAt(0).toUpperCase() +
          results[1].generation.name.slice(1),
      };
      setPokemon([...pokemon, pokeResults]);
      setActivePokemonId(pokeResults.idNumber);
    }
    getPokemonData();
  };

  return (
    <div className="profile__side-bar">
      <div className="profile__side-bar_user">
        <img
          className="profile__side-bar_image"
          src={user.avatarUrl.length > 0 ? user.avatarUrl : null}
          alt="UserImage"
        />
        <h2 className="profile__side-bar_name">{user.name}</h2>
      </div>
      <button
        onClick={handleEditClick}
        className="profile__side-bar_button"
        type="button"
      >
        Edit Profile
      </button>
      <button
        onClick={handleLogOutClick}
        className="profile__side-bar_button"
        type="button"
      >
        Log Out and Delete
      </button>
      <form
        className="profile__side-bar_pokemon-search"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="profile__side-bar_input"
          className="profile__side-bar_label"
        >
          Search for Pokemon by Pokedex Number!{" "}
          <input
            value={pokeNumber}
            onChange={handleFormChange}
            type="number"
            id="profile__side-bar_input"
            className="profile__side-bar_input"
            placeholder="Ex. 380"
            required
          />
        </label>
        <button className="profile__side-bar_submit-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SideBar;
