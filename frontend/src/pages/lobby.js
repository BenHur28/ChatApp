import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const Lobby = () => {
	const navigate = useNavigate();
	const [room, setRoom] = useState(null);
	const [user, setUser] = useState(null);

	const onSubmitHandler = () => {
		console.log(room);
		const room_name = room.value;
		const username = capitalize(user.value);
		const avatar_color = randomColor();
		navigate(`/chat/${room_name}`, { state: { username: username, avatar_color: avatar_color } });
	};

	function randomColor() {
		let hex = Math.floor(Math.random() * 0xffffff);
		let color = "#" + hex.toString(16);
		return color;
	}

	function capitalize(s) {
		return s[0].toUpperCase() + s.slice(1);
	}

	return (
		<div className="container">
			<div className="chat-div">
				<TextField
					className="room-input"
					id="outlined-basic"
					label="Room name"
					variant="outlined"
					onChange={(e) => {
						setRoom({ value: e.target.value });
					}}
				></TextField>
				<TextField
					className="user-input"
					id="outlined-basic"
					label="Username"
					variant="outlined"
					onChange={(e) => {
						setUser({ value: e.target.value });
					}}
				></TextField>
				<Button type="submit" variant="contained" id="chat-message-submit" onClick={onSubmitHandler}>
					Start Chatting!
				</Button>
			</div>
		</div>
	);
};

export default Lobby;
