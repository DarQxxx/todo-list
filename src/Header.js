import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { logout } from './firebase';
import "./header.css"

export default function Header() {
  const isLogged = useSelector(state => state.isLogged)


  return (
    <div className="header">
      <div className='container'>
      <div className="header__logo">Logo</div>
      {isLogged ? (<div className="log" onClick={logout}>Wyloguj</div>): (<Link to={`/login`} className="log">Zaloguj</Link>)}
      </div>

    </div>
  )
}
