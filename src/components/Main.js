import React from 'react'
import Navbar from './Navbar'
import DesignedLogin from './DesignedLogin'
import { TypeAnimation } from 'react-type-animation';

import "./Main.css"
const Main = () => {
  return (
    <div className='main column'>
      <div className='firstDiv'>
        <h1>Clariture</h1>
        <TypeAnimation
      sequence={[
        'We are a system that uses machine learning models to detect threats', // Types 'One'
        500, // Waits 1s
        'We detect threats and alert users', // Deletes 'One' and types 'Two'
        1000, // Waits 2s
        'Join Us!', // Types 'Three' without deleting 'Two'
        () => {
          console.log('Done typing!'); // Place optional callbacks anywhere in the array
        }
      ]}
      wrapper="div"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: '2em' }}
    />
      </div>      
        <div className='secondDiv'>
            <DesignedLogin/>
        </div>
    </div>
  )
}

export default Main