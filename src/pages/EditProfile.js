import React from 'react'
import SideMenu from '../components/SideMenu'

export default function EditProfile() {
    return (
        <div className="Page-wrapper">
            <div className="Page-nav">
                <SideMenu/>
            </div>
            <div className="Page-main">
                <h1>Hola, Edit your Profile Here!</h1> 
            </div>
        </div>
    )
}