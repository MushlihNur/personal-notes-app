import React from "react";
import { FiArchive } from 'react-icons/fi';
import PropTypes from 'prop-types';

function ArchiveButton({ id, onArchive }) {
  return <button className="action" type="button" onClick={() => onArchive(id)}><FiArchive /></button>
}

ArchiveButton.propTypes = {
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onArchive: PropTypes.func.isRequired,
}

export default ArchiveButton;