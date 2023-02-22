import "./App.css";
import Chatroom from "./pages/chatroom";
import Lobby from "./pages/lobby";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Lobby />} />
					<Route path="/chat/:room_name" element={<Chatroom />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
