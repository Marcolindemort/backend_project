import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from "../models/note";
import * as NotesApi from "../network/notes_api";
import AddEditNoteDialog from "./AddEditNoteDialog";
import Note from "./Note";
import stylesUtils from "../styles/utils.module.css";

const NotesPageLoggedInView = () => {
	const [notes, setNotes] = useState<NoteModel[]>([]);
	const [notesLoading, setNotesLoading] = useState(true);
	const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

	const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
	const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

	useEffect(() => {
		const loadNotes = async () => {
			try {
				setShowNotesLoadingError(false);
				setNotesLoading(true);
				const notes = await NotesApi.fetchNotes();
				setNotes(notes);
			} catch (error) {
				console.error(error);
				setShowNotesLoadingError(true);
			} finally {
				setNotesLoading(false);
			}
		};
		loadNotes();
	}, []);

	const deleteNote = async (note: NoteModel) => {
		try {
			await NotesApi.deleteNote(note._id);
			setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
		} catch (error) {
			console.error(error);
			alert(error);
		}
	};

	const notesGrid = (
		<Row xs={1} md={2} lg={3}>
			{notes.map((note, index) => (
				<Col key={note._id} className="postit">
					<Note note={note} index={index} onDeleteNoteClicked={deleteNote} onNoteClicked={setNoteToEdit} />
				</Col>
			))}
		</Row>
	);

	return (
		<>
			<Button
				className={`mb-5 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
				onClick={() => setShowAddNoteDialog(true)}>
				<FaPlus />
				Add new note
			</Button>
			{notesLoading && <Spinner animation="border" variant="primary" />}
			{showNotesLoadingError && <p className="font">Something went wrong. Please referesh the page</p>}
			{!notesLoading && !showNotesLoadingError && (
				<>{notes.length > 0 ? notesGrid : <p className="font">You have nothing to do yet</p>}</>
			)}
			{showAddNoteDialog && (
				<AddEditNoteDialog
					onDismiss={() => setShowAddNoteDialog(false)}
					onNoteSaved={(newNote) => {
						setNotes([...notes, newNote]);
						setShowAddNoteDialog(false);
					}}
				/>
			)}
			{noteToEdit && (
				<AddEditNoteDialog
					noteToEdit={noteToEdit}
					onDismiss={() => setNoteToEdit(null)}
					onNoteSaved={(updatedNote) => {
						setNotes(notes.map((existingNote) => (existingNote._id === updatedNote._id ? updatedNote : existingNote)));
						setNoteToEdit(null);
					}}
				/>
			)}
		</>
	);
};

export default NotesPageLoggedInView;
