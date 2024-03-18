import { useEffect, useState } from 'react';
import { SelectedLocation } from './SelectedLocation';

export const Locations = () => {
  const [data, setData] = useState(null);
  const [clickedLocation, setClickedLocation] = useState({
    url: null,
    name: null,
    clicked: false,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://pokeapi.co/api/v2/location');
      const data = await response.json();
      setData(data.results);
    }
    fetchData();
  }, []);
  console.log(clickedLocation);
  return (
    <div>
      {data ? (
        clickedLocation.clicked ? (
          <SelectedLocation
            clickedLocation={clickedLocation}
            setClickedLocation={setClickedLocation}
            click={true}
          />
        ) : (
          <ul>
            {data.map((item, i) => (
              <li
                key={i}
                onClick={() => {
                  setClickedLocation({
                    url: item.url,
                    name: item.name,
                    clicked: true,
                  });
                }}
              >
                {item.name.split('-').join(' ')}
              </li>
            ))}
          </ul>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
