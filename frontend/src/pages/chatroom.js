import React from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const Chatroom = () => {
	const client = new W3CWebSocket("ws://127.0.0.1:8000/ws/chat/lobby/"); //gets room_name from the state and connects to the backend server

	const onSubmit = () => {
		client.send(
			JSON.stringify({
				message: "hello",
			})
		);
	};

	return (
		<div>
			chatroom test
			<button onClick={onSubmit} type="submit">
				Send Hello
			</button>
		</div>
	);
};

export default Chatroom;
