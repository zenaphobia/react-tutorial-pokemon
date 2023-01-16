import logo from '../Assets/Logos/pokeball.svg'

function LoadingScreen() {
  return (
    <div className='d-flex container justify-content-center fade-in'>
        <div>
            <img src={logo} className='d-flex flex-column justify-content-center align-items-center flex-lg-grow-1 faded mb-3 py-3 loading' id='loading' alt="" />
            <p>Loading...</p>
        </div>
    </div>
  )
}

export default LoadingScreen;
