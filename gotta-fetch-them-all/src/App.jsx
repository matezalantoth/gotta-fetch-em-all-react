import { useEffect, useState } from 'react';
import './App.css';
import { Locations } from './components/Locations';
import { usePokemons } from './components/usePokemons';
import { SelectedLocation } from './components/SelectedLocation';
function App() {
  const [clickedLocation, setClickedLocation] = useState({
    url: null,
    name: null,
    clicked: false,
  });
  const { pokemons, setPokemons } = usePokemons();

  useEffect(() => {
    if (!clickedLocation.clicked) {
      document.querySelector('body').className =
        'bg-locationsPage bg-no-repeat bg-center';
    }
  }, [clickedLocation]);

  return clickedLocation.clicked ? (
    <SelectedLocation
      pokemons={pokemons}
      setPokemons={setPokemons}
      clickedLocation={clickedLocation}
      setClickedLocation={setClickedLocation}
      click={true}
    />
  ) : (
    <>
      <Locations setClickedLocation={setClickedLocation} />
    </>
  );
}

export default App;
