import React, { useState } from 'react'
import "../Sign-In/signin.scss"

function SignIn({onLogin}) {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const handleSubmit=(e)=>{
    e.preventDefault()
    const user=JSON.parse(localStorage.getItem('user')) || []
    const userFound=user.find(user=>user.email===email && user.password===password)
    if(userFound){
      localStorage.setItem('currentUser',JSON.stringify(user))
      alert("login")
      onLogin(userFound)
    }else{
      alert("user not found please register yourself!")
    }
  }

  return (
    <>
      <div className='signin-container '>
      <div className="signin-box">
        <h2>SIGNIN</h2>
        <form className="signin-form" onSubmit={handleSubmit}>
          <label>
            E-mail:
            <input type="email" name='email' value={email} placeholder="Enter your email" required onChange={(e)=>setEmail(e.target.value)}/>
          </label>

          <label>
            Password:
            <input type="password" name='password' value={password} placeholder="Enter your password" required onChange={(e)=>setPassword(e.target.value)}/>
          </label>

          <button type="submit" className="submit-button">SignIn</button>
        </form>
      </div>
      </div>
    </>
  )
}

export default SignIn
