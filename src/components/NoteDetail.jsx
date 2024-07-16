import React from "react";
import { showFormattedDate } from "../utils";
import NoteItemAction from "./NoteItemAction";

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

export default NoteDetail;