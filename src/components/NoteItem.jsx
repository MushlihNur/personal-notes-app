import React from "react";
import { showFormattedDate } from '../utils/index';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

function NoteItem({ id, title, body, createdAt }) {
  const sanitizedBody = DOMPurify.sanitize(body);

  return (
    <article className="note-item">
      <h3 className="note-item__title">
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__created-at">{showFormattedDate(createdAt)}</p>
      <p className="note-item__body" dangerouslySetInnerHTML={{ __html: sanitizedBody }} />
    </article>
  )
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
}

export default NoteItem;