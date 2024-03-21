import { useEffect, useState } from 'react';
import pokemon_logo from '../assets/pokemon_logo.jpg';

export const Locations = (props) => {
  const { setClickedLocation } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://pokeapi.co/api/v2/location');
      const data = await response.json();
      setData(data.results);
    }
    fetchData();
  }, []);

  return (
    <div className='inline-flex items-center self-center text-center'>
      {data ? (
        <div>
          <img className='scale-[0.3] absolute' src={pokemon_logo} alt='Logo' />
          <ul className='relative'>
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
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
