import { useEffect } from "react";
import { useNotesContext } from "../hooks/useNotesContext";

// components
import NoteDetails from "../components/NoteDetails";
import NoteForm from "../components/NoteForm";

const Home = () => {
  const { notes, dispatch } = useNotesContext();

  useEffect(() => {
    const fetchNotes = async () => {
      // get note จาก localhost:4000/api/notes เก็บในรูปแบบ json
      const response = await fetch("/api/notes");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_NOTES", paybefore: json });
      }
    };

    fetchNotes();
  }, [dispatch]);

  // loop note ทีละตัวออกมา โดยให้ class เป็น NoteDetails
  // และใส่ NoteForm ลงไปด้วย
  return (
    <div className="home">
      <div className="notes">
        {notes &&
          notes.map((note) => <NoteDetails note={note} key={note._id} />)}
      </div>
      <NoteForm />
    </div>
  );
};

export default Home;
