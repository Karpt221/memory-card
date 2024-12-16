function Card({ pokemon, onClick }) {
  return (
    <div onClick={onClick} className="card" id={pokemon.name}>
      <img src={pokemon.img} alt="" />
      <p>{pokemon.name}</p>
    </div>
  );
}

export default Card;
