import { useState, useEffect } from "react";
import reactLogo from "../assets/react.svg";
import "./blocks/App.css";
import { Route, Routes } from "react-router";
import Header from "./Header";
import { getPokemon, getPokemonInfo } from "../utils/api.js";
import { popularPokemonIDs } from "../utils/consts";
import PokeDataContext from "../contexts/PokeDataContext.js";
import PageDataContext from "../contexts/PageDataContext.js";
import Main from "./Main.jsx";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [activePokemonId, setActivePokemonId] = useState("");

  useEffect(() => {
    const pokemonLocalStorage = JSON.parse(localStorage.getItem("pokemon"));
    if (pokemonLocalStorage) {
      setPokemon(pokemonLocalStorage);
      // localStorage.removeItem("pokemon");
    } else {
      async function getPokemonData() {
        const requests = popularPokemonIDs.map((id) =>
          Promise.all([getPokemon(id), getPokemonInfo(id)])
        );

        const results = await Promise.all(requests).catch((err) =>
          console.error(err)
        );
        const pokeResults = results.map(([d1, d2], index) => ({
          index: index,
          name: d1.name,
          image: d1.sprites.other.home.front_default,
          idNumber: d1.id,
          height: d1.height,
          weight: d1.weight,
          type: d1.types[0].type.name,
          flavorText: d2.flavor_text_entries[0].flavor_text,
        }));

        localStorage.setItem("pokemon", JSON.stringify(pokeResults));
        setPokemon(pokeResults);
      }
      getPokemonData();
    }
  }, []);

  const handlePokemonCardClick = (idNumber) => {
    setActiveModal("pokemon-modal");
    setActivePokemonId(idNumber);
  };

  const handleCloseModalClick = () => {
    setActiveModal("");
  };

  return (
    <div className="page">
      <PageDataContext.Provider value={{ activeModal, handleCloseModalClick }}>
        <PokeDataContext.Provider value={{ pokemon, activePokemonId }}>
          <div className="page-content">
            <Header />
            <Routes>
              <Route
                path="/"
                element={<Main onClick={handlePokemonCardClick} />}
              />
              <Route path="/profile" />
            </Routes>

            {/* footer */}
          </div>
        </PokeDataContext.Provider>
      </PageDataContext.Provider>
    </div>
  );
}

export default App;
