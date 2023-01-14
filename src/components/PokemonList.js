import { useEffect, useState } from 'react';
import Error from './Error';
import '../pokeCard.css';

function PokemonList({pokeDetails,singlePokemon, isSingle}) {

  const [details, setDetails] = useState([]);
  const [ singlePoke, setSinglePoke ] = useState(singlePokemon);

  useEffect(()=> {
    setDetails([]);
    setDetails(pokeDetails);
    // console.log(`details object is ${details.length}`);
    // console.log(`isSingle variable is ${isSingle}`);
  },[pokeDetails])

  useEffect(()=> {
    setSinglePoke(null);
    setSinglePoke(singlePokemon);
  },[singlePokemon])

  if(!details && !singlePoke){
    return(
      <Error/>
    )
  }

  if(isSingle){
    return(
      <div className="fw justify-content-center">
          <div className="d-flex mb-3 justify-content-center">
            <div className="item single">
              <a href={"https://pokeapi.co/api/v2/pokemon/"+singlePoke.id} key={singlePoke.id}>
                <div className="image-container">
                  <img src={singlePoke.sprites.front_default} alt="" />
                </div>
                <div className="text-container">
                  <h1 key={singlePoke.name}>{singlePoke.name}</h1>
                </div>
              </a>
            </div>
          </div>
      </div>
    )
  }

  return (
    <div className="row">
        {details.map(p => (
          <div className="col-md-3 mb-3">
            <div className="item">
              <a href={"https://pokeapi.co/api/v2/pokemon/"+p.id} key={p.id}>
                <div className="image-container">
                  <img key={p.sprites.front_default}src={p.sprites.front_default} alt="" />
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
