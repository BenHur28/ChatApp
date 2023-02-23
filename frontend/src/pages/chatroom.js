import "../App.css";
import React, { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useParams, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

const Chatroom = () => {
	const { room_name } = useParams();
	const location = useLocation();
	const username = location.state.username;
	const [message, setMessage] = useState(null);
	const [messages, setMessages] = useState([]);
	const client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/chat/${room_name}/`);

	useEffect(() => {
		client.onopen = () => {
			console.log("Websocket Client Connected");
		};
		client.onmessage = (event) => {
			const data = JSON.parse(event.data);
			if (data) {
				console.log(messages);
				setMessages((messages) => [...messages, { user: data.user, msg: data.message.value }]);
			}
		};
	}, []);

	const onButtonClicked = (e) => {
		client.send(
			JSON.stringify({
				user: username,
				message: message,
			})
		);
	};

	let messageList = messages.map((user, index) => {
		return <CardHeader key={index} title={user.user} subheader={user.msg} />;
	});

	return (
		<div className="container">
			<h2>Room Name:{room_name}</h2>
			<h2>User name:{username}</h2>
			<div className="chat-div">
				<Paper variant="outlined">
					<Card>{messageList}</Card>
				</Paper>
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
