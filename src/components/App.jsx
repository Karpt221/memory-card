import '../styles/App.css';
import {
  shuffleArray,
  getRandomPokemons,
  cachePokemonsList,
} from './PokemonsData.js';
import { useEffect, useState, useMemo } from 'react';
import Card from "./Card.jsx";


function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const initialPokemons = useMemo(() => getRandomPokemons(), []);  
  const [pokemons, setPokemons] = useState(initialPokemons);
  const [clickedPokemonsNames, setClickedPokemonsNames] = useState([]);

  useEffect(() => {
    cachePokemonsList();
  }, []);

  function handleCardClick(event) {
    const pokemonName = event.currentTarget.id;
    if (clickedPokemonsNames.includes(pokemonName)) {
      if (score > bestScore) {
        setBestScore(score);
      }
      setScore(0);
      setClickedPokemonsNames([]);
      setPokemons((pokemons) => getRandomPokemons(pokemons));
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

      <div className="cards-container">
        {pokemons.map((pokemon) => {
          return (
            <Card key={pokemon.name} pokemon={pokemon} onClick={handleCardClick} />
          );
        })}
      </div>
    </>
  );
}

export default App;
