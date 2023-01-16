import { useEffect, useState } from 'react';
import Error from './Error';
import '../pokeCard.css';
import missing from '../Assets/Logos/pokeball.svg'

function PokemonList({pokeDetails, loading}) {

  useEffect(()=> {
    if(pokeDetails.length > 30){
      pokeDetails.length = 30;
    }

  },[pokeDetails])

  if(!pokeDetails || pokeDetails.length === 0){
    return(
      <Error/>
    )
  }

  if(loading){
    return(
      <div>
        <p>loading...</p>
      </div>
    )
  }

  return (
    <div className="d-flex flex-row row w-100 fade-in">
        {pokeDetails.map(p => (
          <div key={p.id}className="col-lg-4 mb-3 flex-lg-grow-1">
            <div key={p.id}className="item">
              <a href={"https://pokeapi.co/api/v2/pokemon/"+p.id} key={p.id}>
                <div className="image-container">
                  <img key={p.sprites.front_default}src={p.sprites.front_default ? p.sprites.front_default : missing} className={p.sprites.front_default ? '' : 'faded mb-3 py-3'} alt="" />
                </div>
                <div className="text-container">
                  <h1 key={p.name}>{p.name}</h1>
                </div>
              </a>
            </div>
          </div>
        ))}
    </div>
  );



}

export default PokemonList;
