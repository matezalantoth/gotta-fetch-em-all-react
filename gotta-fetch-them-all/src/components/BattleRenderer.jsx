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
          <div className='mt-5 relative right-full'>
            <img
              id='selectedPokemonImage'
              className='relative top-20 transform scale-200'
              src={selectedPokemon.sprites['other']['showdown']['back_default']}
            />
          </div>
        </div>

        <div className='text-black relative bottom-24 left-12'>
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
            className='m-auto transform scale-200'
            src={enemyPokemon.sprites['other']['showdown']['front_default']}
          />
        </div>
      </div>
    </div>
  );
};
