import React from "react";
import { showFormattedDate } from "../utils";
import NoteItemAction from "./NoteItemAction";
import PropTypes from 'prop-types';

function NoteDetail({ id, title, body, createdAt, archived, onDelete, onArchive }) {
  return (
    <>
      <h3 className="detail-page__name">{title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
      <div className="detail-page__body">{body}</div>
      <NoteItemAction id={id} archived={archived} onDelete={onDelete} onArchive={onArchive} />
    </>
  )
}

NoteDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onArchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default NoteDetail;