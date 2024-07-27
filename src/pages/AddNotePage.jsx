import React from "react";
import NoteInput from "../components/NoteInput";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/api";

function AddNotePage() {
  const navigate = useNavigate();

  function onAddNoteHandler(note) {
    addNote(note);
    navigate('/');
  }

  return (
    <section className="add-new-page">
      <NoteInput addNote={onAddNoteHandler}/>
    </section>
  )
}

export default AddNotePage;