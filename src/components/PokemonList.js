import Error from './Error';
import '../pokeCard.css';
import missing from '../Assets/Logos/pokeball.svg'
import LoadingScreen from './LoadingScreen';

function PokemonList({pokeDetails, isLoading}) {

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

  return (
    <div className="d-flex flex-row row w-100 fade-in">
        {pokeDetails.map(p => (
          <div key={p.id}className="col-lg-4 mb-3 flex-lg-grow-1">
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
  );



}

export default PokemonList;
