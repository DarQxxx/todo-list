import React, {  useState } from 'react'
import { FaRegEdit, FaRegTimesCircle, FaCheck} from "react-icons/fa"
import { useSelector } from 'react-redux'
import { getAnything } from './firebase'

export default function ( {task, id, status}) {
  const [isChange, setIsChange] = useState(false)
  const [editTask, setEditTask] = useState("")
  const userProps = useSelector(state => state.userData)

  function handleStatusChange(){
    getAnything(userProps.uid).doc(`task${id}`).update({
      status: !status
    })
  }
function handleEdit(){
  setIsChange(!isChange);
  setEditTask(task)

}
function handleSoftDelete(){
  getAnything(userProps.uid).doc(`task${id}`).update({
    visible: false
  })
}
function handleChange(e){
setEditTask(e.target.value);
}

function handleBlur(e){
  getAnything(userProps.uid).doc(`task${id}`).update({
    task: e.target.value
  })
  setIsChange(false);
}

function handleExpand(e){
  e.target.classList.toggle("expand");
}

  return (
    <div className="todo__task" style={{backgroundColor: status === true && "rgb(0, 85, 7)"}}>
    {isChange===false ? <div className="todo__task__name" onClick={handleExpand}>{task} </div> : <input autoFocus className="todo__task__name" value={editTask} onChange={handleChange} onBlur={handleBlur}></input> }
    <div className="flex">
        <div className="todo__task__icons" onClick={handleStatusChange}><FaCheck/></div>
        <div className="todo__task__icons" onClick={handleSoftDelete}><FaRegTimesCircle/></div>
        <div className="todo__task__icons" onClick={handleEdit}><FaRegEdit/></div>
    </div>
</div>
  )
}
