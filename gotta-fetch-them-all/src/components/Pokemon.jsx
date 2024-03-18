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
    <div>
      <img src={currentPokemon.sprites['front_default']}></img>
      <h2>{currentPokemon.name}</h2>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
};
