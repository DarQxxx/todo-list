import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { logout } from './firebase';
import "./header.css"
import logo from './img/logo.png'

export default function Header() {
  const isLogged = useSelector(state => state.isLogged)


  return (
    <div className="header">
      <div className='container'>
      <div className="header__logo">Logo</div>
      <div className="flex">
      {isLogged ? (<Link to={`/login`} className="log" onClick={logout}>Wyloguj</Link>): (<Link to={`/login`} className="log">Zaloguj</Link>)}
      </div>

      </div>

    </div>
  )
}
