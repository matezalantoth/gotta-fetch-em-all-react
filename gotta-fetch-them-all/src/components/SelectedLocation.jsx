import { useEffect, useState } from 'react';
import { MyPokemons } from './MyPokemons';

let currentEncounter;

export const SelectedLocation = (props) => {
  document.querySelector('body').className =
    'bg-battlePage bg-no-repeat  bg-cover w-full h-screen';

  const { pokemons, clickedLocation, setClickedLocation, click, setPokemons } =
    props;
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      const url = await fetchLocationAreaData();
      const response = await fetch(url);
      const data = await response.json();
      setLocationData(data);
    };
    const fetchLocationAreaData = async () => {
      const response = await fetch(clickedLocation.url);
      const data = await response.json();
      return data.areas[0].url;
    };
    fetchLocationData();
  }, []);

  if (locationData) {
    const pokemonEncounters = locationData['pokemon_encounters'];
    if (click) {
      currentEncounter =
        pokemonEncounters[Math.floor(Math.random() * pokemonEncounters.length)];
    }

    return pokemonEncounters.length > 0 ? (
      <div className=' text-black'>
        <button
          onClick={() => {
            setClickedLocation({ ...clickedLocation, clicked: false });
          }}>
          Leave
        </button>
        <MyPokemons
          setPokemons={setPokemons}
          pokemons={pokemons}
          url={currentEncounter.pokemon.url}
          setClickedLocation={setClickedLocation}
        />
      </div>
    ) : (
      <div className=' text-black'>
        <button
          onClick={() => {
            setClickedLocation({ ...clickedLocation, clicked: false });
          }}>
          Leave
        </button>
        <h2>There does not appear to be any pokemon here</h2>
      </div>
    );
  }
  return <h2 className=' text-black'>Loading...</h2>;
};
