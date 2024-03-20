import { useEffect, useState } from 'react';
import { Attacks } from './Attacks';

export const BattleEncounter = (props) => {
  const {
    selectedPokemon,
    enemyPokemon,
    setClickedLocation,
    setEnemyPokemon,
    setSelectedPokemon,
  } = props;
  const [playerTurn, setPlayerTurn] = useState(false);
  const [damageTaken, setDamageTaken] = useState(null);
  const [damageDealt, setDamageDealt] = useState(null);
  const [battleBegun, setBattleBegun] = useState(false);
  const isPokemonDead = { playerPokemonDead: false, enemyPokemonDead: false };

  if (selectedPokemon && enemyPokemon) {
    if (selectedPokemon.hp <= 0) {
      isPokemonDead.playerPokemonDead = true;
    }
    if (enemyPokemon.hp <= 0) {
      isPokemonDead.enemyPokemonDead = true;
    }
  }

  const calcDamage = (B, D) => {
    return Math.floor(
      ((((2 / 5 + 2) * B * 60) / D / 50 + 2) *
        Math.floor(Math.random() * (255 - 217) + 217)) /
        255,
    );
  };

  const handleAttack = (attack) => {
    if (enemyPokemon && attack) {
      console.log(attack.power);
      const damageDone =
        (calcDamage(selectedPokemon.dmg, enemyPokemon.def) + attack.power) / 2;
      setEnemyPokemon({ ...enemyPokemon, hp: enemyPokemon.hp - damageDone });
      setDamageDealt(damageDone);
    }
  };
  console.log(enemyPokemon.hp);

  const handleEnemyAttack = () => {
    if (enemyPokemon) {
      const damageDone = calcDamage(enemyPokemon.dmg, selectedPokemon.def);
      setSelectedPokemon({
        ...selectedPokemon,
        hp: selectedPokemon.hp - damageDone,
      });
      setDamageTaken(damageDone);
      setPlayerTurn(true);
    }

    return 'Loading...';
  };

  useEffect(() => {
    if (document.getElementById('damageText')) {
      document.getElementById(
        'damageText',
      ).innerText = `Your pokemon was dealt ${damageTaken}DMG!`;
    }

    if (document.getElementById('selectedPokemonImage')) {
      document
        .getElementById('selectedPokemonImage')
        .classList.add('animate-shake');

      setTimeout(() => {
        if (document.getElementById('selectedPokemonImage')) {
          document
            .getElementById('selectedPokemonImage')
            .classList.remove('animate-shake');
        }
      }, 2000);
    }
  }, [selectedPokemon]);

  useEffect(() => {
    if (document.getElementById('damageText')) {
      document.getElementById(
        'damageText',
      ).innerText = `${selectedPokemon.name} has dealt ${damageDealt}DMG!`;
    }

    if (document.getElementById('enemyPokemonImage')) {
      document
        .getElementById('enemyPokemonImage')
        .classList.add('animate-shake');
      setTimeout(() => {
        setPlayerTurn(false);
        document
          .getElementById('enemyPokemonImage')
          .classList.remove('animate-shake');
      }, 2000);
    }
  }, [enemyPokemon]);

  if (selectedPokemon && enemyPokemon && battleBegun) {
    return !isPokemonDead.playerPokemonDead &&
      !isPokemonDead.enemyPokemonDead ? (
      <div className='inline-flex pt-11'>
        <div id='selectedPokemon'>
          <div className='mt-5'>
            {selectedPokemon.name} {selectedPokemon.hp}
            <img
              id='selectedPokemonImage'
              className='items-center m-auto scale-115 '
              src={selectedPokemon.sprites['other']['showdown']['back_default']}
            />
          </div>
          {
            <div>
              <Attacks
                selectedPokemon={selectedPokemon}
                damageTaken={damageTaken}
                damageDealt={damageDealt}
                handleAttack={handleAttack}
                playerTurn={playerTurn}
                handleEnemyAttack={handleEnemyAttack}
              />
            </div>
          }
        </div>

        <div className='relative mb-20'>
          {enemyPokemon.name} {enemyPokemon.hp}
          <img
            id='enemyPokemonImage'
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
          }}
        >
          Return to the cities
        </button>
      </div>
    ) : (
      <div>
        <p>YOU HAVE WON YIPPI WOULD U LIKE TO CATCH THE POKEMON ? smileyface</p>
        <button
          onClick={() => {
            setClickedLocation({ url: null, name: null, clicked: false });
          }}
        >
          Return to the cities
        </button>
      </div>
    );
  } else {
    return (
      <button
        onClick={() => {
          setBattleBegun(true);
        }}
      >
        Begin battle!
      </button>
    );
  }
};
