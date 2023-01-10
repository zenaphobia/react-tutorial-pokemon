import { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList';
import axios from 'axios';
import './styles.css';
import Pagination from './components/Pagination'

function App() {
  const [ pokemon, setPokemon ] = useState([]);
  const [ currentPageUrl, setCurrentPageUrl ] = useState("https://pokeapi.co/api/v2/pokemon");
  const [ nextPageUrl, setNextPageUrl ] = useState();
  const [ prevPageUrl, setPrevPageUrl ] = useState();
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;

    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false);
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setPokemon(res.data.results);
    });

    return () => cancel();

  },[currentPageUrl])

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if(loading){
    return(
      <div className="d-flex justify-content-center align-items-center loading" style={{opacity: 0}}>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className='d-flex flex-column container justify-content-center align-items-center container-item' >
      <div className="d-flex w-50 align-items-center justify-content-center mb-3">
        <form className="w-100" role="search">
          <input type="search" className="form-control" placeholder='Type Pokemon Name...'/>
        </form>
      </div>
      <PokemonList pokemon={pokemon} loading={loading} className="container"/>
      <footer className="d-flex w-100 py-3 my-3 br-5">
        <Pagination className="d-flex align-items-center justify-content center"
            goToNextPage = {nextPageUrl ? goToNextPage: null}
            goToPrevPage = {prevPageUrl ? goToPrevPage : null}
          />
      </footer>
    </div>
  );
}

export default App;
