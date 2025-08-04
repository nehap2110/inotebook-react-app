import React, { useEffect, useRef,useState } from "react";
import { useContext } from "react";
import notecontext from "../context/Notes/notecontext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

const Note = (props) => {
  const context = useContext(notecontext);
  const { notes, fetchnote ,editnote} = context;
   const[note,setnote] = useState({ id : "",etitle : "",edescription : "",etag : "default"})
   const navigate = useNavigate()
  //we use this hook as a componentdidmount
  useEffect(() => {
    if(localStorage.getItem('token')){
       fetchnote();
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);

   //update current node
  const updatenote = (currentnote) => {
    ref.current.click();
    setnote({ id : currentnote._id,etitle : currentnote.title ,edescription : currentnote.description,etag : currentnote.tag})
  
  };
  //use ref to open modal
  const ref = useRef(null);

  //use ref to close modal
  const refclose = useRef(null);
   
  
      const handleclick = (e)=>{
        
         //before close the edit modal edit the note and update
         editnote(note.id,note.etitle,note.edescription,note.etag)
         console.log("update button succesfully working")
         refclose.current.click()
         props.showalert("updated successfully","success");
      }
  
      const onchange = (e)=>{
        setnote({...note,[e.target.name ]:e.target.value })
      }

  return (
    <div>
      <div className="min-vw-100 min-vh-100 d-flex flex-column justify-content-center align-items-center " >
      <Addnote  showalert = {props.showalert}/>

      {/* use modal to edit note */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
        style ={{display:"none"}}
      ></button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* form to edit note */}
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value= {note.etitle}
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value = {note.edescription}
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value = {note.etag}
                    onChange={onchange}
                  />
                </div>

                
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref = {refclose}
              >
                Close
              </button>
              <button type="button"   className="btn btn-primary" onClick={handleclick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    
    </div>
     <div className=" row my-3 ">
        <h2 className="text-center">Your Notes</h2>
        {notes.map((note) => {
          
             return (
            <Noteitem key={note._id} updatenote={updatenote} note={note}  showalert = {props.showalert}/>
          );
          
         
        })}
      </div>
    </div>
  
  );
};

export default Note;
