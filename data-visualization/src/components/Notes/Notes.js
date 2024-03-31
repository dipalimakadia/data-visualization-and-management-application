import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import AOS from "aos";
import "aos/dist/aos.css";
import { Modal, Button } from "react-bootstrap";
import {
  Trash,
  FolderPlus,
  PencilSquare,
  PersonHeart,
} from "react-bootstrap-icons";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const Notes = () => {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [show, setShow] = useState(false);
  const [colors] = useState([
    "#846470",
    "#023641",
    "#562c29",
    "#ab5852",
    "#cb9979",
    "#035162",
    "#8e9373",
    "#a19870",
    "#d69e49",
    "#838469",
    "#657268",
    "#476066",
    "#5e1675",
    "#3ecd5e",
    "#715660",
    "#036b82",
    "#528279",
    "#566071",
    "#c39f72",
    "#667762",
    "#f9b234",
    "#952aff",
    "#cd3e94",
    "#4c49ea",
    "#034452",
  ]);

  const handleClose = () => {
    setName("");
    setNote("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const notesRef = collection(db, "notes");

  useEffect(() => {
    fetchNotes();
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);

  const fetchNotes = async () => {
    const notesSnapshot = await getDocs(notesRef);
    const notesData = notesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setNotes(notesData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingNoteId) {
        await updateDoc(doc(db, "notes", editingNoteId), { name, note });

        alert("Note updated successfully!");
      } else {
        await addDoc(notesRef, { name, note });
        alert("Note added successfully!");
      }
      // Clear form fields after adding/updating data
      setName("");
      setNote("");
      setEditingNoteId(null);
      fetchNotes();
    } catch (error) {
      alert("Error. Please try again.");
    }
    handleClose();
  };

  const handleEdit = (note) => {
    handleShow(true);
    setName(note.name);
    setNote(note.note);
    setEditingNoteId(note.id);
  };

  const handleDelete = async (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      await deleteDoc(doc(db, "notes", noteId));
      fetchNotes();
      alert("Note deleted successfully!");
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-blackShade">
      <div className="row justify-content-center m-5">
        <h2 className="font-400"> Suggestion/Feedback</h2>
      </div>
      <div className="row">
        <div className="col-lg-2 col-md-3 col-sm-12">
          <Button variant="success" onClick={handleShow}>
            <FolderPlus size={20} />
          </Button>
        </div>
      </div>

      <div className="row centered-card font-300 rounded p-4 m-2">
        <Modal show={show} onHide={handleClose}>
          <div className="note font-color-greyLight">
            <div className="note-item-bg bg-greyish"></div>
            <Modal.Header>
              <Modal.Title>
                <div className="modal-title">Any suggestion/feedback</div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="modal-body">
                <label htmlFor="nameInput" className="form-label">
                  Your Name:
                </label>
                <input
                  type="text"
                  className="form-control border-bottom mb-3"
                  id="nameInput"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="noteInput" className="form-label">
                  Note:
                </label>
                <textarea
                  className="form-control border-bottom"
                  id="noteInput"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn-light" onClick={handleClose}>
                Close
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-success"
                disabled={name === "" || note === ""}
              >
                {editingNoteId ? "Update Note" : "Add Note"}
              </Button>
            </Modal.Footer>
          </div>
        </Modal>

        <div className="row font-300">
          {notes.map((note, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              className="col-lg-4 col-md-6 col-sm-12"
            >
              <div
                className="note-item"
                style={{ backgroundColor: colors[index % colors.length] }}
              >
                <div className="note">
                  <div
                    className="note-item-bg"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></div>

                  <div className="note-title-box">
                    <PersonHeart size={25} />
                    <span className="note-title"> {note.name} </span>
                  </div>

                  <div className="note-body height-overflow mt-2">
                    {note.note}
                  </div>

                  <div className="note-title-box">
                    <button
                      onClick={() => handleEdit(note)}
                      className="btn btn-light m-2"
                    >
                      <PencilSquare size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="btn btn-danger"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
