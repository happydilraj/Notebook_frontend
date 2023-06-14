import React, { useContext, useEffect, useState, useRef } from 'react'
import NoteContext from '../Context/NoteContext';
import NotesItem from './NotesItem';
import alertContext from '../Context/AlertContext'
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const a = useContext(NoteContext);
    const {notes, getAllNotes, editNote} = a;
    const [note, setNote] = useState({eid: "",etitle:"", edescription:"", etag:""})

    const alert_context = useContext(alertContext)
    const {setmessage,settype,fun,setisAlert} = alert_context
    const navigate = useNavigate()

    useEffect(()=>{
      if(localStorage.getItem("authtoken"))
      getAllNotes();
      else
      navigate('/login')
    },[])
    const closeref = useRef(null)
    
    const ref = useRef(null)
  

    const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value})
    }

    const handleClick = ()=>{
      editNote(note.eid, note.etitle, note.edescription, note.etag)
      closeref.current.click();
      setmessage("Note editted sucessfully")
      settype("primary")
      fun()
      setisAlert(5)
    }

    const updateNote = (currentNote)=>{
    
    setNote({eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    ref.current.click();
    
    }

  return (
  <>
    <button style={{display: "none"}} type="button" className="btn btn-primary"  ref={ref}  data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
          </div>
          <div className="modal-body">
                
                  <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    name="etitle"
                    value={note.etitle}
                    autoFocus
                  />
                  
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="edescription"
                    onChange={onChange}
                    name='edescription'
                    value={note.edescription}
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
                    onChange={onChange}
                    name='etag'
                    value={note.etag}
                  />
                </div>
              
              </form>

              </div>
              <div className="modal-footer">
                <button ref={closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={() => {handleClick(note)}} type="button" className="btn btn-primary">Update Note</button>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-3">
          <h1>Your Notes</h1>
          <div className='container mx-2'> 
          {notes.length===0 && 'No Notes to display'}
          </div>
            {notes.map((note)=>{
                return <NotesItem key={note._id} updateNote={updateNote} note={note}/>
    })}
     
    </div>
    </>
  )
}

export default Notes