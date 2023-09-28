import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "650ae5323e6359ae82aa00b3",
      user: "6502f931b654a02ad8afd7a3",
      title: "My Title 2",
      description: "Complete all tasks!",
      tag: "personal",
      date: "2023-09-20T12:27:30.472Z",
      __v: 0,
    },
    {
      _id: "650ae56b3e6359ae82aa00b8",
      user: "6502f931b654a02ad8afd7a3",
      title: "My Title 1",
      description: "Please Wake up early!",
      tag: "personal",
      date: "2023-09-20T12:28:27.246Z",
      __v: 0,
    },
    {
      _id: "650ae5323e6359ae82aa00b4",
      user: "6502f931b654a02ad8afd7a3",
      title: "My Title 2",
      description: "Complete all tasks!",
      tag: "personal",
      date: "2023-09-20T12:27:30.472Z",
      __v: 0,
    },
    {
      _id: "650ae56b3e6359ae82aa00b48",
      user: "6502f931b654a02ad8afd7a3",
      title: "My Title 1",
      description: "Please Wake up early!",
      tag: "personal",
      date: "2023-09-20T12:28:27.246Z",
      __v: 0,
    },
    {
      _id: "650ae5323e6359ae82aa004b3",
      user: "6502f931b654a02ad8afd7a3",
      title: "My Title 2",
      description: "Complete all tasks!",
      tag: "personal",
      date: "2023-09-20T12:27:30.472Z",
      __v: 0,
    },
    {
      _id: "650ae56b3e6359ae82aa400b8",
      user: "6502f931b654a02ad8afd7a3",
      title: "My Title 1",
      description: "Please Wake up early!",
      tag: "personal",
      date: "2023-09-20T12:28:27.246Z",
      __v: 0,
    },
    {
      _id: "650ae5323e6359ae82aa400b3",
      user: "6502f931b654a02ad8afd7a3",
      title: "My Title 2",
      description: "Complete all tasks!",
      tag: "personal",
      date: "2023-09-20T12:27:30.472Z",
      __v: 0,
    },
    {
      _id: "650ae56b3e6359ae82aa040b8",
      user: "6502f931b654a02ad8afd7a3",
      title: "My Title 1",
      description: "Please Wake up early!",
      tag: "personal",
      date: "2023-09-20T12:28:27.246Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  //Add a Note
  const addNote = (title, description, tag) => {
    console.log("Adding a note");
    const note = {
      _id: "650ae56b3e6359ae82aa040bb8",
      user: "6502f931b654a02ad8afd7a3",
      title: title,
      description: description,
      tag: tag,
      date: "2023-09-20T12:28:27.246Z",
      __v: 0,
    }
    setNotes(notes.concat(note));
  }

  //Delete a Note
  const deleteNote = () => {

  }

  //Edit a Note
  const editNote = () => {
    
  }


  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
