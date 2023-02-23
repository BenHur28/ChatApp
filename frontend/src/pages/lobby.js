import React from "react";
import { useNavigate } from "react-router-dom";

const Lobby = () => {
	const navigate = useNavigate();

	const onSubmitHandler = () => {
		const room = document.querySelector("#go-to-room");
		const user = document.querySelector("#username");
		const room_name = room.value;
		const username = user.value;
		console.log(username);
		navigate(`/chat/${room_name}`, { state: { username: username } });
	};

	return (
		<div>
			<input id="go-to-room" type="text"></input>
			<input id="username" type="text"></input>
			<button onClick={onSubmitHandler}>Go To Room</button>
		</div>
	);
};

export default Lobby;
