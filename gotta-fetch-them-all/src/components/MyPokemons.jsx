import { useState, useEffect } from 'react';
import { BattleEncounter } from './battleEncounter';

export const MyPokemons = (props) => {
  const { url } = props;
  const { setClickedLocation } = props;
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);

  const usersPokemon = [
    'https://pokeapi.co/api/v2/pokemon/bulbasaur',
    'https://pokeapi.co/api/v2/pokemon/charizard',
    'https://pokeapi.co/api/v2/pokemon/xerneas',
  ];

  useEffect(() => {
    const fetchPokemonsData = async () => {
      const pokemonsFetched = usersPokemon.map(async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      });

      setPokemons(await Promise.all(pokemonsFetched));
    };
    const fetchEnemyPokemonData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setEnemyPokemon({
        name: data.name[0].toUpperCase() + data.name.slice(1, data.name.length),
        sprites: data.sprites,
        abilities: data.abilities,
        hp: data.stats[0]['base_stat'],
        dmg: data.stats[1]['base_stat'],
        def: data.stats[2]['base_stat'],
      });
    };
    fetchEnemyPokemonData();
    fetchPokemonsData();
  }, []);

  return (
    <div className='relative top-72'>
      {selectedPokemon ? (
        <div className=' text-white font-bold py-2 px-4 rounded-full mb-1 relative '>
          <BattleEncounter
            enemyPokemon={enemyPokemon}
            selectedPokemon={selectedPokemon}
            setClickedLocation={setClickedLocation}
            setEnemyPokemon={setEnemyPokemon}
            setSelectedPokemon={setSelectedPokemon}
          />
        </div>
      ) : pokemons && enemyPokemon ? (
        <div>
          <div className='relative mb-20'>
            <img
              className='m-auto'
              src={enemyPokemon.sprites['front_default']}
            />
            <p>{enemyPokemon.name}</p>
          </div>
          Please choose your pokemon
          <div className=' items-center justify-items-center flex'>
            {pokemons.map((pokemon, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedPokemon({
                      name:
                        pokemon.name[0].toUpperCase() +
                        pokemon.name.slice(1, pokemon.name.length),
                      sprites: pokemon.sprites,
                      abilities: pokemon.abilities,
                      hp: pokemon.stats[0]['base_stat'],
                      dmg: pokemon.stats[1]['base_stat'],
                      def: pokemon.stats[2]['base_stat'],
                    });
                  }}
                  className='transition ease-in delay-75 hover:scale-110 text-white font-bold mb-1 py-2  items-center justify-items-center'
                >
                  <p>{pokemon.name}</p>
                  <img src={pokemon.sprites['front_default']} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
