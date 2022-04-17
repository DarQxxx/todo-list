import React, { useState } from 'react'
import './Log.css'
import { useDispatch, useSelector } from 'react-redux';
import { login } from './firebase';
import { Navigate } from 'react-router-dom';

export default function Login () {
  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.isLogged)
  const userProps = useSelector(state => state.userData)
  const [credientials, setCredientials] = useState({email: null, password: null});
  const date = useSelector(state => state.date )

  function handleSubmit(e){
    e.preventDefault()
    login(credientials.email, credientials.password);
  }
  function handleChange(e){
    setCredientials({ ...credientials, [e.target.id]: e.target.value })
  }
  console.log(date.fullDate)
  if (userProps.uid == "0" && isLogged === false ){
  return (
    <div className='body bg'>
      <div className='container'>
        <div className='login'>
          <form className='login__form' onSubmit={handleSubmit}>
            <div className='login__form__title'>TODO</div>
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
            <button className='button button-login' type='submit'>
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
else
return <Navigate to={`/todo/${userProps.uid}`} />
}
