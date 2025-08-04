//jo notes hai unki state bnayenge -- these state are accessible to all
import notecontext  from './notecontext'
import { useState } from 'react'

//arrow funtion create karenge
const Notestate = (props)=>{
//       const s1 = {
//         "name":"neha",
//         "branch":"information technology"
//     }
//     const [ state,setstate] = useState(s1);
//      const updatestate = ()=>{
//      setTimeout(() => {
//         setstate({
//             "name":"eng neha",
//              "branch":"IT"
//         })
//     }, 1000);
// }
//value = {{state,updatestate}}

const host = "http://localhost:5000"

const initialnote = []
const [notes,setnotes] = useState(initialnote)

//get all notes

const fetchnote=  async ()=>{
  //todo API call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "auth-token" :localStorage.getItem('token')
  },

  
});
const json = await response.json();
console.log(json);
//set note
setnotes(json)

}


//add a note
const addnote=  async (title,description ,tag)=>{
  //todo API call
  const response = await fetch(`${host}/api/notes/addnote`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "auth-token":localStorage.getItem('token')
  },
  body: JSON.stringify({title,description,tag }),
  
});
  const json = await response.json();
  console.log(json)

// const  note = {
//     "_id": "6889cc79f864be5032b5ebb8",
//     "user": "6889cb9ff864be5032b5ebb1",
//     "title": title,
//     "description": description,
//     "tag": tag,
//     "date": "2025-07-30T07:40:41.281Z",
//     "__v": 0
//   }
  setnotes(notes.concat(json));
}

//delete a note
const deletenote =async (id)=>{
  //API call
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "auth-token" :localStorage.getItem('token')
  },
  
});
const json = await response.json();
  console.log(json)

  //logic to delete a note
 console.log("note is deleted of ",{id});
 const newnote = notes.filter((note)=>{ return note._id !== id})
 setnotes(newnote)
}

//edit a note
const editnote=  async (id,title,description,tag)=>{
  //API call
   const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "auth-token" :localStorage.getItem('token')
  },
  body: JSON.stringify({title,description,tag }),
  
});
const json =  await response.json()
console.log(json)
 
let newnote = JSON.parse(JSON.stringify(notes))
  // //logic to edit in client
 for(let index = 0;index < notes.length;index++){
     const element = newnote[index]
   if(element._id === id){
      newnote[index].title = title
       newnote[index].description = description
       newnote[index].tag = tag
       break;
     }
  
  }
 setnotes(newnote)
//  setnotes((notes) => notes.map((note)=>{
//   return (note._id === id)?{...note,title,description,tag}:note
 //}))
}

    return (<notecontext.Provider value = {{notes,addnote,deletenote,editnote,fetchnote}}>
        {props.children}
    </notecontext.Provider>)
}
export default Notestate;