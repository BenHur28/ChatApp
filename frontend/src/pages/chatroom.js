import "../App.css";
import React, { useRef, useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useParams, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";

const Chatroom = () => {
	const dummy = useRef();
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

	useEffect(() => {
		return dummy.current.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const onButtonClicked = (e) => {
		client.send(
			JSON.stringify({
				user: username,
				message: message,
			})
		);
		console.log(messages);
		dummy.current.scrollIntoView({ behavior: "smooth" });
	};

	let messageList = messages.map((user, index) => {
		let messageClass = "";
		let color = null;
		const avatar = user.user.slice(0, 1);
		if (username === user.user) {
			messageClass = "sent";
			color = "#0b93f6";
		} else {
			messageClass = "received";
			color = "#06cc8d";
		}
		return (
			<div key={index} className={`message ${messageClass}`}>
				<Avatar sx={{ bgcolor: color }}>{avatar}</Avatar>
				<p key={index}>{user.msg}</p>
			</div>
		);
	});

	return (
		<div className="container">
			<h2>Room Name:{room_name}</h2>
			<h2>User name:{username}</h2>
			<div className="chat-div">
				<Paper variant="outlined" style={{ height: 500, maxHeight: 400, overflow: "auto" }}>
					{messageList}
					<div ref={dummy}></div>
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
