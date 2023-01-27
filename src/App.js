import { useState, useEffect, useRef } from 'react';
import PokemonList from './components/PokemonList';
import axios from 'axios';
import './styles.css';
import LoadingScreen from './components/LoadingScreen';
import FILTERS_ARRAY from './constants/FilterTypeConstants';
import UserFilter from './components/UserFilter';
import PokemonPopUp from './components/PokemonPopUp';

function App() {
  const [ pokemon, setPokemon ] = useState([]);
  const [ details, setDetails ] = useState([]);
  const [ pokeList, setPokeList ] = useState([]); //can probably get deleted
  const inputRef = useRef();
  const [ currentPageUrl, setCurrentPageUrl ] = useState("https://pokeapi.co/api/v2/pokemon?limit=300000000&offset=0");
  const [ nextPageUrl, setNextPageUrl ] = useState();
  const [ prevPageUrl, setPrevPageUrl ] = useState();
  const [ loading, setLoading ] = useState(true);
  const [ query, setQuery ] = useState("");
  const [ userFilter, setUserFilter ] = useState("");
  const [ selectedPokemon, setSelectedPokemon ] = useState(null);

  useEffect(() => {
    console.log("Fetching inital Pokemon list...");
    setLoading(true);
    let cancel;
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setPokemon(res.data.results);
    })

    return () => cancel();

  },[currentPageUrl])

  useEffect(() => {
    if (pokemon.length) {
      console.log("Loading Pokemon details...");
        async function fetchData() {
            const fetchPromises = pokemon.map(p => axios.get(p.url));
            const responses = await Promise.all(fetchPromises);
            setDetails(responses.map(res => res.data));
            setLoading(false);
        }
        fetchData();
    }
  }, [pokemon]);

  function filterPokemon(){

    //returns an array of a single data object; _dFilter is the cached data in the details state, _pFilter is the data in the pokeList state.
    //_mFilter is the set of data that is the (pokeList - details) data, can be used to find what's needed to be downloaded...

    const _dFilter = details.filter(p => {
      return p.name.toLowerCase().includes(query.toLowerCase());
    });
    const _pFilter = pokeList.filter(p => {
      return p.name.toLowerCase().includes(query.toLowerCase());
    });
    const _mFilter = _pFilter.filter(p => !_dFilter.some( d => d.name === p.name));

    return {_dFilter, _pFilter, _mFilter}
  }


  const filteredPokemon = details.filter(p => {
    return p.name.toLowerCase().includes(query.toLowerCase());
  }).splice(0,30);

  const filteredPokemonTest = details.filter(p => {
    return p.name.toLowerCase().includes(query.toLowerCase()) && p.types[0].type.name === userFilter;
  }).splice(0,30);

  const filteredPokemonForEach = details.filter(p => {
    return p.name.toLowerCase().includes(query.toLowerCase()) && p.types.some(poke => poke.type.name === userFilter);
  }).splice(0,30);

  const selectedPokemonFilter = details.some(p => p.id === selectedPokemon);

  function goToNextPage() {
    if(!pokemon && !details){
      console.log("Error no pages");
    }
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    if(!pokemon && !details){
      console.log("Error no pages");
    }
    setCurrentPageUrl(prevPageUrl);
  }

  function onSubmit(e){
    e.preventDefault();
  }

  if(loading){
    return(
      <LoadingScreen/>
    )
  }

  return (
    <div className='d-flex flex-column container justify-content-center align-items-center container-item' >
      <div className="d-flex align-items-center justify-content-center mb-3">
        <form className="w-100 d-flex flex-direction-row justify-content-center" role="search">
          <input value={query} onSubmit={e => {onSubmit(e)}} onChange={e => setQuery(e.target.value)} type="search" ref={inputRef} className="form-control mr" placeholder='Search Pokemon by name...'/>
        </form>
      </div>
      <div className='d-flex justify-content-center align-items-center py-3'>
            <UserFilter filters={FILTERS_ARRAY} setUserFilter={setUserFilter}/>
      </div>
      <PokemonList pokeDetails={userFilter ? filteredPokemonForEach : filteredPokemon} isLoading={loading} className="container"/>
    </div>
  );
}

export default App;
