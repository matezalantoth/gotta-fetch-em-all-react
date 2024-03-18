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
        <p className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-1 w-96 relative opacity-80'>
          {selectedPokemon.name}
          <img
            className='items-center'
            src={selectedPokemon.sprites['front_default']}></img>
        </p>
      ) : pokemons ? (
        pokemons.map((pokemon, i) => {
          return (
            <p
              key={i}
              onClick={() => setSelectedPokemon(pokemon)}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-1 w-96 relative opacity-80'>
              {pokemon.name}
              <img
                className='items-center'
                src={pokemon.sprites['front_default']}></img>
            </p>
          );
        })
      ) : (
        ''
      )}
    </>
  );
};
