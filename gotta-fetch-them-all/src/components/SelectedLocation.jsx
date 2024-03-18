import { useEffect, useState } from 'react';
import { Pokemon } from './Pokemon';

let currentEncounter;

export const SelectedLocation = (props) => {
  const { clickedLocation, setClickedLocation, click } = props;
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
      <div>
        <button
          onClick={() => {
            setClickedLocation({ ...clickedLocation, clicked: false });
          }}
        >
          Leave
        </button>
        <Pokemon url={currentEncounter.pokemon.url} />
      </div>
    ) : (
      <div>
        <button
          onClick={() => {
            setClickedLocation({ ...clickedLocation, clicked: false });
          }}
        >
          Leave
        </button>
        <h2>There does not appear to be any pokemon here</h2>
      </div>
    );
  }
  return <h2>Loading...</h2>;
};
