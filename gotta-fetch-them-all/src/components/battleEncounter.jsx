import { useEffect, useState } from 'react';
import { EndScreenRenderer } from './EndScreenRenderer';
import { BattleRenderer } from './BattleRenderer';
import { StatReadout } from './StatReadout';

export const BattleEncounter = (props) => {
  const {
    pokemons,
    selectedPokemon,
    enemyPokemon,
    setClickedLocation,
    setEnemyPokemon,
    setSelectedPokemon,
  } = props;
  const [playerTurn, setPlayerTurn] = useState(true);
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

  const health = Math.floor(
    (selectedPokemon.hp / selectedPokemon.uneditedHP) * 100,
  );
  const enemyHealth = Math.floor(
    (enemyPokemon.hp / enemyPokemon.uneditedHP) * 100,
  );

  const handleAttack = (attack) => {
    if (enemyPokemon && attack) {
      const damageDone =
        Math.floor(Math.random() * attack.accuracy) > 10
          ? Math.floor(
              calcDamage(selectedPokemon.dmg, enemyPokemon.def) +
                attack.power / 4,
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
                  4,
              )
            : 0;
      } else {
        damageDone = Math.floor(
          calcDamage(enemyPokemon.dmg, selectedPokemon.def) * 2,
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
    if (document.getElementById('enemyPokemonImage')) {
      document
        .getElementById('enemyPokemonImage')
        .classList.add('animate-shake');
      console.log(document.getElementById('enemyPokemonImage').classList);
      setTimeout(() => {
        setPlayerTurn(false);
        if (document.getElementById('enemyPokemonImage')) {
          document
            .getElementById('enemyPokemonImage')
            .classList.remove('animate-shake');
        }
      }, 2000);
    }
  }, [enemyPokemon]);

  if (selectedPokemon && enemyPokemon && battleBegun) {
    return !isPokemonDead.playerPokemonDead &&
      !isPokemonDead.enemyPokemonDead ? (
      <div>
        <BattleRenderer
          selectedPokemon={selectedPokemon}
          damageTaken={damageTaken}
          handleAttack={handleAttack}
          playerTurn={playerTurn}
          handleEnemyAttack={handleEnemyAttack}
          enemyPokemon={enemyPokemon}
          damageDealt={damageDealt}
        />
        <div className='fixed float-left bottom-6 bg-slate-300 p-5 rounded-xl border-4 border-slate-500 '>
          <StatReadout
            whichPokemon={true}
            selectedPokemon={selectedPokemon}
            enemyPokemon={enemyPokemon}
            health={health}
            enemyHealth={enemyHealth}
            damageTaken={damageTaken}
            handleAttack={handleAttack}
            playerTurn={playerTurn}
            handleEnemyAttack={handleEnemyAttack}
          />
        </div>
      </div>
    ) : (
      <EndScreenRenderer
        isPokemonDead={isPokemonDead}
        setClickedLocation={setClickedLocation}
        pokemons={pokemons}
        enemyPokemon={enemyPokemon}
        damageDealt={damageDealt}
      />
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
