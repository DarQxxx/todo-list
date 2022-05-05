import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import "./leftnav.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faGear,  faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { getAnything } from './firebase'


export default function RightNav() {
    const userProps = useSelector(state => state.userData)
    const isLogged = useSelector(state => state.isLogged)
    const [users, setUsers] = useState(null)
    

  
    useEffect(() => {
      const updateList =
        getAnything("users").onSnapshot(querySnapshot => {
        const items = []
        querySnapshot.forEach(doc => {
          items.push(doc.data())
        })
        setUsers(items)
      })
    
      return () => {
        updateList();
      }
    }, [])


      if( ((userProps.uid !== "0" && userProps.name !== null) && isLogged))
    return (
      <div className="rightNav nav--right">
        <div className="rightNav__profile">
            {users !== null && users.map((user, index) => (
                <Link to={`/${user.uid}`} key={index} className="rightNav__list">
                    {user.photo === null ? <img className="leftNav__img" src="https://media.istockphoto.com/vectors/avatar-5-vector-id1131164548?k=20&m=1131164548&s=612x612&w=0&h=ODVFrdVqpWMNA1_uAHX_WJu2Xj3HLikEnbof6M_lccA="></img> : <img className="leftNav__img" src={user.photo}></img>}
                    <div className="leftNav__name">{user.name}</div>
                </Link>
                
            ))}
        </div>
      </div>
    )
    else 
    return(
      <div className="leftNav"></div>
    )
}
