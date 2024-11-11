import { useForm } from "react-hook-form";
import { User } from "../models/users";
import { LoginCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import { useState } from "react";
import { UnauthorizedError } from "../errors/http_errors";

interface LoginModalProps {
	onDismiss: () => void;
	onLoginSuccessful: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
	const [errorText, setErrorText] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginCredentials>();

	const onSubmit = async (credentials: LoginCredentials) => {
		try {
			const user = await NotesApi.login(credentials);
			onLoginSuccessful(user);
		} catch (error) {
			if (error instanceof UnauthorizedError) {
				setErrorText(error.message);
			} else {
				alert(error);
			}
			console.error(error);
		}
	};

	return (
		<Modal show onHide={onDismiss}>
			<Modal.Header closeButton>
				<Modal.Title>Login</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				{errorText && <Alert variant="danger">{errorText}</Alert>}
				<Form onSubmit={handleSubmit(onSubmit)}>
					<TextInputField
						name="username"
						label="Username"
						type="text"
						placeholde="Username"
						register={register}
						registerOptions={{ required: "Required" }}
						error={errors.username}
					/>
					<TextInputField
						name="password"
						label="Password"
						type="password"
						placeholde="Password"
						register={register}
						registerOptions={{ required: "Required" }}
						error={errors.password}
					/>
					<Button type="submit" disabled={isSubmitting} className="w-100">
						Login
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default LoginModal;
