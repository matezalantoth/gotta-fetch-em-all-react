import { useEffect, useState } from 'react';
import { Attacks } from './Attacks';

export const BattleEncounter = (props) => {
  const { selectedPokemon, enemyPokemonURL } = props;
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [currentAttack, setCurrentAttack] = useState(null);
  const [currentAttackURL, setCurrentAttackURL] = useState(null);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [damageTaken, setDamageTaken] = useState(null);
  const isPokemonDead = { playerPokemonDead: false, enemyPokemonDead: false };

  useEffect(() => {
    const fetchEnemyPokemonData = async () => {
      const response = await fetch(enemyPokemonURL);
      const data = await response.json();
      setEnemyPokemon(data);
    };
    fetchEnemyPokemonData();
  }, []);

  useEffect(() => {
    if (isPokemonDead.playerPokemonDead) {
      alert(`You're ${selectedPokemon.name} has fainted!`);
    }
    if (isPokemonDead.enemyPokemonDead) {
      alert(`The ${enemyPokemon.name} has fainted!`);
    }
  }, [isPokemonDead]);

  if (selectedPokemon && enemyPokemon) {
    if (selectedPokemon.stats[0]['base_stat'] <= 0) {
      isPokemonDead.playerPokemonDead = true;
      // document.getElementById('selectedPokemon').hidden = true;
    }
    if (enemyPokemon.stats[0]['base_stat'] <= 0) {
      isPokemonDead.enemyPokemonDead = true;
      // document.getElementById('enemyPokemon').hidden = true;
    }
  }

  const calcDamage = (B, D) => {
    return Math.floor(
      ((((2 / 5 + 2) * B * 60) / D / 50 + 2) *
        Math.floor(Math.random() * (255 - 217) + 217)) /
        255,
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
        defenseStat(enemyPokemon),
      );
      enemyPokemon.stats[0]['base_stat'] =
        enemyPokemon.stats[0]['base_stat'] - damageDealt;
      console.log(enemyPokemon.stats[0]['base_stat']);
      alert(`You've dealt ${damageDealt}DMG!`);
      setPlayerTurn(false);
    }
  };

  const handleEnemyAttack = () => {
    if (enemyPokemon) {
      const damageDealt = calcDamage(
        damageStat(enemyPokemon),
        defenseStat(selectedPokemon),
      );

      selectedPokemon.stats[0]['base_stat'] =
        selectedPokemon.stats[0]['base_stat'] - damageDealt;
      setDamageTaken(damageDealt);
      setPlayerTurn(true);
    }

    return 'Loading...';
  };

  //   if (currentAttack) {
  //   }
  if (selectedPokemon && enemyPokemon) {
    if (!isPokemonDead.playerPokemonDead && !isPokemonDead.enemyPokemonDead) {
      return (
        <div id='selectedPokemon'>
          <div className='mt-5'>
            {selectedPokemon.name} {selectedPokemon.stats[0]['base_stat']}
            <img
              className='items-center m-auto'
              src={selectedPokemon.sprites['front_default']}
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
      );
    }
  }
};
