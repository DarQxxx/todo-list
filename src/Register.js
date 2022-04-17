import React, { useState } from 'react'
import './Log.css'
import { useDispatch, useSelector } from 'react-redux'
import { login, register } from './firebase'
import { Navigate } from 'react-router-dom'

export default function Register () {
  const dispatch = useDispatch()
  const isLogged = useSelector(state => state.isLogged)
  const userProps = useSelector(state => state.userData)
  const [credientials, setCredientials] = useState({
    name: null,
    surname: null,
    email: null,
    password: null,
    rpassword: null
  })

  function handleSubmit (e) {
    e.preventDefault()
    register(credientials.email, credientials.password, credientials.name, credientials.surname)
  }
  function handleChange (e) {
    setCredientials({ ...credientials, [e.target.id]: e.target.value })
    console.log(credientials);
  }
  if (userProps.uid === null && isLogged === false) {
    return (
      <div className='body bg'>
        <div className='container'>
          <div className='login'>
            <form className='login__form' onSubmit={handleSubmit}>
              <div className='login__form__title'>TODO</div>
              <input
                className='login__form__credential'
                type='text'
                name='name'
                id='name'
                placeholder='Name'
                onChange={handleChange}
              ></input>
              <input
                className='login__form__credential'
                type='text'
                name='surname'
                id='surname'
                placeholder='Surname'
                onChange={handleChange}
              ></input>
              <input
                className='login__form__credential'
                type='email'
                name='email'
                id='email'
                placeholder='E-mail'
                onChange={handleChange}
              ></input>
              <input
                className='login__form__credential'
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                onChange={handleChange}
              ></input>
              <input
                className='login__form__credential'
                type='password'
                name='rpassword'
                id='rpassword'
                placeholder='Repeat password'
                onChange={handleChange}
              ></input>
              <button className='button button-login button--marginBot' type='submit'>
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  } else return <Navigate to={`/todo/:uid/:date`} />
}
