import { useEffect } from 'react';

export const Attacks = (props) => {
  const {
    selectedPokemon,
    currentAttackURL,
    setCurrentAttackURL,
    setCurrentAttack,
    damageTaken,
    handleAttack,
    playerTurn,
    handleEnemyAttack,
  } = props;

  useEffect(() => {
    const fetchAttackData = async () => {
      const response = await fetch(currentAttackURL);
      const data = await response.json();
      setCurrentAttack(data);
    };

    fetchAttackData();
  }, [currentAttackURL]);
  return (
    <>
      <h2 id='damageText'>{`Your pokemon was dealt ${damageTaken}DMG!`}</h2>
      {playerTurn ? (
        selectedPokemon.abilities.map((ability, i) => {
          ability = ability.ability;
          return (
            <button
              className='mr-2 py-2 px-4 rounded-full bg-slate-600 disabled:bg-slate-400 '
              id={ability.url}
              key={i}
              onClick={(event) => {
                setCurrentAttackURL(ability.url);
                handleAttack();
                event.target.disabled = true;
                setTimeout(() => {
                  event.target.disabled = false;
                }, 2000);
              }}
            >
              {ability.name}
            </button>
          );
        })
      ) : (
        <div>
          <h2>{handleEnemyAttack()}</h2>
        </div>
      )}
    </>
  );
};
