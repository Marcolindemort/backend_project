import { MdDelete } from "react-icons/md";
import { Note as NoteModel } from "../models/note";

interface NoteProps {
	note: NoteModel;
	onNoteClicked: (note: NoteModel) => void;
	onDeleteNoteClicked: (note: NoteModel) => void;
	index: number;
}

const Note = ({ note, onNoteClicked, onDeleteNoteClicked, index }: NoteProps) => {
	const { text } = note;
	return (
		<div
			onClick={() => onNoteClicked(note)}
			className="h-100 d-flex flex-column align-items-center justify-content-evenly">
			<div>
				<div>
					<p className="font">To Do {index + 1}:</p>
				</div>
				<div>
					<p role="button" className="font">
						{text && text.length > 50 ? text.slice(0, 49) + "..." : text}
					</p>
				</div>
			</div>
			<MdDelete
				role="button"
				className="text-muted"
				onClick={(e) => {
					onDeleteNoteClicked(note);
					e.stopPropagation();
				}}
			/>
		</div>
	);
};

export default Note;
