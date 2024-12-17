const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const LIMIT = 200;

export async function cachePokemonsList() {
  const cachedData = localStorage.getItem('pokemonCache');
  if (cachedData) {
    console.log('Using cached Pokémon data');
    return JSON.parse(cachedData);
  } else {
    try {
      const response = await fetch(`${BASE_URL}?limit=${LIMIT}`);
      const data = await response.json();
      const random20Pokemons = shuffleArray(data.results).slice(0, 19);
      const pokemonsWithImgs = await getPokemonsImgs(random20Pokemons);

      localStorage.setItem('pokemonCache', JSON.stringify(pokemonsWithImgs));
      console.log('Pokémons list cached successfully');

      return pokemonsWithImgs;
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      throw error;
    }
  }
}

async function getPokemonsImgs(data) {
  const pokemonPromises = data.map((pokemon) =>
    fetch(pokemon.url).then((res) => res.json())
  );

  const pokemonData = await Promise.all(pokemonPromises);

  return pokemonData.map((pokemon) => ({
    name: pokemon.name,
    img: pokemon.sprites.other['official-artwork'].front_default,
  }));
}

export function getPokemons() {
  const pokemonsData = localStorage.getItem('pokemonCache');
  if (pokemonsData) {
    return JSON.parse(pokemonsData);
  } else {
    throw new Error('No data about Pokémon in localStorage!');
  }
}
export function get12RandomPokemons(pokemonsArray) {
  if (pokemonsArray.length < 12) {
    throw new Error('Input array must have at least 12 elements.');
  }

  return shuffleArray(pokemonsArray).slice(0, 12);
}

export function shuffleArray(array) {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }

  return shuffledArray;
}
