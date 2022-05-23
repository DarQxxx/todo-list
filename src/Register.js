import React, { useState } from 'react'
import './Log.css'
import { useDispatch, useSelector } from 'react-redux'
import { login, register } from './firebase'
import { Link, Navigate } from 'react-router-dom'

export default function Register () {
  const dispatch = useDispatch()
  const isLogged = useSelector(state => state.isLogged)
  const userProps = useSelector(state => state.userData)
  const [validation, setValidation] = useState(false)
  const [validationPwd, setValidationPwd] = useState(false)
  const [validationMail, setValidationMail] = useState(false)
  const [credientials, setCredientials] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    rpassword: ""
  })

  function handleSubmit (e) {
    e.preventDefault();
    if (credientials.name !== "" && credientials.surname !== "" && credientials.email !== "" && credientials.password !== "" && credientials.rpassword !== "" && credientials.password === credientials.rpassword )
    register(credientials.email, credientials.password, credientials.name, credientials.surname, setValidationMail);
    else if (credientials.password !== credientials.rpassword && credientials.name !== "" && credientials.surname !== "" && credientials.email !== "" && credientials.passwrod !== "" && credientials.rpassword !== "") setValidationPwd(true);
    else setValidation(true);
    console.log(credientials.password === credientials.rpassword);
  }
  function handleChange (e) {
    setCredientials({ ...credientials, [e.target.id]: e.target.value })
    setValidation(false);
    setValidationPwd(false);
    setValidationMail(true);
  }
  if (userProps.uid == "0" && isLogged === false ) {
    return (
      <div className='body bg'>
        <div className='container'>
          <div className='login'>
            <form className='login__form' onSubmit={handleSubmit}>
              <div className='login__form__title'>TODO</div>
              {validation && <div className="validate--color validate__login--text">Podane pola są wymagane</div>}
              {validationPwd && <div className="validate--color validate__login--text">Podane hasła muszą być identyczne</div>}
              {validationMail && <div className="validate--color validate__login--text">Podany email jest już używany</div>}
              <input
                className={`login__form__credential ${(validation === true && credientials.name ==="") && 'validate--borderBtm'}`}
                type='text'
                name='name'
                id='name'
                placeholder='Imię'
                onChange={handleChange}
              ></input>
              <input
                className={`login__form__credential ${(validation === true && credientials.surname ==="") && 'validate--borderBtm'}`}
                type='text'
                name='surname'
                id='surname'
                placeholder='Nazwisko'
                onChange={handleChange}
              ></input>
              <input
                className={`login__form__credential ${(validation === true && credientials.email ==="") && 'validate--borderBtm'} ${validationMail===true && 'validate--borderBtm'}`}
                type='email'
                name='email'
                id='email'
                placeholder='E-mail'
                onChange={handleChange}
              ></input>
              <input
                className={`login__form__credential ${(validation === true && credientials.password ==="") && 'validate--borderBtm'} ${validationPwd === true && 'validate--borderBtm'}`}
                type='password'
                name='password'
                id='password'
                placeholder='Hasło'
                onChange={handleChange}
              ></input>
              <input
                className={`login__form__credential ${(validation === true && credientials.rpassword ==="") && 'validate--borderBtm'} ${validationPwd === true && 'validate--borderBtm'}`}
                type='password'
                name='rpassword'
                id='rpassword'
                placeholder='Powtórz hasło'
                onChange={handleChange}
              ></input>
              <button className='button button-login button--marginBot' type='submit'>
                Zarejestruj
              </button>
            <div className="text--center">Posiadasz już konto? Zaloguj się <Link to={'/login'} className="text--link">tutaj</Link></div>

            </form>
          </div>
        </div>
      </div>
    )
  } else return <Navigate to={`/login`} />
}
