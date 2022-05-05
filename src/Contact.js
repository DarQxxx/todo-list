import React, { useEffect, useRef, useState } from 'react'
import './Contact.css'
import emailjs from 'emailjs-com'

export default function Contact () {
  const validation = useRef()
  const validation2 = useRef()
  const validation3 = useRef()
  const [validate, setValidate] = useState(false)
  const [validate2, setValidate2] = useState(false)
  const [validate3, setValidate3] = useState(false)
  const [succes, setSucces] = useState(false)

  function handleSubmit (e) {
    e.preventDefault()
    if (
      validation.current.value !== '' &&
      validation2.current.value !== '' &&
      validation3.current.value !== ''
    ) {
      emailjs
        .sendForm(
          'service_fpblmos',
          'template_yu29aaa',
          e.target,
          'nT4s4aPKMNI3uWY2q'
        )
        .then(res => {
          console.log(res)
          setSucces(true);
          validation.current.value = '';
          validation2.current.value = '';
          validation3.current.value = '';
        })
        .catch(err => console.log(err))

        emailjs
        .sendForm(
          'service_fpblmos',
          'template_cvoczyd',
          e.target,
          'nT4s4aPKMNI3uWY2q'
        )
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err))
    }
    else { 
      setSucces(false);
    }


    if (validation.current.value === '') {
      setValidate(true)
      
    }
    if (validation2.current.value === '') {
      setValidate2(true)
    }
    if (validation3.current.value === '') {
      setValidate3(true)
    }
  }

  function handleChange (e) {
    setSucces(false);
    if (e.target.name === 'name') {
      setValidate(false)
    } else if (e.target.name === 'email') {
      setValidate2(false)
    } else if (e.target.name === 'message') {
      setValidate3(false)
    }
  }

  

  return (
    <div className='body bg'>
      <div className='container'>
        <div className='contact'>
          <form className='contact__form pdb-30'  onSubmit={handleSubmit}>
            <div className='contact__form__title'>
              Widzisz jakiś błąd, albo masz pytanie? Uzupełnij formularz i
              skontaktuj się
            </div>
            {succes && <div className="contact__form__success">Twoja wiadomość zosała przesłana</div>}
            <div className={`label ${validate && 'validate--color'}`}>Imię</div>
            <div className='form__validation'>
              <input
                ref={validation}
                className={`contact_form_email ${validate &&
                  'validate--border'}`}
                type='text'
                name='name'
                id='name'
                placeholder='Jan'
                onChange={handleChange}
              ></input>
              {validate && (
                <div className='validate'>To pole jest wymagane</div>
              )}
            </div>
            <div className={`label ${validate2 && 'validate--color'}`}>
              E-mail
            </div>
            <div className='form__validation'>
              <input
                ref={validation2}
                className={`contact_form_email ${validate2 &&
                  'validate--border'}`}
                type='email'
                name='email'
                id='email'
                placeholder='jan.kowalski@gmail.com'
                onChange={handleChange}
              ></input>
              {validate2 && (
                <div className='validate'>To pole jest wymagane</div>
              )}
            </div>
            <div className={`label ${validate3 && 'validate--color'}`}>
              Wiadomość
            </div>
            <div className='form__validation'>
              <textarea
                ref={validation3}
                className={`contact__form__message mb-15 ${validate3 &&
                  'validate--border'}`}
                rows='4'
                name='message'
                id='message'
                placeholder='Mam pytanie odnośnie działania...'
                onChange={handleChange}
              ></textarea>
              {validate3 && (
                <div className='validate'>To pole jest wymagane</div>
              )}
            </div>
            <button className='button button-login button--mt ' type='submit'>
              Prześlij
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
