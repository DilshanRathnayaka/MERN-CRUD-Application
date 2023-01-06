import React from 'react'

function NavBar() {
  return (
    <div className='nav'>
    <div className='navleft'>
   <div><a href="">Home</a> </div>
   <div><a href="">About</a> </div>
    </div>
    <div className='navright'>
   <div> <a href="">Login</a></div>
   <div><a href="">Register</a></div> 
    </div>
    
    </div>
  )
}

export default NavBar