import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './styleEstatico.css'
import Cart from '../Cart'
import logo from '../assets/obelisco.png'; 

const Header = () => {
  

  return (
    <header>
      <img alt="logo" width="50" height="50" src="public/assets/obelisco.png">
        <ul> 
          <li><Link to='/' className='link'>Bienvenidos</Link></li>
          <li><Link to='/NuestrosTours' className='link'>Nuestros Tours</Link></li>
          <li><Link to='/PreguntasFrecuentes' className='link'>Preguntas Frecuentes</Link></li>
          <li><Link to='/Contacto' className='link'>Contacto</Link></li>
          <li className='cartnav'>
          </li>
        </ul>
      </nav>
    </header>
  )
}


export default Header







