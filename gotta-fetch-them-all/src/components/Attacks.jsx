import { useEffect, useState } from 'react';

export const Attacks = (props) => {
  const {
    selectedPokemon,
    currentAttackURL,
    setCurrentAttackURL,
    setCurrentAttack,
    damageTaken,
    handleAttack,
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
      <h2>{`Your pokemon was dealt ${damageTaken}DMG!`}</h2>
      {selectedPokemon.abilities.map((ability, i) => {
        ability = ability.ability;
        return (
          <button
            className='mr-2 py-2 px-4 rounded-full bg-slate-600 '
            id={ability.url}
            key={i}
            onClick={() => {
              setCurrentAttackURL(ability.url);
              handleAttack();
            }}>
            {ability.name}
          </button>
        );
      })}
    </>
  );
};
