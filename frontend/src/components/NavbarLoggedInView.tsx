import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/users";
import * as NotesApi from "../network/notes_api";

interface NavbarLoggedInViewProps {
	user: User;
	onLogoutSuccessful: () => void;
}

const NavbarLoggedInView = ({ user, onLogoutSuccessful }: NavbarLoggedInViewProps) => {
	const logout = async () => {
		try {
			await NotesApi.logout();
			onLogoutSuccessful();
		} catch (error) {
			alert(error);
			console.error(error);
		}
	};

	return (
		<>
			<Navbar.Text className="me-3 font">Logged in as: {user.username}</Navbar.Text>
			<Button onClick={logout}>Logout</Button>
		</>
	);
};

export default NavbarLoggedInView;
