import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

const TodoDetails = () => {
	const { id } = useParams();
	const [todo, setTodo] = useState({});

	async function getTodo() {
		const response = await fetch(`http://localhost:3001/todos/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		setTodo(data);
	}

	useEffect(() => {
		getTodo();
	}, []);
	return (
		<div style={{ margin: "50px 50px", fontSize: "2rem" }}>
			<div>TODO PAGE with id - {id}</div>
			<div>{todo.text}</div>
			<div>
				{todo.completed === true ? "Status: Completed" : "Status: Uncompleted"}
			</div>
			<Link to="/">Go Back</Link>
		</div>
	);
};

export default TodoDetails;
