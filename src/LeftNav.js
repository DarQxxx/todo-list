import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import "./leftnav.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faGear,  faPenToSquare, faAnglesRight, faRotate } from '@fortawesome/free-solid-svg-icons'

export default function LeftNav() {
  const userProps = useSelector(state => state.userData)
  const isLogged = useSelector(state => state.isLogged)
  const [handleShow, setHandleShow] = useState(false);
    if( ((userProps.uid !== "0" && userProps.name !== null) && isLogged))
  return (
    <div className="leftNav" style={{left: handleShow && "0"}}>
      <div className="leftNav__profile">
      {userProps.url === null ? <img className="leftNav__img" src="https://media.istockphoto.com/vectors/avatar-5-vector-id1131164548?k=20&m=1131164548&s=612x612&w=0&h=ODVFrdVqpWMNA1_uAHX_WJu2Xj3HLikEnbof6M_lccA="></img> : <img className="leftNav__img" src={userProps.url}></img>}
      <div className="leftNav__name">{userProps.name} {userProps.surname}</div>
      </div>

       <Link to={`/${userProps.uid}`} className="log leftNav__nav"><FontAwesomeIcon icon={faCalendar} className="leftNav__icon"></FontAwesomeIcon> Kalendarz</Link>
      <Link to={'/settings'}  className=" log leftNav__nav"><FontAwesomeIcon icon={faGear} className="leftNav__icon"></FontAwesomeIcon> Ustawienia</Link>
      <Link to={'/contact'} className="log leftNav__nav"><FontAwesomeIcon icon={faPenToSquare} className="leftNav__icon"></FontAwesomeIcon> Kontakt</Link>
      <div className="leftNav__show" onClick={()=> {setHandleShow(!handleShow)}}><FontAwesomeIcon icon={faAnglesRight} className="rotateIcon" style={{transform: handleShow && "rotate(-180deg)"}}/> </div>
    
    </div>
  )
  else 
  return(
    <div className="leftNav"></div>
  )
}
