import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import TextInputField from "./form/TextInputField";

interface AddEditNoteDialogProps {
	noteToEdit?: Note;
	onDismiss: () => void;
	onNoteSaved: (note: Note) => void;
}

const AddEditNoteDialog = ({ noteToEdit, onDismiss, onNoteSaved }: AddEditNoteDialogProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<NoteInput>({
		defaultValues: {
			text: noteToEdit?.text || "",
		},
	});

	const onSubmit = async (input: NoteInput) => {
		try {
			let noteResponse: Note;
			if (noteToEdit) {
				noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
			} else {
				noteResponse = await NotesApi.createNote(input);
			}
			onNoteSaved(noteResponse);
		} catch (error) {
			console.error(error);
			alert(error);
		}
	};

	return (
		<Modal show onHide={onDismiss}>
			<Modal.Header closeButton>
				<Modal.Title>{noteToEdit ? "Edit note" : "Add note"}</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
					<TextInputField
						name="text"
						label="Text"
						as="textarea"
						rows={5}
						placeholder="Text"
						register={register}
						error={errors.text}
					/>
				</Form>
			</Modal.Body>

			<Modal.Footer>
				<Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default AddEditNoteDialog;
