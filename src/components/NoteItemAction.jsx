import React from "react";
import PropTypes from 'prop-types';
import DeleteButton from "./DeleteButton";
import ArchiveButton from "./ArchiveButton";

function NoteItemAction({ id, archived, onDelete, onArchive }) {
  return (
    <div className="detail-page__action">
      <ArchiveButton id={id} archived={archived} onArchive={onArchive} />
      <DeleteButton id={id} onDelete={onDelete} />
    </div>
  )
}

NoteItemAction.propTypes = {
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
}

export default NoteItemAction