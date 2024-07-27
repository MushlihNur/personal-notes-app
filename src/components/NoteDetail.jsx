import React from "react";
import DOMPurify from "dompurify";
import PropTypes from 'prop-types';

function NoteDetail({ id, title, body, createdAt, archived, onDelete, onArchive }) {
  const sanitizedBody = DOMPurify.sanitize(body);

  return (
    <>
      <h3 className="detail-page__name">{title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
      <p className="detail-page__body" dangerouslySetInnerHTML={{ __html: sanitizedBody }} />
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