import { Container } from "react-bootstrap";
import NotesPageLoggedInView from "../components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";
import { User } from "../models/users";

interface NotesPageProps {
	loggedInUser: User | null;
}

const NotesPage = ({ loggedInUser }: NotesPageProps) => {
	return (
		<Container>
			<>{loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}</>
		</Container>
	);
};

export default NotesPage;
