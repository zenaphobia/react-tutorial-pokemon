import { useState, useEffect, useRef } from 'react';
import PokemonList from './components/PokemonList';
import axios from 'axios';
import './styles.css';
import Pagination from './components/Pagination'

function App() {
  const [ pokemon, setPokemon ] = useState([]);
  const [ details, setDetails ] = useState([]);
  const [ singlePokemon, setSinglePokemon ] = useState({});
  const inputRef = useRef();
  const [ currentPageUrl, setCurrentPageUrl ] = useState("https://pokeapi.co/api/v2/pokemon");
  const [ nextPageUrl, setNextPageUrl ] = useState();
  const [ prevPageUrl, setPrevPageUrl ] = useState();
  const [ loading, setLoading ] = useState(true);
  const [ isSingle, setIsSingle ] = useState(false);

  useEffect(() => {
    console.log("Fetching inital Pokemon list...");
    if(!currentPageUrl){
      setNextPageUrl(null);
      setPrevPageUrl(null);
      return;
    }
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
    console.log(pokemon);
    if (pokemon && pokemon.length) {
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
    setLoading(true);
    e.preventDefault();
    const value = inputRef.current.value;
    let data;

    if(value === '' || !value){
      setLoading(false);
      return;
    }

    axios.get('https://pokeapi.co/api/v2/pokemon/'+value).then(res => {
    data = res.data;
      setIsSingle(true);
      setSinglePokemon(data);
      setLoading(false);
    })
    .catch((error)=>{
      if(error.response.status === 404){
        console.log("No pokemon found...");
        setDetails(null);
        setSinglePokemon(null);
        setCurrentPageUrl(null);
        setLoading(false);
      }
    })
    inputRef.current.value = '';

  }

  function resetComponent(){
    setPokemon(null);
    setDetails(null);
    setSinglePokemon(null);
    setIsSingle(false);
    setCurrentPageUrl('');
    setTimeout(()=>setCurrentPageUrl('https://pokeapi.co/api/v2/pokemon'),0);
    console.log(pokemon);
    console.log(details);
  }

  if(loading){
    return(
      <div className="d-flex justify-content-center align-items-center loading" style={{opacity: 1}}>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className='d-flex flex-column container justify-content-center align-items-center container-item' >
      <div className="d-flex align-items-center justify-content-center mb-3">
        <form onSubmit={onSubmit} className="w-100 d-flex flex-direction-row justify-content-center" role="search">
          <input type="search" ref={inputRef} className="form-control mr" placeholder='Search Pokemon by name...'/>
          <div className='d-flex justify-content-center align-items-center'>
            <button className='mr' type='submit'>Search</button>
            <button type='button' onClick={()=>resetComponent()}>Reset</button>
          </div>
        </form>
      </div>
      <PokemonList pokeDetails={details} singlePokemon={singlePokemon} isSingle={isSingle} className="container"/>
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
