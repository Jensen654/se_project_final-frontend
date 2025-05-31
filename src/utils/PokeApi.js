export const BASE_URL = "pokeapi.co/api/v2";

const handleResponse = (res) => {
  if (res.ok) {
    const repo = res.json();
    return repo;
  }
};

const getPokemon = (pokeId) => {
  return fetch(`https://${BASE_URL}/pokemon/${pokeId}/`).then((res) =>
    handleResponse(res)
  );
};

const getPokemonInfo = (pokeId) => {
  return fetch(`https://${BASE_URL}/pokemon-species/${pokeId}/`).then((res) =>
    handleResponse(res)
  );
};

const getPokemonCharacteristics = (pokeId) => {
  return fetch(`https://${BASE_URL}/stat/${pokeId}`)
    .then((res) => handleResponse(res))
    .then((res) => {
      const url = res.characteristics[0].url;
      return fetch(url).then((data) => handleResponse(data));
    });
};

export { getPokemon, getPokemonInfo, getPokemonCharacteristics };
