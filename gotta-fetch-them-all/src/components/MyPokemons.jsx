import { useState, useEffect } from 'react';

export const MyPokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState();

  const usersPokemon = [
    'https://pokeapi.co/api/v2/pokemon/bulbasaur',
    'https://pokeapi.co/api/v2/pokemon/charizard',
    'https://pokeapi.co/api/v2/pokemon/poliwhirl',
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
    fetchPokemonsData();
  }, []);
  console.log(pokemons);

  return (
    <>
      {selectedPokemon ? (
        <div>
          <p className='text-white font-bold py-2 px-4 rounded-full mb-1 relative opacity-80'>
            {selectedPokemon.name}
            <img
              className='items-center'
              src={selectedPokemon.sprites['front_default']}
            />
          </p>
        </div>
      ) : pokemons ? (
        <div>
          Please choose your pokemon
          <div className=' items-center justify-items-center flex'>
            {pokemons.map((pokemon, i) => {
              return (
                <div
                  key={i}
                  onClick={() => setSelectedPokemon(pokemon)}
                  className=' text-white font-bold mb-1 py-2  opacity-80 items-center justify-items-center'>
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
    </>
  );
};
