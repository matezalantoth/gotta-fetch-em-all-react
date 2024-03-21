import { useState, useEffect } from 'react';
import { BattleEncounter } from './battleEncounter';
import { MyPokemonsRenderer } from './MyPokemonsRenderer';

export const MyPokemons = (props) => {
  const { url, pokemons, setPokemons, setClickedLocation } = props;
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const usedURLs = [];

  useEffect(() => {
    const fetchEnemyPokemonData = async () => {
      const response = await fetch(url);
      const data = await response.json();

      data.moveSet = [];
      const getAttack = async (pokemon) => {
        if (pokemon) {
          const potentialAttack =
            pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)]
              .move;
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
      for (let i = 0; i < 5; i++) {
        getAttack(data);
      }

      setEnemyPokemon({
        name: data.name[0].toUpperCase() + data.name.slice(1, data.name.length),
        sprites: data.sprites,
        hp: data.stats[0]['base_stat'],
        dmg: data.stats[1]['base_stat'],
        def: data.stats[2]['base_stat'],
        moveSet: data.moveSet,
        uneditedHP: data.stats[0]['base_stat'],
      });
    };
    fetchEnemyPokemonData();
  }, []);

  return (
    <div className='relative top-72 text-center'>
      {selectedPokemon ? (
        <div className=' text-black font-bold py-2 px-4 rounded-full mb-1 relative '>
          <BattleEncounter
            pokemons={pokemons}
            setPokemons={setPokemons}
            enemyPokemon={enemyPokemon}
            selectedPokemon={selectedPokemon}
            setClickedLocation={setClickedLocation}
            setEnemyPokemon={setEnemyPokemon}
            setSelectedPokemon={setSelectedPokemon}
          />
        </div>
      ) : pokemons && enemyPokemon ? (
        <MyPokemonsRenderer
          setSelectedPokemon={setSelectedPokemon}
          pokemons={pokemons}
          enemyPokemon={enemyPokemon}
        />
      ) : (
        ''
      )}
    </div>
  );
};
