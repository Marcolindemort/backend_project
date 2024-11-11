import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../utility/assertIsDefined";

export const getNotes: RequestHandler = async (req, res, next) => {
	const authenticatedUserId = req.session.userId;

	try {
		assertIsDefined(authenticatedUserId);
		const notes = await NoteModel.find({ userId: authenticatedUserId });
		res.status(200).json(notes);
	} catch (error) {
		next(error);
	}
};

export const getOneNote: RequestHandler = async (req, res, next) => {
	const noteId = req.params.noteId;
	const authenticatedUserId = req.session.userId;

	try {
		assertIsDefined(authenticatedUserId);

		if (!mongoose.isValidObjectId(noteId)) {
			throw createHttpError(400, "ID nota non valido");
		}

		const note = await NoteModel.findById(noteId);

		if (!note) {
			throw createHttpError(404, "Nota non trovata");
		}

		if (!note.userId.equals(authenticatedUserId)) {
			throw createHttpError(401, "Non puoi accedere a questa nota");
		}
		res.status(200).json(note);
	} catch (error) {
		next(error);
	}
};

interface CreateNoteBody {
	text?: string;
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
	const text = req.body.text;
	const authenticatedUserId = req.session.userId;

	try {
		assertIsDefined(authenticatedUserId);

		if (!text) {
			throw createHttpError(400, "La nota deve avere un testo");
		}

		const newNote = await NoteModel.create({
			userId: authenticatedUserId,
			text: text,
		});

		res.status(201).json(newNote);
	} catch (error) {
		next(error);
	}
};

interface UpdateNoteParams {
	noteId: string;
}

interface UpdateNoteBody {
	text?: string;
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (
	req,
	res,
	next
) => {
	const noteId = req.params.noteId;
	const newText = req.body.text;
	const authenticatedUserId = req.session.userId;

	try {
		assertIsDefined(authenticatedUserId);

		if (!mongoose.isValidObjectId(noteId)) {
			throw createHttpError(400, "ID nota non valido");
		}

		if (!newText) {
			throw createHttpError(400, "La nota da aggiornare deve avere un titolo");
		}

		const note = await NoteModel.findByIdAndUpdate(noteId, { text: newText }, { new: true });

		if (!note) {
			throw createHttpError(404, "Nota non trovata");
		}

		if (!note.userId.equals(authenticatedUserId)) {
			throw createHttpError(401, "Non puoi accedere a questa nota");
		}

		res.status(200).json(note);
	} catch (error) {
		next(error);
	}
};

export const deleteNote: RequestHandler = async (req, res, next) => {
	const noteId = req.params.noteId;
	const authenticatedUserId = req.session.userId;

	try {
		assertIsDefined(authenticatedUserId);

		if (!mongoose.isValidObjectId(noteId)) {
			throw createHttpError(400, "Id nota non valido");
		}

		const note = await NoteModel.findById(noteId);

		if (!note) {
			throw createHttpError(404, "Nota da eliminare non trovata");
		}

		if (!note.userId.equals(authenticatedUserId)) {
			throw createHttpError(401, "Non puoi accedere a questa nota");
		}

		await note.deleteOne();

		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};
