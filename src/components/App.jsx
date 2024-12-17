import '../styles/App.css';
import { useEffect, useState } from 'react';
import {
  shuffleArray,
  get12RandomPokemons,
  cachePokemonsList,
} from './PokemonsData.js';
import Card from './Card.jsx';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [clickedPokemonsNames, setClickedPokemonsNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAndCachePokemons() {
      try {
        const cachedPokemons = await cachePokemonsList();
        setPokemons(get12RandomPokemons(cachedPokemons));
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch Pokémon data:', error);
        setIsLoading(false);
      }
    }

    fetchAndCachePokemons();
  }, []);

  function handleCardClick(event) {
    const pokemonName = event.currentTarget.id;

    if (clickedPokemonsNames.includes(pokemonName)) {
      if (score > bestScore) {
        setBestScore(score);
      }
      setScore(0);
      setClickedPokemonsNames([]);
      setPokemons((pokemons) => get12RandomPokemons(pokemons));
    } else {
      setScore((score) => score + 1);
      setClickedPokemonsNames((clickedPokemonsNames) => [
        ...clickedPokemonsNames,
        pokemonName,
      ]);
      setPokemons((pokemons) => shuffleArray(pokemons));
    }
  }

  return (
    <>
      <div>
        <p>Score: {score}</p>
        <p>Best Score: {bestScore}</p>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="cards-container">
          {pokemons.map((pokemon) => (
            <Card
              key={pokemon.name}
              pokemon={pokemon}
              onClick={handleCardClick}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
