import { useEffect, useState } from 'react';
import { Attacks } from './Attacks';

export const BattleEncounter = (props) => {
  const {
    pokemons,
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
        255
    );
  };

  const handleAttack = (attack) => {
    if (enemyPokemon && attack) {
      const damageDone =
        Math.floor(Math.random() * attack.accuracy) > 10
          ? Math.floor(
              calcDamage(selectedPokemon.dmg, enemyPokemon.def) +
                attack.power / 4
            )
          : 0;
      setEnemyPokemon({ ...enemyPokemon, hp: enemyPokemon.hp - damageDone });
      setDamageDealt(damageDone);
    }
  };

  const handleEnemyAttack = () => {
    if (enemyPokemon) {
      const enemyAttack =
        enemyPokemon.moveSet[
          Math.floor(Math.random() * enemyPokemon.moveSet.length)
        ];
      let damageDone = 0;
      if (enemyAttack) {
        damageDone =
          Math.floor(Math.random() * enemyAttack.accuracy) > 10
            ? Math.floor(
                (calcDamage(enemyPokemon.dmg, selectedPokemon.def) +
                  enemyAttack.power) /
                  4
              )
            : 0;
      } else {
        damageDone = Math.floor(
          calcDamage(enemyPokemon.dmg, selectedPokemon.def) * 2
        );
      }
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
        'damageText'
      ).innerText = `${enemyPokemon.name} dealt ${damageTaken}DMG!`;

      document.getElementById('damageTakenIndicator').hidden = false;
    }

    if (document.getElementById('selectedPokemonImage')) {
      document
        .getElementById('selectedPokemonImage')
        .classList.add('animate-shake');

      setTimeout(() => {
        document.getElementById('damageTakenIndicator').hidden = true;
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
        'damageText'
      ).innerText = `${selectedPokemon.name} has dealt ${damageDealt}DMG!`;
      document.getElementById('damageDealtIndicator').hidden = false;
    }

    if (document.getElementById('enemyPokemonImage')) {
      document
        .getElementById('enemyPokemonImage')
        .classList.add('animate-shake');
      setTimeout(() => {
        document.getElementById('damageDealtIndicator').hidden = true;
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
      <div>
        <div className='inline-flex pt-11'>
          <div id='selectedPokemon'>
            <div className='mt-5'>
              {selectedPokemon.name}{' '}
              <div className='inline-flex'>
                <p
                  className={
                    (selectedPokemon.hp > 60
                      ? 'text-green-600'
                      : selectedPokemon.hp > 30
                      ? 'text-yellow-300'
                      : 'text-red-600') +
                    ' bg-slate-800 rounded-xl w-10 relative m-auto'
                  }>
                  {selectedPokemon.hp}
                </p>
                <p
                  id='damageTakenIndicator'
                  className={
                    (damageTaken > 35
                      ? 'text-red-900'
                      : damageTaken > 15
                      ? 'text-yellow-300'
                      : 'text-blue-600') + ' ml-12 fixed animate-shake'
                  }
                  hidden>
                  -{damageTaken}
                </p>
              </div>
              <img
                id='selectedPokemonImage'
                className='items-center m-auto scale-115 '
                src={
                  selectedPokemon.sprites['other']['showdown']['back_default']
                }
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

          <div className='text-black relative mb-20'>
            {enemyPokemon.name}{' '}
            <div className='inline-flex'>
              <p
                className={
                  (enemyPokemon.hp > 60
                    ? 'text-green-600'
                    : enemyPokemon.hp > 30
                    ? 'text-yellow-300'
                    : 'text-red-600') +
                  ' bg-slate-800 rounded-xl w-10 relative m-auto'
                }>
                {enemyPokemon.hp}
              </p>
              <p
                id='damageDealtIndicator'
                className={
                  (damageDealt > 35
                    ? 'text-red-900'
                    : damageDealt > 15
                    ? 'text-yellow-300'
                    : 'text-blue-600') + ' ml-12 animate-shake fixed'
                }
                hidden>
                -{damageDealt}
              </p>
            </div>
            <img
              id='enemyPokemonImage'
              className='m-auto scale-115'
              src={enemyPokemon.sprites['other']['showdown']['front_default']}
            />
          </div>
        </div>
      </div>
    ) : isPokemonDead.playerPokemonDead ? (
      <div>
        <p className='text-white font-bold'>YOUR POKEMON IS DEAD 💀💀</p>

        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-1 w-96 relative opacity-80'
          onClick={() => {
            setClickedLocation({ url: null, name: null, clicked: false });
          }}>
          Return to the cities
        </button>
      </div>
    ) : (
      <div>
        <p className='  text-white font-bold '>YOU HAVE WON YIPPI 🏆🏆🔥🔥 </p>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-1 w-96 relative opacity-80'
          onClick={() => {
            pokemons.push(enemyPokemon);
            setClickedLocation({ url: null, name: null, clicked: false });
          }}>
          Catch the defated pokemon 🔴
        </button>
        <div className='text-black relative mb-20'>
          {enemyPokemon.name}
          {' is dead'}
          <div className='inline-flex'>
            <p>💀💀</p>
            <p
              id='damageDealtIndicator'
              className={
                (damageDealt > 35
                  ? 'text-red-900'
                  : damageDealt > 15
                  ? 'text-yellow-300'
                  : 'text-blue-600') + ' ml-12 animate-shake fixed'
              }
              hidden>
              -{damageDealt}
            </p>
          </div>
          <img
            id='enemyPokemonImage'
            className='m-auto scale-115'
            src={enemyPokemon.sprites['other']['showdown']['front_default']}
          />
        </div>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-1 w-96 relative opacity-80'
          onClick={() => {
            setClickedLocation({ url: null, name: null, clicked: false });
          }}>
          Return to the cities 🏙️
        </button>
      </div>
    );
  } else {
    return (
      <button
        onClick={() => {
          setBattleBegun(true);
        }}>
        Begin battle!
      </button>
    );
  }
};
