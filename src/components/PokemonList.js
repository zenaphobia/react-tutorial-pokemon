import axios from "axios";
import { useState, useEffect } from "react";
import '../pokeCard.css';

function PokemonList({ pokemon, loading }) {

  const [details, setDetails] = useState([]);

  useEffect(()=> {
    pokemon.map(p => {
      return axios.get(p.url).then(res => {
        setDetails(prev => {
          return [...prev, res.data]
        });
      })
    })
  },[pokemon])

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
