export async function cachePokemonsList() {
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  const limit = 200;

  const cachedData = localStorage.getItem('pokemonCache');
  if (cachedData) {
    console.log('Using cached Pokémon data');
    getPokemonsImgs(JSON.parse(cachedData));
  }else{
    try {
      const response = await fetch(`${baseUrl}?limit=${limit}`);
      const data = await response.json();
  
      localStorage.setItem('pokemonCache', JSON.stringify(data.results));
      console.log('Pokémon data cached successfully');
  
      return data.results;
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      return [];
    }
  }
}

export async function getPokemonsImgs(cachedData) {
  if (Array.isArray(cachedData) && cachedData.length > 0 && Object.hasOwn(cachedData[0], 'img')  ) {
    console.log('Pokemons already have images');
  }else{
    const pokemonPromises = cachedData.map((pokemon) =>  
      fetch(pokemon.url).then((res) => res.json())  
    );  
    const pokemonData = await Promise.all(pokemonPromises); 
    const pokemonsWithImgs = pokemonData.map(pokemon => {
      return {  
        name: pokemon.name,   
        img: pokemon.sprites.other['official-artwork'].front_default,  
      };
    });
    localStorage.setItem('pokemonCache', JSON.stringify(pokemonsWithImgs));
  }
}

function getPokemons() {
  const pokemonsData = JSON.parse(localStorage.getItem('pokemonCache'));
  if (pokemonsData) {
    return pokemonsData;
  }else{
    throw new Error('No data about pokemons!');
  }
  
}
const pokemonsArray = getPokemons(); 

export function getRandomPokemons() {
  if (pokemonsArray.length < 12) {
      throw new Error("Input array must have at least 12 elements.");
  }

  const result = [];
  const usedIndices = new Set();

  while (result.length < 12) {
      const randomIndex = Math.floor(Math.random() * pokemonsArray.length);
      if (!usedIndices.has(randomIndex)) {
          result.push(pokemonsArray[randomIndex]);
          usedIndices.add(randomIndex);
      }
  }

  return result;
}

export function shuffleArray(array) {
 
  const shuffledArray = [...array];
  
  for (let i = shuffledArray.length - 1; i > 0; i--) {
      
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
  }
  
  return shuffledArray;
}