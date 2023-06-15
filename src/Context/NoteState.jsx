import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const url = "https://notebook-kn2w.onrender.com/api/notes/"
    // const url = "http://localhost:3000/api/notes/"
    
    const notesInitial = []
    // const notesInitial = [{
    //     "title": "my title",
    //     "description": "my description",
    //     "tag": "my tag"
    // }]

    const [notes, setNotes] = useState(notesInitial)

    const getAllNotes = async () => {

    // fetch all notes
    const response = await fetch(`${url}fetchallnotes`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authtoken")
        },
      });
      const json = await response.json()
      setNotes(json.notes)
         
        // const note = notes[0];
        // setNotes(note)
    }

    // Add a Note
    const addNote = async (title,description,tag) => {
        const response = await fetch(`${url}addnote`, {
            method: "POST",
            mode: "cors",
            headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authtoken")
            },
            body: JSON.stringify({title,description,tag})
        });
        const json = await response.json()
        setNotes(notes.concat(json.savedNote));
    }


    // Delete a Note
    const deleteNote = async (id) => {

        const response = await fetch(`${url}deletenote/${id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authtoken")
            },
        });
        const json = response.json()
        const newNotes = notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
    }

    // Edit a Note
    const editNote =async (eid,title,description,tag) => {

        const response = await fetch(`${url}updatenote/${eid}`, {
            method: "PUT",
            mode: "cors",
            headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authtoken")
            },
            body: JSON.stringify({title,description,tag})
        });
        const newNote = JSON.parse((JSON.stringify(notes)))

        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if(element._id === eid)
            {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
            
        }
        setNotes(newNote);
    }
    
    return(
        <NoteContext.Provider value={{notes,addNote, deleteNote, editNote, getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState