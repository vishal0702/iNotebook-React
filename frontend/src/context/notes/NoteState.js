import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://127.0.0.1:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //Get all Notes
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMmY5MzFiNjU0YTAyYWQ4YWZkN2EzIn0sImlhdCI6MTY5NDc4MDM4MX0.FAKvAosarlFu0fvJbTOgInrBfJqFfsuEZlyxocCSJ-E",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMmY5MzFiNjU0YTAyYWQ4YWZkN2EzIn0sImlhdCI6MTY5NDc4MDM4MX0.FAKvAosarlFu0fvJbTOgInrBfJqFfsuEZlyxocCSJ-E",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // const json =  response.json();

    //Logic to add note on client side
    console.log("Adding a note");
    const note = {
      _id: "650ae56b3e6359ae82aa040bb8",
      user: "6502f931b654a02ad8afd7a3",
      title: title,
      description: description,
      tag: tag,
      date: "2023-09-20T12:28:27.246Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = (id) => {
    //ToDo: API Call
    console.log("Deleting note with id: " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMmY5MzFiNjU0YTAyYWQ4YWZkN2EzIn0sImlhdCI6MTY5NDc4MDM4MX0.FAKvAosarlFu0fvJbTOgInrBfJqFfsuEZlyxocCSJ-E",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    //Logic to edit note on client side
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
