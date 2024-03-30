import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import AOS from "aos";
import "aos/dist/aos.css";
import { Modal, Button } from "react-bootstrap";
import { Trash, FolderPlus, PencilSquare, PersonHeart, PersonHearts } from "react-bootstrap-icons";
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
      disable: "phone",
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
    <div className="container-fluid text-white bg-black">
      <div className="row  m-3 p-3">
        <h3>
        Suggestion/Feedback
        </h3>
      </div>
      <div className="row">
        <div className="col-md-1 text-right">
          <Button variant="success" onClick={handleShow}>
            <FolderPlus size={20} />
          </Button>
        </div>
      </div>
      <div className="row centered-card  rounded p-4 border border-secondary m-2">
        <h4>Notes</h4>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Any suggestion/feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row justify-content-center">
              <label htmlFor="nameInput" className="form-label">
                Your Name:
              </label>
              <input
                type="text"
                className="form-control border-bottom"
                id="nameInput"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="noteInput" className="form-label">
                Note:
              </label>
              <textarea
                className="form-control border-bottom"
                id="noteInput"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                required
              ></textarea>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
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
        </Modal>

        {notes.map((note) => (
          <div
            data-aos="flip-left"
            className="card col-sm-6 m-1 bg-dark text-white"
          >
            <h5 className="card-header text-start"> <PersonHeart size={30} className="pr-5"/> {note.name}</h5>
            <div className="card-body">
              <p className="card-text">Note: {note.note}</p>
              <button
                onClick={() => handleEdit(note)}
                className="btn btn-info m-2"
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
        ))}
      </div>
    </div>
  );
};

export default Notes;
