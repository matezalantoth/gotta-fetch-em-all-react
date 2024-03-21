export const MyPokemonsRenderer = (props) => {
  const { enemyPokemon, pokemons, setSelectedPokemon } = props;
  return (
    <div>
      <div className='relative mb-20'>
        <img className='m-auto' src={enemyPokemon.sprites['front_default']} />
        <p>{enemyPokemon.name}</p>
      </div>
      Please choose your pokemon <br />
      <div className='inline-flex'>
        {pokemons.map((pokemon, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                setSelectedPokemon({
                  name:
                    pokemon.name[0].toUpperCase() +
                    pokemon.name.slice(1, pokemon.name.length),
                  sprites: pokemon.sprites,
                  abilities: pokemon.moveSet,
                  hp: pokemon.uneditedHP
                    ? pokemon.uneditedHP
                    : pokemon.stats[0]['base_stat'],
                  dmg: pokemon.dmg
                    ? pokemon.dmg
                    : pokemon.stats[1]['base_stat'],
                  def: pokemon.def
                    ? pokemon.def
                    : pokemon.stats[2]['base_stat'],
                  uneditedHP: pokemon.uneditedHP
                    ? pokemon.uneditedHP
                    : pokemon.stats[0]['base_stat'],
                });
              }}
              className='transition ease-in delay-75 hover:scale-110 text-black font-bold mb-1 py-2  items-center justify-items-center'
            >
              <p>{pokemon.name}</p>
              <img src={pokemon.sprites['front_default']} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
