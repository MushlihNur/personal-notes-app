import React from "react";
import NoteItem from "./NoteItem";
import PropTypes from 'prop-types';

function NoteList({ notes }) {
  return (
    <div className="notes-list">
      {
        notes.map((note) => (
          <NoteItem 
            key={note.id}
            id={note.id}
            {...note} />
        ))
      }
    </div>
  )
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default NoteList;
