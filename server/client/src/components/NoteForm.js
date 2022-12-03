import { useState } from "react";
import { useNotesContext } from "../hooks/useNotesContext";

const NoteForm = () => {
  const { dispatch } = useNotesContext();

  //set ค่า title, before, text ให้ไม่มีค่าอะไรก่อน
  const [title, setTitle] = useState("");
  const [before, setBefore] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  //เมื่อกดปุ่ม จะเรียก fuction นี้
  const handleSubmit = async (e) => {
    e.preventDefault();

    // เอา 3 ค่า มารวมกัน แล้วให้ชื่อว่า note
    const note = { title, before, text };

    // ใช้คำสั่ง post ที่ localhost:4000/api/notes
    // แล้วส่ง note ไปด้วย
    const response = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setBefore("");
      setText("");
      dispatch({ type: "CREATE_NOTE", paybefore: json });
    }
  };

  // แต่ละช่อง input ถ้ามีการเขียนเข้าไป จะเปลี่ยนค่าที่สัมพันธ์กับตัวมัน
  // return เป็น ไฟล์ html
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Note</h3>

      <label>Note : </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Before (Date):</label>
      <input
        type="text"
        onChange={(e) => setBefore(e.target.value)}
        value={before}
      />

      <label>Text:</label>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

      <button>Add Note</button>
    </form>
  );
};

export default NoteForm;
