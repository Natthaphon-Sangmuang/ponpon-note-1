import { useNotesContext } from "../hooks/useNotesContext";

const NoteDetails = ({ note }) => {
  const { dispatch } = useNotesContext();

  const handleClick = async () => {
    // ใช้คำสั่ง delete ที่ localhost:4000/api/notes/(idของตัวที่จะลบ)
    const response = await fetch("/api/notes/" + note._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_NOTE", paybefore: json });
    }
  };

  // return html
  return (
    <div className="note-details">
      <h4>{note.title}</h4>
      <p>
        <strong>Before: </strong>
        {note.before}
      </p>
      <p>
        <strong>Number of text: </strong>
        {note.text}
      </p>
      <p>{note.createdAt}</p>
      <span onClick={handleClick}>delete</span>
    </div>
  );
};

export default NoteDetails;
