import React from 'react'
import "../navbar/navbar.scss"

function Navbar({page,setPage ,currentUser,onLogout}) {
  return (
    <header className="navbar">
        <div className="logo">Tasking</div>
        <div className="nav-buttons">
          {!currentUser&&(
            <>
              <button className={`nav-button ${page === 'signup' ? 'active' : ''}`} onClick={()=>setPage('signup')}>SignUp</button>
              <button className={`nav-button ${page === 'signin' ? 'active' : ''}`} onClick={()=>setPage('signin')}>SignIn</button>
            </>
          )}
          
          {currentUser && (
            <>
              <button className={`nav-button ${page === 'dashboard' ? 'active' : ''}`} onClick={()=>setPage('dashboard')}>dashboard</button>
              <button className={`nav-button ${page === 'profile' ? 'active' : ''}`} onClick={()=>setPage('profile')}>Profile</button>
              <button onClick={onLogout}>Logout</button>
            </>
          ) }
        </div>
      </header>
  )
}

export default Navbar
