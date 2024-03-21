import { useState, useEffect } from 'react';
import { BattleEncounter } from './battleEncounter';

export const MyPokemons = (props) => {
  const { url, pokemons, setPokemons } = props;
  const { setClickedLocation } = props;
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const usedURLs = [];

  useEffect(() => {
    const fetchEnemyPokemonData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      for (let i = 0; i < 5; i++) {
        console.log(data.moves[Math.floor(Math.random() * data.moves.length)]);
      }
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
              console.log(data.power);
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
      getAttack(data);

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
    <div className='relative top-72'>
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
                      abilities: pokemon.moveSet,
                      hp: pokemon.uneditedHP
                        ? pokemon.uneditedHP
                        : pokemon.stats[0]['base_stat'],
                      dmg: pokemon.dmg
                        ? pokemon.dmg
                        : pokemon.stats[1]['base_stat'],
                      def: pokemon.def
                        ? pokemon.def
                        : pokemon.stats[2]['base_stat'],
                    });
                  }}
                  className='transition ease-in delay-75 hover:scale-110 text-black font-bold mb-1 py-2  items-center justify-items-center'
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
