import React, { useEffect, useRef, useState } from 'react'
import Task from './Task'
import "./Todo.css"
import "./Log.css"
import { getAnything, time } from './firebase';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Todo() {
  const [taskList, setTaskList] = useState(null);
  const [newTask, setNewTask] = useState(null);
  const isLogged = useSelector(state => state.isLogged)
  const userProps = useSelector(state => state.userData)
  const inputClear = useRef(null);



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

function updateList () {
      getAnything(userProps.uid).onSnapshot(querySnapshot => {
      const items = []
      querySnapshot.forEach(doc => {
        items.push(doc.data())
      })
      setTaskList(items)
    })
  }

  useEffect(() => {
    updateList();
  
    return () => {
      updateList();
    }
  }, [])

  
if (userProps.uid !== "0" && isLogged ){
  return (
    <div className="bg body">

        <div className="container">
            <div className="todo">
                <div className="todo__title">Co dzisiaj planujesz zrobić?</div>
                <form onSubmit={handleSubmit} className="todo__add">
                    <div className="todo__add__input"><input type="text" placeholder="Dodaj zadanie" onChange={handleChange} ref={inputClear}></input></div>
                    <button className="button button-add" type="submit">Dodaj</button>
                </form>
                {taskList !== null && taskList.map((task, index) => (
                    task.visible === true  && <Task task={task.task} id={task.id} status={task.status} key={index}></Task>


                ) )}

            </div>
        </div>
        <div className="button button-export button-export--position">Export to PDF</div>
    </div>
  )}
  else
return <Navigate to={`/login`} />
}


