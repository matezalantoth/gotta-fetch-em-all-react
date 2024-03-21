import { StatReadout } from './StatReadout';

export const BattleRenderer = (props) => {
  const {
    selectedPokemon,
    damageTaken,
    damageDealt,
    handleAttack,
    playerTurn,
    handleEnemyAttack,
    enemyPokemon,
  } = props;

  const health = Math.floor(
    (selectedPokemon.hp / selectedPokemon.uneditedHP) * 100,
  );
  const enemyHealth = Math.floor(
    (enemyPokemon.hp / enemyPokemon.uneditedHP) * 100,
  );

  return (
    <div>
      <div className='inline-flex pt-11'>
        <div id='selectedPokemon'>
          <div className='mt-5'>
            <img
              id='selectedPokemonImage'
              className='items-center m-auto scale-115 '
              src={selectedPokemon.sprites['other']['showdown']['back_default']}
            />
          </div>
        </div>

        <div className='text-black relative left-48 bottom-24'>
          <StatReadout
            whichPokemon={false}
            selectedPokemon={selectedPokemon}
            enemyPokemon={enemyPokemon}
            health={health}
            enemyHealth={enemyHealth}
            damageTaken={damageTaken}
            damageDealt={damageDealt}
            handleAttack={handleAttack}
            playerTurn={playerTurn}
            handleEnemyAttack={handleEnemyAttack}
          />
          <img
            id='enemyPokemonImage'
            className='scale-115 m-auto'
            src={enemyPokemon.sprites['other']['showdown']['front_default']}
          />
        </div>
      </div>
    </div>
  );
};
