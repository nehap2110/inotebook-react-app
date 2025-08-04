import React, { useContext } from 'react'
import notecontext from '../context/Notes/notecontext'

const Noteitem = (props) => {
  const context = useContext(notecontext)
  const {deletenote} = context
    const {note,updatenote} = props
  return (
    <div className='col-md-3  px-5'>
    
    <div className="card m-3 border rounded shadow " style={{width:"300px",height:"200px"}} >
      <div className="card-body  ">
       <h5 className="card-title">{note.title}</h5>
       <p className="card-text">{note.description}</p>
       <div className='d-flex '>
          <img src = "https://cdn1.iconfinder.com/data/icons/material-core/18/delete-128.png"  alt  ="delete " onClick={()=>{deletenote(note._id); props.showalert("deleted successfully","success")}} style = {{ width :"40px", height :"40px"} }/>
          <img src = "https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-128.png" alt='edit' style = {{ width :"40px", height :"40px"}} onClick={()=>{updatenote(note)}}/>
          
       </div>
      
      </div>
    </div>
    </div>
  )
}

export default Noteitem
