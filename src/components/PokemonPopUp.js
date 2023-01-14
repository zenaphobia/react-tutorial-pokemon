function PokemonPopUp({selectedPokemon}) {
  return (
    <div className='modal-container'>
      <div className='modal-header'>
        <h1>{selectedPokemon.name}</h1>
      </div>
      <div className="modal-body">
        <p>
            {selectedPokemon.descripion}
        </p>
      </div>
    </div>
  )
}

export default PokemonPopUp
