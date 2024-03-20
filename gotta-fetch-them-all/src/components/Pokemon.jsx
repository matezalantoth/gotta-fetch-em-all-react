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
    <div className=' text-white font-bold mb-1 py-2  opacity-80 items-center justify-items-center '>
      <img src={currentPokemon.sprites['front_default']} />
      <p>{currentPokemon.name}</p>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
};
