import { Attacks } from './Attacks';

export const PokemonBox = (props) => {
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
    <div className='inline-flex  float-right fixed w-full'>
      <div className='relative float-right'>
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
        <Attacks
          selectedPokemon={selectedPokemon}
          damageTaken={damageTaken}
          damageDealt={damageDealt}
          handleAttack={handleAttack}
          playerTurn={playerTurn}
          handleEnemyAttack={handleEnemyAttack}
        />
      </div>
      {/* <div className='inline-flex'>
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
      </div> */}
    </div>
  );
};
