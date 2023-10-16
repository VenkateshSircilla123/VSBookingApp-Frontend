import './navbar.css'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
export default function Navbar() {
  const {user} = useContext(AuthContext)
  return (
    <div className='navbar'>
        <div className='navbarContainer'>
          <Link to='/' style={{color:"inherit", textDecoration:"none"}}>
            <span className='logo'>VS-Booking</span>
          </Link>
            {!user && <div className='navbarItems'>
              <Link to='/register'>
                <button className='navButton'>Register</button>
              </Link>
              <Link to='/login'>
                <button className='navButton'>Login</button>
              </Link>
            </div>}
        </div>
    </div>
  )
}
