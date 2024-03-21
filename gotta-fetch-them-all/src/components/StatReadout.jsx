import { Attacks } from './Attacks';

export const StatReadout = (props) => {
  const {
    selectedPokemon,
    enemyPokemon,
    health,
    enemyHealth,
    whichPokemon,
    damageTaken,
    handleAttack,
    playerTurn,
    handleEnemyAttack,
  } = props;

  return whichPokemon ? (
    <div>
      {selectedPokemon.name}{' '}
      <div className='relative mb-1 m-auto w-100 bg-gray-200 rounded-full h-4 dark:bg-gray-700'>
        <div
          className={
            'relative h-4 rounded-full ' +
            (health > 50
              ? 'bg-green-500'
              : health > 25
              ? 'bg-yellow-300'
              : 'bg-red-600')
          }
          style={{ width: `${health}%` }}
        ></div>
        <p className='relative bottom-4 float-right mr-3 text-xs text-white'>
          {selectedPokemon.hp}/{selectedPokemon.uneditedHP}
        </p>
      </div>
      <div>
        <Attacks
          selectedPokemon={selectedPokemon}
          damageTaken={damageTaken}
          handleAttack={handleAttack}
          playerTurn={playerTurn}
          handleEnemyAttack={handleEnemyAttack}
        />
      </div>
    </div>
  ) : (
    <div>
      {enemyPokemon.name}{' '}
      <div className='relative mb-1 m-auto w-[100px] bg-gray-200 rounded-full h-4 dark:bg-gray-700'>
        <div
          className={
            'relative h-4 rounded-full text-xs text-white block ' +
            (health > 50
              ? 'bg-red-600'
              : health > 25
              ? 'bg-yellow-300'
              : 'bg-green-500')
          }
          style={{ width: `${enemyHealth}%` }}
        >
          {enemyPokemon.hp}/{enemyPokemon.uneditedHP}
        </div>
      </div>
    </div>
  );
};
