import logo from '../Assets/Logos/pokeball.svg'

function LoadingScreen() {
  return (
    <div className='d-flex container justify-content-center fade-in'>
        <div className='faded'>
            <img src={logo} className='d-flex flex-column justify-content-center align-items-center flex-lg-grow-1 py-3 loading m-0 p-0' id='loading' alt="" />
            <p className=' m-0 p-0'>Loading...</p>
        </div>
    </div>
  )
}

export default LoadingScreen;
