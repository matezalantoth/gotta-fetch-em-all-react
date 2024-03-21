import { useEffect, useState } from 'react';

const usedURLs = [];

export const usePokemons = () => {
  const [pokemons, setPokemons] = useState([]);

  const usersPokemon = [
    'https://pokeapi.co/api/v2/pokemon/mewtwo',
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
      const tempPokemons = await Promise.all(pokemonsFetched);
      const finalPokemons = tempPokemons.map(async (pokemon) => {
        if (!pokemon.moveSet) {
          pokemon.moveSet = [];
          for (let i = 0; i < 5; i++) {
            await getAttack(pokemon);
          }
        }
        return pokemon;
      });

      return await Promise.all(finalPokemons);
    };
    const handlePokemons = async () => {
      setPokemons(await fetchPokemonsData());
    };

    handlePokemons();
  }, []);

  const getAttack = async (pokemon) => {
    if (pokemon) {
      const potentialAttack =
        pokemon.moves[Math.floor(Math.random() * pokemon.abilities.length)]
          .move;
      if (!usedURLs.includes(potentialAttack.url)) {
        usedURLs.push(potentialAttack.url);
        const response = await fetch(potentialAttack.url);
        const data = await response.json();

        data.name = (
          data.name.split('-')[0][0].toUpperCase() +
          data.name.slice(1, data.name.length)
        )
          .split('-')
          .join(' ');
        pokemon.moveSet.push(data);
      } else {
        getAttack();
      }
    }
  };

  return { pokemons, setPokemons };
};
