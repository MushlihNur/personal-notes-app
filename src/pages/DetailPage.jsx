import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { archiveNote, unarchiveNote, deleteNote, getNote } from "../utils/local-data";
import NoteDetail from "../components/NoteDetail";


function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <DetailPage id={id} navigate={navigate} />
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      note: getNote(props.id),
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
  }

  onDeleteHandler(id) {
    deleteNote(id);

    this.setState(() => {
      return {
        note: null,
      };
    });

    this.props.navigate('/');
  }

  onArchiveHandler(id) {
    const { note } = this.state;

    if (note.archived) {
      unarchiveNote(id);
      this.props.navigate('/');
    } else {
      archiveNote(id);
      this.props.navigate('/archives');
    }

    this.setState({
      note: getNote(id),
    });
  }

  render() {
    if (this.state.note === null) {
      return <p>Tidak ada catatan</p>;
    }

    return (
      <section className="detail-page">
        <NoteDetail {...this.state.note} 
        onDelete={this.onDeleteHandler} 
        onArchive={this.onArchiveHandler} />
      </section>
    )
  }
}

export default DetailPageWrapper;