import React, { useEffect, useRef, useState } from 'react'
import Task from './Task'
import "./Todo.css"
import "./Log.css"
import { getAnything, time } from './firebase';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import {  db } from './firebase'

export default function Todo() {
  const [taskList, setTaskList] = useState(null);
  const [newTask, setNewTask] = useState(null);
  const isLogged = useSelector(state => state.isLogged)
  const userProps = useSelector(state => state.userData)
  const inputClear = useRef(null);
  const params = useParams();
  const [actualUser, setActualUser] = useState("");


  function handleSubmit(e){
    e.preventDefault()
    if (newTask !== null)
      getAnything(userProps.uid).doc(`task${taskList.length}`).set({
        task: newTask,
        id: taskList.length,
        visible: true,
        status: false,
        timeAdded: time()

      })
      inputClear.current.value = null;
      setNewTask(null);
  }

  function handleChange(e){
    setNewTask(e.target.value);


  }



  useEffect(() => {
    const updateList =  
      getAnything(params.uid).onSnapshot(querySnapshot => {
      const items = []
      querySnapshot.forEach(doc => {
        items.push(doc.data())
      })
      setTaskList(items)
    })



    const updateUser =  
    getAnything("users").onSnapshot(querySnapshot => {
    querySnapshot.forEach(doc => {
      if(doc.data().uid === params.uid){
      setActualUser(doc.data().name)
        
      }
    })
  })

  
    return () => {
      updateList();
      updateUser();
    }
  }, [params.uid])





  
if (userProps.uid !== "0" && isLogged && userProps.name !== null ){
  return (
    <div className="bg body">

        <div className="container">

            <div className="todo">
            {userProps.uid === params.uid ?<div className="todo__title">Co dzisiaj planujesz zrobić?</div> : <div className="todo__title">Przeglądarz terminarz użytkownika:</div>}
                {userProps.uid === params.uid ? <form onSubmit={handleSubmit} className="todo__add">
                    <div className="todo__add__input"><input type="text" placeholder="Dodaj zadanie" onChange={handleChange} ref={inputClear}></input></div>
                    <button className="button button-add" type="submit">Dodaj</button>
                </form> : <div className="todo__add--height todo__title todo__title--nowrap">{actualUser}</div>}
                {taskList !== null && taskList.map((task, index) => (
                    task.visible === true  && <Task task={task.task} id={task.id} status={task.status} key={index}></Task>


                ) )}

            </div>
        </div>
        {/*<div className="button button-export button-export--position">Export to PDF</div>*/}
    </div>
  )}
  else
return <Navigate to={`/login`} />
}


