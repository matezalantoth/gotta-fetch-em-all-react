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
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mb-1 w-96 relative opacity-80'
          onClick={() => {
            setClickedLocation({ ...clickedLocation, clicked: false });
          }}>
          Return to the cities 🏙️
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
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mb-1 w-96 relative opacity-80'
          onClick={() => {
            setClickedLocation({ ...clickedLocation, clicked: false });
          }}>
          Return to the cities 🏙️
        </button>
        <h2>There does not appear to be any pokemon here</h2>
      </div>
    );
  }
  return <h2 className=' text-black'>Loading...</h2>;
};
