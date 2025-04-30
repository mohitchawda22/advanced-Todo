import React, { useState } from 'react'
import "../Sign-Up/signup.scss"

function SignUp({setPage}) {

  const [userdata,setUserdata]=useState({name:"",email:"",password:"",dob:"",gender:""})

  const handleChange=(e)=>{
    setUserdata({...userdata,[e.target.name]:e.target.value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault()

    const user=JSON.parse(localStorage.getItem('user')) ||[]
    const existingUser=user.find(user=>user.email===userdata.email)
    if (existingUser) {
      alert("user already exsits... please signIn!")
      return
    }
    user.push(userdata)
    localStorage.setItem("user",JSON.stringify(user))
    alert("register successfully!")
    setPage('signin')
  }


  return (
    <>
      <div className='signup-container'>
        <div className="signup-box">
          <h2>SIGNUP</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name='name' placeholder="Enter your name" required onChange={handleChange} />
          </label>

            <label>
              E-mail:
              <input type="email" name='email' placeholder="Enter your email" required onChange={handleChange}/>
            </label>

            <label>
              Password:
              <input type="password" name='password' placeholder="Enter your password" required onChange={handleChange}/>
            </label>

            <label>
              Date Of Birth:
              <input type="date" name='dob' required onChange={handleChange}/>
            </label>

            <label>
              Gender:
              <div className="gender-options">
                <label><input type="radio" name="gender" value="male" onChange={handleChange}/> Male</label>
                <label><input type="radio" name="gender" value="female" onChange={handleChange}/> Female</label>
              </div>
            </label>

            <button type="submit" className="submit-button">Register</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp
