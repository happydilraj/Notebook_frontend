import React, { useContext} from "react";
import NoteContext from "../Context/NoteContext";
import './../App.css'
import alertContext from '../Context/AlertContext'

const NotesItem = (props) => {

  const { note, updateNote } = props;
  const alert_context = useContext(alertContext)
  const {setmessage,settype,fun,setisAlert} = alert_context

  const a = useContext(NoteContext);
  const {deleteNote,editNote} = a;

  const deleteNoteFunction = (id)=>{
    deleteNote(id)
    setmessage("Note Deleted Sucessfully")
    settype("primary")
    fun()
    setisAlert(5)
  }

  const copyFunction = (description)=>{
    navigator.clipboard.writeText(description);
    setmessage("Description copied!")
    settype("primary")
    fun()
    setisAlert(5)
  }

  return (

    <>

    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title} <i onClick={()=>{ deleteNoteFunction(note._id)}} className="fa-solid fa-trash mx-2"></i> <i className="fa-solid mx-2 fa-pen-to-square" onClick={()=>{updateNote(note)}}></i><i onClick={()=>{copyFunction(note.description)}} className="fa-solid fa-copy mx-2"></i></h5>
          <p className="card-text">
            {note.description}
          </p>
        </div>
      </div>
      </div>

      </>
  );
};

export default NotesItem;
