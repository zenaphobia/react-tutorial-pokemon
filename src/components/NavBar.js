import logo from '../Assets/Logos/logo.svg';

function NavBar() {
  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-spaced-around py-3 mb-4 border-bottom">
        <a href="#" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
            <img src={logo} width="40" alt="" className='mr'/>
            <span className='bold'>Poke·</span>
            <span className='light'>Finder</span>
        </a>
        <ul className="nav nav-pills">
            <li className="nav-item">
                <a href="#" className="nav-link active">Home</a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link">Home</a>
            </li>
        </ul>
      </header>
    </div>
  )
}

export default NavBar
