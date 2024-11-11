import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/users";
import NavbarLoggedInView from "./NavbarLoggedInView";
import NavbarLoggedOutView from "./NavbarLoggedOutView";
import { Link } from "react-router-dom";

interface NavbarProps {
	loggedInUser: User | null;
	onSignUpClicked: () => void;
	onLoginClicked: () => void;
	onLogoutSuccesful: () => void;
}

const MyNavbar = ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccesful }: NavbarProps) => {
	return (
		<Navbar>
			<Container>
				<Navbar.Brand as={Link} to="/" className="font">
					HOME
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="main-navbar" />
				<Navbar.Collapse id="main-navbar">
					<Nav>
						<Nav.Link as={Link} to="/privacy" className="font">
							Privacy
						</Nav.Link>
					</Nav>
					<Nav className="ms-auto"></Nav>
					{loggedInUser ? (
						<NavbarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccesful} />
					) : (
						<NavbarLoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default MyNavbar;
