import logo from '../Assets/Logos/pokeball.svg';

function NavBar() {
  return (
    <div className="container d-flex justify-content-center">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
            <img src={logo} height="100" alt="poke-logo" className='mr logo'/>
            <span className='bold large'>Poke·</span>
            <span className='light large'>Finder</span>
        </a>
      </header>
    </div>
  )
}

export default NavBar
