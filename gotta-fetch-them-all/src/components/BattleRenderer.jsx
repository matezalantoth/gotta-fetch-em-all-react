import { Attacks } from './Attacks';

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
                }
              >
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
                hidden
              >
                -{damageTaken}
              </p>
            </div>
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
              }
            >
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
              hidden
            >
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
  );
};
