import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./utility/validateEnv";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(
	session({
		secret: env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 60 * 60 * 1000,
			secure: false,
			httpOnly: true,
			sameSite: "lax",
		},
		rolling: true,
		store: MongoStore.create({
			mongoUrl: env.MONGO_URI,
			ttl: 60 * 60,
		}),
	})
);

app.use("/api/users", userRoutes);
app.use("/api/notes", requiresAuth, notesRoutes);

app.use((req, res, next) => {
	next(createHttpError(404, "Endpoint non trovato"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
	console.error(error);
	let errorMessage = "C'è stato un erroraccio";
	let statusCode = 500;
	if (isHttpError(error)) {
		statusCode = error.status;
		errorMessage = error.message;
	}
	res.status(statusCode).json({ error: errorMessage });
});

export default app;
