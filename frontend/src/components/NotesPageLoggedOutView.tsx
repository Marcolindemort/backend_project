import { Col, Container, Row } from "react-bootstrap";

const NotesPageLoggedOutView = () => {
	return (
		<Container>
			<Row className="gy-3 justify-content-center gap-2">
				<Col className="postit p-2 d-flex flex-column justify-content-center" xs={12} md={4} lg={3}>
					<div className="d-flex justify-content-center align-items-center">
						<p className="font px-1">Welcome!</p>
					</div>
				</Col>
				<Col className="postit p-2 d-flex flex-column justify-content-center" xs={12} md={4} lg={3}>
					<div className="d-flex justify-content-center align-items-center">
						<p className="font px-1">
							This is my Note <br /> To-Do App! Please enjoy!
						</p>
					</div>
				</Col>
				<Col className="postit p-2 d-flex flex-column justify-content-center" xs={12} md={4} lg={3}>
					<div className="d-flex justify-content-center align-items-center">
						<p className="font px-1">Made with React, Bootstrap and MERN!</p>
					</div>
				</Col>
				<Col className="postit p-2 d-flex flex-column justify-content-center" xs={12} md={4} lg={3}>
					<div className="d-flex justify-content-center align-items-center">
						<p className="font px-1">
							By: Marco Mandolini -
							<a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/marco-mandolini/">
								LinkedIn
							</a>
						</p>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default NotesPageLoggedOutView;
