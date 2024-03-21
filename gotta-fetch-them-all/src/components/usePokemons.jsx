import { useEffect, useState } from 'react';

const usedURLs = [];

export const usePokemons = () => {
  const [pokemons, setPokemons] = useState([]);

  const usersPokemon = [
    'https://pokeapi.co/api/v2/pokemon/mewtwo',
    'https://pokeapi.co/api/v2/pokemon/squirtle',
    'https://pokeapi.co/api/v2/pokemon/charmander',
    'https://pokeapi.co/api/v2/pokemon/bulbasaur',
    'https://pokeapi.co/api/v2/pokemon/pikachu',
  ];

  useEffect(() => {
    const fetchPokemonsData = async () => {
      const pokemonsFetched = usersPokemon.map(async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      });
      const tempPokemons = await Promise.all(pokemonsFetched);

      const promisedPokemons = tempPokemons.map(async (pokemon) => {
        pokemon.moveSet = [];
        for (let i = 0; i < 5; i++) {
          await getAttack(pokemon);
        }
        return pokemon;
      });
      const finalPokemons = await Promise.all(promisedPokemons);
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
        pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)].move;
      if (!usedURLs.includes(potentialAttack.url)) {
        usedURLs.push(potentialAttack.url);
        const response = await fetch(potentialAttack.url);
        const data = await response.json();

        if (data.power) {
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
      } else {
        getAttack();
      }
    }
  };

  return { pokemons, setPokemons };
};
