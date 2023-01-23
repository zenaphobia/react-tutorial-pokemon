function PokemonPopUp({selectedPokemon, onHide, show}) {

  if(!selectedPokemon){
    return null;
  }

  if(!show){
    return null;
  }


  return (
    <>
  <div className="modal fade-in show" id="PokemonCard" style={{display: 'block'}} aria-modal="true" role="dialog">
  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title text-uppercase fs-5" id="exampleModalCenteredScrollableTitle">{selectedPokemon[0].name}</h1>
        <button type="button" onClick={onHide} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="d-flex flex-column justify-content-center modal-body align-items-center">
        <img className="w-50" src={selectedPokemon[0].sprites.front_default} alt="" />
        <h3 className="text-center text-capitalize">{selectedPokemon[0].name}</h3>
      </div>
      <div className="modal-footer">
        <button type="button" onClick={onHide} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<div class="modal-backdrop fade show"></div>
    </>
  )
}

export default PokemonPopUp;
