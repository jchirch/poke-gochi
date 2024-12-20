import './PartyMenu.css';
import { useState, useEffect } from "react";

function PartyMenu({ fetchSpecificPokemon }) {
  const [pokemonPartyData, setPokemonPartyData] = useState(null);

  function fetchData() {
    fetch("https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/3/pokemons")
      .then(response => {
        console.log("Received response:", response);
        return response.json();
      })
      .then(data => {
        console.log("Parsed data:", data);
        setPokemonPartyData(data); 
      })
      .catch(error => {
        console.error('Fetch operation failed:', error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function renderPokemonOnMain(identifier) {
    console.log("HIT 1")
    fetchSpecificPokemon(identifier)
    console.log("HIT 2")
  }

  return (
    <div className="party-menu">
      <header className="party-header">
        Your Party!
      </header>

      {pokemonPartyData ? (
        <div className="pokemon-party-list">
          <ul>
            {pokemonPartyData.data.map((pokemon) => (
              <li key={pokemon.id} className='pokemon-party-member'>
                <button href="#" onClick={() => renderPokemonOnMain(pokemon.id)}>
                  <img src={pokemon.attributes.small_img} alt={pokemon.attributes.name} />
                  {pokemon.attributes.name}, Level: {pokemon.attributes.level}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h1 className="pokemon-load-error">Loading Pokémon data...</h1>
      )}
    </div>
  );
}

export default PartyMenu;