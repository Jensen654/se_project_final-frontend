import { useState, useEffect } from "react";
import "./blocks/App.css";
import { Route, Routes } from "react-router";
import Header from "./Header";
import { getPokemon, getPokemonInfo } from "../utils/PokeApi.js";
import { popularPokemonIDs } from "../utils/consts";
import PokeDataContext from "../contexts/PokeDataContext.js";
import PageDataContext from "../contexts/PageDataContext.js";
import UserDataContext from "../contexts/UserDataContext.js";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import Profile from "./Profile.jsx";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import Preloader from "./Preloader.jsx";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [activePokemonId, setActivePokemonId] = useState("");
  const [user, setUser] = useState({
    name: "",
    avatarUrl: "",
  });
  const [favoritePokemon, setFavoritePokemon] = useState([]);
  const [favePokemonData, setFavePokemonData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData?.user.name.length > 0) {
      setUser({ name: userData.user.name, avatarUrl: userData.user.avatarUrl });
      setFavoritePokemon(userData.favoritePokemon);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const pokemonLocalStorage = JSON.parse(localStorage.getItem("pokemon"));

    if (pokemonLocalStorage && pokemonLocalStorage.length > 1) {
      setPokemon(pokemonLocalStorage);
      setLoading(false);
    } else {
      async function getPokemonData() {
        setLoading(true);
        const requests = popularPokemonIDs.map((id) =>
          Promise.all([getPokemon(id), getPokemonInfo(id)])
        );

        const results = await Promise.all(requests)
          .catch((err) => {
            alert(
              "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later."
            );
            console.error(err);
          })
          .finally(() => {
            setLoading(false);
          });

        const pokeResults = results.map(([d1, d2], index) => ({
          index: index,
          name: d1.name.charAt(0).toUpperCase() + d1.name.slice(1),
          image: d1.sprites.other.home.front_default,
          altImage: d1.sprites.front_default,
          idNumber: d1.id,
          height: d1.height,
          weight: d1.weight,
          type: d1.types[0].type.name,
          flavorText: d2.flavor_text_entries.filter((textEntry) => {
            return textEntry.language.name == "en";
          }),
          introduced:
            d2.generation.name.charAt(0).toUpperCase() +
            d2.generation.name.slice(1),
        }));

        if (
          JSON.stringify(pokeResults) !== JSON.stringify(pokemonLocalStorage)
        ) {
          localStorage.setItem("pokemon", JSON.stringify(pokeResults));
          setPokemon(pokeResults);
        }
      }
      getPokemonData();
    }
  }, []);

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      const requests = favoritePokemon.map((id) =>
        Promise.all([getPokemon(id), getPokemonInfo(id)])
      );

      const results = await Promise.all(requests)
        .catch((err) => {
          alert(
            "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later."
          );
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });

      const pokeResults = results.map(([d1, d2]) => ({
        index: pokemon.length,
        name: d1.name.charAt(0).toUpperCase() + d1.name.slice(1),
        image: d1.sprites.other.home.front_default,
        altImage: d1.sprites.front_default,
        idNumber: d1.id,
        height: d1.height,
        weight: d1.weight,
        type: d1.types[0].type.name,
        flavorText: d2.flavor_text_entries.filter(
          (textEntry) => textEntry.language.name === "en"
        ),
        introduced:
          d2.generation.name.charAt(0).toUpperCase() +
          d2.generation.name.slice(1),
      }));

      setFavePokemonData(pokeResults);
    }

    fetchPokemon();
  }, [favoritePokemon]);

  useEffect(() => {
    if (user.name?.length > 0) {
      localStorage.setItem("user", JSON.stringify({ user, favoritePokemon }));
    }
  }, [user, favoritePokemon]);

  const handlePokemonCardClick = (idNumber) => {
    setActiveModal("pokemon-modal");
    setActivePokemonId(idNumber);
  };

  const handleLoginClick = () => {
    setActiveModal("login-modal");
  };

  const handleSignUpClick = () => {
    setActiveModal("signup-modal");
  };

  const handleCloseModalClick = () => {
    setActiveModal("");
  };

  return (
    <div className="page">
      <UserDataContext.Provider
        value={{
          favoritePokemon,
          setFavoritePokemon,
          user,
          setUser,
          favePokemonData,
          setFavePokemonData,
        }}
      >
        <PageDataContext.Provider
          value={{
            activeModal,
            setActiveModal,
            handleCloseModalClick,
            handlePokemonCardClick,
            handleLoginClick,
            handleSignUpClick,
            loading,
          }}
        >
          <PokeDataContext.Provider
            value={{
              pokemon,
              setPokemon,
              activePokemonId,
              setActivePokemonId,
            }}
          >
            <div className="page-content">
              <Header />
              <Routes>
                <Route
                  path="/"
                  element={<Main onClick={handlePokemonCardClick} />}
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
              </Routes>

              <Footer />
              <SignUpModal />
              <LoginModal />
              {loading && <Preloader />}
            </div>
          </PokeDataContext.Provider>
        </PageDataContext.Provider>
      </UserDataContext.Provider>
    </div>
  );
}

export default App;
