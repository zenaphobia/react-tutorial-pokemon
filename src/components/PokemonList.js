import Error from './Error';
import '../pokeCard.css';
import missing from '../Assets/Logos/pokeball.svg'
import LoadingScreen from './LoadingScreen';
import PokemonPopUp from './PokemonPopUp';
import { useState } from 'react';

function PokemonList({pokeDetails, isLoading}) {

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showModal, setShowModal] = useState(false);

  if(isLoading){
    return(
      <LoadingScreen/>
    )
  }

  if(!pokeDetails || pokeDetails.length === 0){
    return(
      <Error/>
    )
  }

  function filterSelectedPokemon(PokeId){
    const poke = pokeDetails.filter(p=> p.id === PokeId)
    setSelectedPokemon(poke);
    setShowModal(()=>{setShowModal(!showModal)});
  }

  //p.types.some(poke => poke.type.name === userFilter);

  return (
  <div>
    <div className="d-flex flex-row row w-100 fade-in">
        {pokeDetails.map(p => (
          <div  onClick={()=>{filterSelectedPokemon(p.id)}} id={p.id} key={p.id}className="col-lg-4 mb-3 flex-lg-grow-1">
            <div key={p.id}className="item">
                <div className="image-container">
                  <img key={p.sprites.front_default}src={p.sprites.front_default ? p.sprites.front_default : missing} loading ="lazy" className={p.sprites.front_default ? '' : 'faded-all mb-3 py-3'} alt="" />
                </div>
                <div className="text-container">
                  <h1 key={p.name}>{p.name}</h1>
                </div>
            </div>
          </div>
        ))}
    </div>
    <PokemonPopUp selectedPokemon={selectedPokemon} show={showModal} onHide={()=>{setShowModal(false)}}/>
  </div>
  );



}

export default PokemonList;
