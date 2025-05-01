import './App.scss'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Profile from "./pages/Profile"
import { useEffect, useState } from 'react'
import SignUp from './components/Sign-Up/SignUp'
import SignIn from './components/Sign-In/SignIn'
import Dashboard from './pages/Dashboard'

function App() {
  const [page,setPage]=useState('signup')
  const [currentUser,setCurrentUser]=useState(null)

  const handleLogin=(user)=>{
    localStorage.setItem('currentUser',JSON.stringify(user))
    setCurrentUser(user)
    setPage('dashboard')
  }
  const handleLogout=()=>{
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    setPage('signin')
  }

  useEffect(()=>{
    const SigninUser=localStorage.getItem("currentUser")
    if(SigninUser){
      setCurrentUser(JSON.parse(SigninUser))
      setPage('dashboard')
    }else{
      setPage('signin')
    }
  },[])

  return (
  <>
    <Navbar setPage={setPage} page={page} currentUser={currentUser} onLogout={handleLogout}></Navbar>
    {page==='signup' && <SignUp setPage={setPage}/>}
    {page==='signin' && <SignIn onLogin={handleLogin}/>}
    {page=== 'dashboard' && <Dashboard user={currentUser}/>}
    {page==='profile' && <Profile user={currentUser}/>}
    <Footer/>
  </>
  )
}

export default App
