export const EndScreenRenderer = (props) => {
  const {
    isPokemonDead,
    setClickedLocation,
    pokemons,
    enemyPokemon,
    damageDealt,
  } = props;
  return isPokemonDead.playerPokemonDead ? (
    <div>
      <p className='text-white font-bold'>YOUR POKEMON IS DEAD 💀💀</p>

      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-1 w-96 relative opacity-80'
        onClick={() => {
          setClickedLocation({ url: null, name: null, clicked: false });
        }}
      >
        Return to the cities
      </button>
    </div>
  ) : (
    <div>
      <p className='  text-white font-bold '>YOU HAVE WON YIPPI 🏆🏆🔥🔥 </p>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-1 w-96 relative opacity-80'
        onClick={() => {
          pokemons.push(enemyPokemon);
          setClickedLocation({ url: null, name: null, clicked: false });
        }}
      >
        Catch the defeated pokemon 🔴
      </button>
      <div className='text-black relative mb-20'>
        {enemyPokemon.name}
        {' is dead'}
        <div className='inline-flex'>
          <p>💀💀</p>
          <p
            id='damageDealtIndicator'
            className={
              (damageDealt > 35
                ? 'text-red-900'
                : damageDealt > 15
                ? 'text-yellow-300'
                : 'text-blue-600') + ' ml-12 animate-shake fixed'
            }
            hidden
          >
            -{damageDealt}
          </p>
        </div>
        <img
          id='enemyPokemonImage'
          className='m-auto scale-115'
          src={enemyPokemon.sprites['other']['showdown']['front_default']}
        />
      </div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-1 w-96 relative opacity-80'
        onClick={() => {
          setClickedLocation({ url: null, name: null, clicked: false });
        }}
      >
        Return to the cities 🏙️
      </button>
    </div>
  );
};
