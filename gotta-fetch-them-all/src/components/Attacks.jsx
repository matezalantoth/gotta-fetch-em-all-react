export const Attacks = (props) => {
  const {
    selectedPokemon,
    damageTaken,
    handleAttack,
    playerTurn,
    handleEnemyAttack,
  } = props;
  return selectedPokemon.abilities ? (
    <>
      <h2 id='damageText'>{`Your pokemon was dealt ${damageTaken}DMG!`}</h2>
      {playerTurn ? (
        selectedPokemon.abilities.map((ability, i) => {
          return (
            <button
              className='mr-2 py-2 px-4 rounded-full bg-white disabled:bg-slate-400 hover:bg-slate-400 '
              id='attackButton'
              key={i}
              onClick={(event) => {
                handleAttack(
                  selectedPokemon.abilities.find(
                    (ability) => ability.name === event.target.innerText,
                  ),
                );

                document.querySelectorAll('#attackButton').forEach((elem) => {
                  elem.disabled = true;
                });
                setTimeout(() => {
                  document.querySelectorAll('#attackButton').forEach((elem) => {
                    elem.disabled = false;
                  });
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
  ) : (
    <h2>Loading...</h2>
  );
};
