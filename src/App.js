import React, { useEffect } from 'react'
import logo from './logo.svg'
import { Counter } from './features/counter/Counter'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import Login from './Login'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";
import Todo from './Todo'
import Baner from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { dataAction, dateAction, loginAction, logoutAction } from './actions';
import firebase from 'firebase/compat/app';
import Register from './Register'
import Contact from './Contact'
import LeftNav from './LeftNav'
import Settings from './Settings'
import RightNav from './RightNav'
import "./App.css"

function App () {
  const isLogged = useSelector(state => state.isLogged)
  const userProps = useSelector(state => state.userData)

  const dispatch = useDispatch();

  useEffect(() => {
    


    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user)
        dispatch(
          dataAction({ name: user.displayName, url: user.photoURL, email: user.email, uid: user.uid })
        )
        dispatch(loginAction())
      //  let date = new Date();
      //  dispatch(dateAction({day : date.getDate(), month: date.getMonth(), year: date.getFullYear(),fullDate: `${date.getDate()}${date.getMonth()}${date.getFullYear()}` }))
        
      } else {
        dispatch(logoutAction())

        dispatch(
          dataAction({ name: null, url: null, email: null, uid: "0" })
        )
     //   dispatch(dateAction({day: null, month: null, year: null, fullDate: null}))
        
      }
    })
  }, [])

  return (
    <Router>
      <Baner></Baner>
      <div className="flex justify-between">      
      <LeftNav/>
        <Switch>
          <Route path="/" element={<Login/>}/>
          <Route path ="/:uid" element={<Todo/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Switch>
        <RightNav/>
        </div>

    </Router>
  )
}

export default App
