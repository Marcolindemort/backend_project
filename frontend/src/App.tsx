import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginModal from "./components/LoginModal";
import MyNavbar from "./components/MyNavbar";
import SignUpModal from "./components/SignUpModal";
import { User } from "./models/users";
import * as NotesApi from "./network/notes_api";
import NotesPage from "./pages/NotesPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivacyPage from "./pages/PrivacyPage";

function App() {
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);

	useEffect(() => {
		const fetchLoggedInUser = async () => {
			try {
				const user = await NotesApi.getLoggedInUser();
				setLoggedInUser(user);
			} catch (error) {
				console.error(error);
			}
		};
		fetchLoggedInUser();
	}, []);

	return (
		<BrowserRouter>
			<div className="App">
				<MyNavbar
					loggedInUser={loggedInUser}
					onLoginClicked={() => setShowLoginModal(true)}
					onLogoutSuccesful={() => setLoggedInUser(null)}
					onSignUpClicked={() => setShowSignUpModal(true)}
				/>
				<h1 className="mt-5 mb-5 text-white titleFont">Note To Do</h1>
				<Container className="p-3">
					<Routes>
						<Route path="/" element={<NotesPage loggedInUser={loggedInUser} />} />
						<Route path="/privacy" element={<PrivacyPage />} />
						<Route path="/*" element={<NotFoundPage />} />
					</Routes>
				</Container>

				{showSignUpModal && (
					<SignUpModal
						onDismiss={() => setShowSignUpModal(false)}
						onSignUpSuccessful={(user) => {
							setLoggedInUser(user);
							setShowSignUpModal(false);
						}}
					/>
				)}
				{showLoginModal && (
					<LoginModal
						onDismiss={() => setShowLoginModal(false)}
						onLoginSuccessful={(user) => {
							setLoggedInUser(user);
							setShowLoginModal(false);
						}}
					/>
				)}
			</div>
		</BrowserRouter>
	);
}

export default App;
