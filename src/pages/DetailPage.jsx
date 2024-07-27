import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteDetail from "../components/NoteDetail";
import { archiveNote, deleteNote, getNote, unarchiveNote } from "../utils/api";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getNote(id).then(({ data }) => {
      setNote(data);
      setIsLoading(false);
    });
  }, [id])

  async function onDeleteHandler(id) {
    await deleteNote(id);
    note.archived ? navigate("/archives")
    : navigate("/");
}

  async function onArchiveHandler(id) {
    await archiveNote(id);
    navigate("/");
}

  async function onUnarchiveHandler(id) {
    await unarchiveNote(id);
    navigate("/archives");
}

  if (isLoading) {
    return <p>Sedang memuat...</p>;
  }

  return (
    <section className="detail-page">
      {note ? (
        <NoteDetail 
          {...note} 
          onDelete={async () => {
            await deleteNote(id);
            navigate('/'); // Setelah dihapus, kembali ke halaman utama
          }}
          onArchive={async () => {
            if (note.archived) {
              await unarchiveNote(id);
            } else {
              await archiveNote(id);
            }
            navigate('/'); // Setelah diarsipkan atau unarsip, kembali ke halaman utama
          }}
        />
      ) : (
        <p>Catatan tidak ditemukan</p>
      )}
    </section>
  )
}

export default DetailPage;