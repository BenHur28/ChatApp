import React from "react";
import { useNavigate } from "react-router-dom";

const Lobby = () => {
	const navigate = useNavigate();

	const onSubmitHandler = () => {
		const room = document.querySelector("#go-to-room");
		const room_name = room.value;
		navigate(`/chat/${room_name}`);
	};

	return (
		<div>
			<input id="go-to-room" type="text"></input>
			<button onClick={onSubmitHandler}>Go To Room</button>
		</div>
	);
};

export default Lobby;
