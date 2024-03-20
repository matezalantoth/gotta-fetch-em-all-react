import { useState } from 'react';
import { Attacks } from './Attacks';

export const BattleEncounter = (props) => {
  const { selectedPokemon, enemyPokemon, setClickedLocation } = props;
  const [currentAttack, setCurrentAttack] = useState(null);
  const [currentAttackURL, setCurrentAttackURL] = useState(null);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [damageTaken, setDamageTaken] = useState(null);
  const isPokemonDead = { playerPokemonDead: false, enemyPokemonDead: false };

  if (selectedPokemon && enemyPokemon) {
    if (selectedPokemon.stats[0]['base_stat'] <= 0) {
      isPokemonDead.playerPokemonDead = true;
    }
    if (enemyPokemon.stats[0]['base_stat'] <= 0) {
      isPokemonDead.enemyPokemonDead = true;
    }
  }

  const calcDamage = (B, D) => {
    return Math.floor(
      ((((2 / 5 + 2) * B * 60) / D / 50 + 2) *
        Math.floor(Math.random() * (255 - 217) + 217)) /
        255
    );
  };

  const damageStat = (pokemon) => {
    return pokemon.stats.filter((stat) => stat.stat.name === 'attack')[0][
      'base_stat'
    ];
  };

  const defenseStat = (pokemon) => {
    return pokemon.stats.filter((stat) => stat.stat.name === 'defense')[0][
      'base_stat'
    ];
  };

  const handleAttack = () => {
    if (enemyPokemon && currentAttack) {
      const damageDealt = calcDamage(
        damageStat(selectedPokemon),
        defenseStat(enemyPokemon)
      );
      enemyPokemon.stats[0]['base_stat'] =
        enemyPokemon.stats[0]['base_stat'] - damageDealt;

      // alert(`You've dealt ${damageDealt}DMG!`);
      setPlayerTurn(false);
    }
  };

  const handleEnemyAttack = () => {
    if (enemyPokemon) {
      const damageDealt = calcDamage(
        damageStat(enemyPokemon),
        defenseStat(selectedPokemon)
      );

      selectedPokemon.stats[0]['base_stat'] =
        selectedPokemon.stats[0]['base_stat'] - damageDealt;
      setDamageTaken(damageDealt);
      setPlayerTurn(true);
    }

    return 'Loading...';
  };
  console.log(enemyPokemon.sprites);

  if (selectedPokemon && enemyPokemon) {
    return !isPokemonDead.playerPokemonDead &&
      !isPokemonDead.enemyPokemonDead ? (
      <div className='inline-flex pt-11'>
        <div id='selectedPokemon'>
          <div className='mt-5'>
            {selectedPokemon.name} {selectedPokemon.stats[0]['base_stat']}
            <img
              className='items-center m-auto scale-115  '
              src={selectedPokemon.sprites['other']['showdown']['back_default']}
            />
          </div>{' '}
          {playerTurn ? (
            <div>
              <Attacks
                selectedPokemon={selectedPokemon}
                currentAttackURL={currentAttackURL}
                setCurrentAttackURL={setCurrentAttackURL}
                setCurrentAttack={setCurrentAttack}
                damageTaken={damageTaken}
                handleAttack={handleAttack}
              />
            </div>
          ) : (
            <div>
              <h2>{handleEnemyAttack()}</h2>
            </div>
          )}
        </div>
        <div className='relative mb-20'>
          {enemyPokemon.name} {enemyPokemon.stats[0]['base_stat']}
          <img
            className='m-auto scale-115'
            src={enemyPokemon.sprites['other']['showdown']['front_default']}
          />
        </div>
      </div>
    ) : isPokemonDead.playerPokemonDead ? (
      <div>
        <p>YOUR POKEMON IS DEAD CUNT</p>

        <button
          onClick={() => {
            setClickedLocation({ url: null, name: null, clicked: false });
          }}>
          Return to the cities
        </button>
      </div>
    ) : (
      <div>
        <p>YOU HAVE WON YIPPI WOULD U LIKE TO CATCH THE POKEMON ? smileyface</p>
        <button
          onClick={() => {
            setClickedLocation({ url: null, name: null, clicked: false });
          }}>
          Return to the cities
        </button>
      </div>
    );
  }
};
