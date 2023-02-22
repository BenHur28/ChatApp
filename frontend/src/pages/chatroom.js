import "../App.css";
import React, { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

const Chatroom = () => {
	const { room_name } = useParams();
	const [message, setMessage] = useState(null);
	const [msg, setMsg] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		client.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log("message received");
			console.log(data.message.value);
			setMsg(data.message.value);
			setUser("User1");
			// const data = JSON.parse(event.data);
			// document.querySelector("#chat-log").value += data.message + "\n";
		};
	}, []);

	const client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/chat/${room_name}/`); //gets room_name from the state and connects to the backend server

	// window.onload = () => {
	// 	document.querySelector("#chat-message-submit").onclick = (event) => {
	// 		const messageInputDom = document.querySelector(".chat-input");
	// 		const message = messageInputDom.value;
	// 		console.log(message);
	// 		client.send(
	// 			JSON.stringify({
	// 				message: message,
	// 			})
	// 		);
	// 	};
	// };

	const onButtonClicked = (e) => {
		console.log("message sent");
		console.log(message);
		client.send(
			JSON.stringify({
				message: message,
			})
		);
	};

	// client.onmessage = (event) => {
	// 	console.log("message received");
	// 	console.log(event.data);
	// 	// const data = JSON.parse(event.data);
	// 	// document.querySelector("#chat-log").value += data.message + "\n";
	// };

	return (
		<div className="container">
			<h2>Room Name:{room_name}</h2>
			<div className="chat-div">
				<Paper variant="outlined">
					<Card>
						<CardHeader title={user} subheader={msg} />
					</Card>
				</Paper>
				{/* <textarea disabled id="chat-log" cols="45" rows="30"></textarea> */}
				<TextField
					className="chat-input"
					id="outlined-basic"
					label="Type a message"
					variant="outlined"
					onChange={(e) => {
						setMessage({ value: e.target.value });
					}}
				></TextField>
				<Button type="submit" variant="contained" id="chat-message-submit" onClick={onButtonClicked}>
					Send Message
				</Button>
			</div>
		</div>
	);
};

export default Chatroom;
