import { useState, useEffect, useRef } from 'react';
import PokemonList from './components/PokemonList';
import axios from 'axios';
import './styles.css';
import Pagination from './components/Pagination'
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [ pokemon, setPokemon ] = useState([]);
  const [ details, setDetails ] = useState([]);
  const [ pokeList, setPokeList ] = useState([]);
  const inputRef = useRef();
  const [ currentPageUrl, setCurrentPageUrl ] = useState("https://pokeapi.co/api/v2/pokemon?limit=300000000&offset=0");
  const [ nextPageUrl, setNextPageUrl ] = useState();
  const [ prevPageUrl, setPrevPageUrl ] = useState();
  const [ loading, setLoading ] = useState(true);
  const [ query, setQuery ] = useState("");
  // const [ filteredPokemon, setFilteredPokemon ] = useState([]);

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

  // useEffect(()=>{
  //   async function fetchData(url){
  //     const response = await axios.get(url);
  //     const results = response.data.results;
  //     setPokeList(results);
  //     setLoading(false);
  //   }
  //   fetchData('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
  // },[])

  // useEffect(()=> {

  //   async function upateDetails(list){
  //     setLoading(true);
  //     const promise = list.map(p=>{axios.get(p.url)});
  //     console.log(promise)
  //     const responses = await Promise.all(promise);
  //     console.log(responses);
  //   }

  //   if(query.length === 0 ){
  //     setFilteredPokemon(details);
  //   }
  //   else{
  //     var list = filterPokemon();
  //     if(!list){
  //       setFilteredPokemon(details);
  //     }
  //     console.log(list);

  //     //return empty array if pokemon doesn't exist
  //     if(!list._pFilter){
  //       setFilteredPokemon([]);
  //     }

  //     //return pokemon if already cached...
  //     if(list._dFilter.length > 0 && list._dFilter.length === list._pFilter.length){
  //       setFilteredPokemon(list._dFilter);
  //     }
  //     else{
  //       const _list = list._mFilter.splice(30, list._mFilter.length);
  //       console.log("entering download...");
  //       console.log(_list);
  //       upateDetails(_list);
  //       setLoading(false)
  //     }
  //   }

  // },[query, details])

  // var filteredPokemon = () =>{
  //   if(query.length === 0){
  //     return details;
  //   }

  //   const list = filterPokemon();

  //   if(!list._pFilter){
  //     return list._dFilter;
  //   }
  //   if(list._dFilter){
  //     return list._dFilter;
  //   }

  //   upDateDetails(list._mFilter);
  //   console.log(details);

  // }


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
          <div className='d-flex justify-content-center align-items-center'>
          </div>
        </form>
      </div>
      <PokemonList pokeDetails={filteredPokemon} isLoading={loading} className="container"/>
      {/* <LoadingScreen/> */}
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
