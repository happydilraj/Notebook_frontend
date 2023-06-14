import React, { useContext, useState } from "react";
import NoteContext from "../Context/NoteContext";
import alertContext from '../Context/AlertContext'

export const AddNote = () => {

    const a = useContext(NoteContext);
    const {addNote} = a;

    const alert_context = useContext(alertContext)
    const {setmessage,settype,fun,setisAlert} = alert_context

    const [note, setNote] = useState({title:"", description:"", tag:""})

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})

    }

    const submit = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"", description:"", tag:""})
        setmessage("Note added sucessfully")
        settype("primary")
        fun()
        setisAlert(5)

    }


  return (
    <>

    <div className="container my-3">
        <h2>Add a Note</h2>
      <form >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="title"
            value={note.title}
            required={true}
            autoFocus
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            onChange={onChange}
            name='description'
            required={true}
            value={note.description}
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
            onChange={onChange}
            name='tag'
            required={true}
            value={note.tag}
          />
        </div>
      
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={submit}>
          Add Note
        </button>
      </form>
    </div>
    </>
  );
};
