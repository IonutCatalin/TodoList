import React from "react";

const Todo = ({ todo, text, todos, setTodos }) => {
	async function deleteTodo() {
		await fetch(`http://localhost:3001/todos/${todo.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	const completeHandler = () => {
		fetch(`http://localhost:3001/todos/${todo.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...todo, completed: !todo.completed }),
		});
	};

	return (
		<div className="todo">
			<li className={`todo-item ${todo.completed ? "completed" : ""}`}>
				{text}
			</li>
			<button className="complete-btn" onClick={completeHandler}>
				<i className="fas fa-check"></i>
			</button>
			<button className="trash-btn" onClick={deleteTodo}>
				<i className="fas fa-trash"></i>
			</button>
		</div>
	);
};

export default Todo;
