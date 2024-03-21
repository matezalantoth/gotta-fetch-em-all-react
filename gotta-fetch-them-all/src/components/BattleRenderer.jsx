import { PokemonBox } from './PokemonBox';

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
        <div className='text-black relative mb-20'>
          <img
            id='enemyPokemonImage'
            className='m-auto scale-115'
            src={enemyPokemon.sprites['other']['showdown']['front_default']}
          />
        </div>
      </div>
      <PokemonBox
        selectedPokemon={selectedPokemon}
        damageTaken={damageTaken}
        damageDealt={damageDealt}
        handleAttack={handleAttack}
        playerTurn={playerTurn}
        handleEnemyAttack={handleEnemyAttack}
        enemyPokemon={enemyPokemon}
      />
    </div>
  );
};
