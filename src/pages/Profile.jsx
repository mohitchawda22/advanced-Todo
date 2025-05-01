import React from 'react'
import "./profile.scss"

function Profile({ user }) {
    return (
        <div className='profile'>
            <div className='container'>
                <h1>Name:{user?.name}</h1>
                <h1>Email:{user?.email}</h1>
                <h1>Date of Birth:{user?.dob}</h1>
                <h1>Gender:{user?.gender}</h1>
            </div>
        </div>
    )
}

export default Profile
