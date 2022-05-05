import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {  db, updateUser } from './firebase'
import './settings.css'

export default function Settings() {
  const userProps = useSelector(state => state.userData)
  const [credientials, setCredientials] = useState({name: "", photo: ""});
  const [nameVali, setNameVali] = useState(false);
  const [photoVali, setPhotoVali] = useState(false);
    function handleChange(e){
        setCredientials({ ...credientials, [e.target.id]: e.target.value })
        setPhotoVali(false);
        setNameVali(false);
    }
    function handleSubmit(e){
      e.preventDefault();
      //Zmienienie name i photo użytkownika w bazie danych, a następnie zmienienie ich lub jednego z nich w objectcie user w firestore
      if (credientials.name !=="") db.collection('users').doc(`${userProps.uid}`).update({name: credientials.name})
      if (credientials.photo !=="") db.collection('users').doc(`${userProps.uid}`).update({photo: credientials.photo})
      if (credientials.name !=="" || credientials.photo !=="") updateUser(credientials.name, credientials.photo)
      else {
        if (credientials.name ==="") setNameVali(true);
        if (credientials.photo === "") setPhotoVali(true);
      }
      

    }

    return (
        <div className='body bg'>
          <div className='container'>
            <div className='settings'>
            <form className='login__form settings__form' onSubmit={handleSubmit}>
            <div className='login__form__title settings__form__title--font'>Edytuj swoje dane
            </div>


            <div className={`settings__form__label  ${nameVali && "validate--color"}`}>Imię i nazwisko
            </div>
            <input
            className={`login__form__credential ${nameVali && "validate--borderBtm"}`}
              type='text'
              name='name'
              id='name'
              placeholder='Jan Kowalski'
              onChange={handleChange}
            ></input>
                        <div className={`settings__form__label  ${photoVali && "validate--color"}`}>Zdjęcie</div>
            <input
            className={`login__form__credential mb-20 ${photoVali && "validate--borderBtm"}`}
              type='text'
              name='photo'
              id='photo'
              placeholder='https://www.xyz.com'
              onChange={handleChange}
            ></input>
            {/* <div>Hasło</div>
            <input
            className='login__form__credential'
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              onChange={handleChange}
            ></input>
              <div>Powtórz hasło</div>
            <input
            className='login__form__credential'
              type='password'
              name='rpassword'
              id='rpassword'
              placeholder='Password'
              onChange={handleChange}
            ></input>*/}
          {(photoVali === true || nameVali === true) && <div className="settings__form__info validate--color">Aby zmienić dane, należy uzupełnić co najmniej jedno pole</div>}

            <button className='button button-login' type='submit'>
              Prześlij
            </button>

          </form>

            </div>
          </div>
        </div>
      )
}
