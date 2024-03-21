import { useEffect, useState } from 'react';

const usedURLs = [];

export const usePokemons = () => {
  const [pokemons, setPokemons] = useState([]);

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

    fetchPokemonsData();
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
        if (data.power) {
          console.log(data);
          pokemon.moveSet.push(data);
          console.log(pokemon.moveSet);
        } else {
          getAttack();
        }
      } else {
        getAttack();
      }
    }
  };

  useEffect(() => {
    pokemons.map((pokemon) => {
      if (!pokemon.moveSet) {
        pokemon.moveSet = [];
        for (let i = 0; i < 5; i++) {
          getAttack(pokemon);
        }
      }
    });
  }, [pokemons]);

  return { pokemons };
};
