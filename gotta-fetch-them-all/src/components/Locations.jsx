import { useEffect, useState } from 'react';
import { SelectedLocation } from './SelectedLocation';
import { usePokemons } from './usePokemons';

export const Locations = () => {
  const [data, setData] = useState(null);
  const [clickedLocation, setClickedLocation] = useState({
    url: null,
    name: null,
    clicked: false,
  });
  const { pokemons, setPokemons } = usePokemons();
  console.log(pokemons);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://pokeapi.co/api/v2/location');
      const data = await response.json();
      setData(data.results);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!clickedLocation.clicked) {
      document.querySelector('body').className =
        'bg-locationsPage bg-no-repeat bg-center';
    }
  }, [clickedLocation]);
  return (
    <div className='inline-flex items-center self-center text-center'>
      {data && pokemons ? (
        clickedLocation.clicked ? (
          <SelectedLocation
            pokemons={pokemons}
            setPokemons={setPokemons}
            clickedLocation={clickedLocation}
            setClickedLocation={setClickedLocation}
            click={true}
          />
        ) : (
          <ul className='relative'>
            <img src='../assets/pokemonLogo.jpg' alt='Picture not found' />
            {data.map((item, i) => {
              const nameSplitOnSpace = item.name.split('-');
              const firstWord =
                nameSplitOnSpace[0].split('')[0].toUpperCase() +
                nameSplitOnSpace[0].slice(1, nameSplitOnSpace[0].length);
              const secondWord =
                nameSplitOnSpace[1].split('')[0].toUpperCase() +
                nameSplitOnSpace[1].slice(1, nameSplitOnSpace[1].length);

              return (
                <li
                  key={i}
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-1 w-96 relative opacity-80'
                  onClick={() => {
                    setClickedLocation({
                      url: item.url,
                      name: item.name,
                      clicked: true,
                    });
                  }}
                >
                  {firstWord + ' ' + secondWord}
                </li>
              );
            })}
          </ul>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
