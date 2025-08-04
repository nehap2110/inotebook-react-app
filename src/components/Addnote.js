import React, { useContext, useState } from 'react'
import notecontext from '../context/Notes/notecontext'

const Addnote = (props) => {
    const context = useContext(notecontext)
    const {addnote} = context
    const[note,setnote] = useState({title : "",description : "",tag : ""})

    const handleclick = (e)=>{
        e.preventDefault()
       addnote(note.title,note.description,note.tag)
       //after the note is added make everything blank again
       setnote({title:"",description:"",tag:""})
       props.showalert("Added successfully","success")
    }

    const onchange = (e)=>{
      setnote({...note,[e.target.name ]:e.target.value })
    }
  return (
    
       <div className="container my-2 border p-4 rounded shadow" style={{backgroundColor:"#FFC0CB"}}>
      <h2 className='mt-5 text-center ' style ={{
        fontsize: "4rem",
       fontweight: "800",
       
      }}>Add Notes</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name = "title"
            aria-describedby="emailHelp"
            value = {note.title}
            onChange={onchange}
          />
         
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name = "description"
            value = {note.description}
             onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name = "tag"
            value = {note.tag}
             onChange={onchange}
          />
        </div>
        
        <button type="submit" className="btn btn-primary" onClick={handleclick}>
          Add New Note
        </button>
      </form>
        </div>
    
  )
}

export default Addnote
