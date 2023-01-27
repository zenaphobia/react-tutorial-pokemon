function PokemonPopUp({selectedPokemon, onHide, show}) {

  console.log(selectedPokemon)

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
        <h1 className="title modal-title text-uppercase fs-5" id="exampleModalCenteredScrollableTitle">{selectedPokemon[0].name}</h1>
        <button type="button" onClick={onHide} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="d-flex flex-column justify-content-center modal-body align-items-center">
        <img className="w-50" src={selectedPokemon[0].sprites.front_default} alt="" />
        <h3 className="text-center text-capitalize">{selectedPokemon[0].name}</h3>
        <div className="d-flex w-100 flex-row p-3" style={{backgroundColor: '#ededed'}}>
          <div className="d-flex flex-column col-sm-6 overflow-y-auto w-50 align-items-center" style={{height: '200px'}}>
            <div className="d-flex header-section w-100 justify-content-center">
              <h4 className="text-align-center">{selectedPokemon[0].moves[0] ? 'Moves' : 'No Available Moves' }</h4>
            </div>
            <ul>{selectedPokemon[0].moves.map(p=>(
              <li className="text-capitalize text-align-center">{p.move.name}</li>
            ))}</ul>
          </div>
          <div className="d-flex flex-column col-sm-6 overflow-y-auto w-50 align-items-center">
          <h4 className="text-align-center text-capitalize">{selectedPokemon[0].moves[0] ? 'Stats' : 'No Available Stats' }</h4>
            <ul className="text-capitalize">{selectedPokemon[0].stats.map(p=>(
              <li><span className="bold">{p.stat.name}</span>: {p.base_stat}</li>
            ))}</ul>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" onClick={onHide} className="light" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<div className="modal-backdrop fade show"></div>
    </>
  )
}

export default PokemonPopUp;
