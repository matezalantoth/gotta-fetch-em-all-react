import { useEffect, useState } from 'react';
import { EndScreenRenderer } from './EndScreenRenderer';
import { BattleRenderer } from './BattleRenderer';

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
      // document.getElementById('damageDealtIndicator').hidden = false;
    }

    if (document.getElementById('enemyPokemonImage')) {
      document
        .getElementById('enemyPokemonImage')
        .classList.add('animate-shake');
      setTimeout(() => {
        // document.getElementById('damageDealtIndicator').hidden = true;
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
      <BattleRenderer
        selectedPokemon={selectedPokemon}
        damageTaken={damageTaken}
        handleAttack={handleAttack}
        playerTurn={playerTurn}
        handleEnemyAttack={handleEnemyAttack}
        enemyPokemon={enemyPokemon}
        damageDealt={damageDealt}
      />
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
        }}>
        Begin battle!
      </button>
    );
  }
};
