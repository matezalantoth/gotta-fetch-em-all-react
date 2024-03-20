import { useEffect, useState } from 'react';

export const Pokemon = (props) => {
  const { url } = props;
  const [currentPokemon, setCurrentPokemon] = useState(null);
  useEffect(() => {
    const fetchCurrentPokemon = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setCurrentPokemon(data);
    };
    fetchCurrentPokemon();
  }, []);

  return currentPokemon ? (
    <div className='relative top-48'>
      <img className='m-auto' src={currentPokemon.sprites['front_default']} />
      <p>{currentPokemon.name}</p>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
};
