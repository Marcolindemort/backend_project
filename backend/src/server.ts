import app from "./app";
import env from "./utility/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose
	.connect(env.MONGO_URI)
	.then(() => {
		console.log("mongoose connected");
		app.listen(port, () => {
			console.log("Server running on port" + port);
		});
	})
	.catch(console.error);
