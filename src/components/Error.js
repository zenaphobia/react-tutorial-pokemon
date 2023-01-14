import logo from '../Assets/Logos/snorlax.svg';

import React from 'react'

function Error() {
  return (
    <div className='d-flex container justify-content-center'>
        <div className='d-flex flex-column justify-content-center align-items-center faded mb-3 py-3'>
            <img src={logo} alt="error logo" width='100px' className='error mb-3' />
            <p>No Pokemon found...</p>
        </div>
    </div>
  )
}

export default Error
