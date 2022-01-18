import React, { useState } from "react";
import { Link } from "react-router-dom";

const Todo = ({
	todo,
	text,
	onTodoDelete,
	onTodoComplete,
	onTodoEdit,
	inputTextHandler,
	editInputText,
	viewTodoHandler,
}) => {
	const [editButtonState, setEditButtonState] = useState(false);

	async function deleteTodo() {
		await fetch(`http://localhost:3001/reviews/?todoID=${todo.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const response = await fetch(`http://localhost:3001/todos/${todo.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();

		onTodoDelete(todo.id);
	}

	const saveHandler = () => {
		setEditButtonState(false);
		if (!editInputText) return;

		fetch(`http://localhost:3001/todos/${todo.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...todo,
				text: editInputText ? editInputText : todo.text,
			}),
		});

		onTodoEdit(todo);
	};

	const editHandler = () => {
		setEditButtonState(true);
	};

	const completeHandler = () => {
		fetch(`http://localhost:3001/todos/${todo.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...todo, completed: !todo.completed }),
		});
		onTodoComplete(todo);
	};

	const viewHandler = () => {
		viewTodoHandler(todo);
	};
	return (
		<div className="todo">
			<Link to={`/todos/${todo.id}`} key={todo.id} className="btn btn-primary">
				<i className="fas fa-eye"></i>
			</Link>

			{editButtonState ? (
				<input
					type="text"
					className="todo-item edit-item"
					value={editInputText}
					onChange={inputTextHandler}
				/>
			) : (
				<li className={`todo-item ${todo.completed ? "completed" : ""}`}>
					{text}
				</li>
			)}

			<button className="complete-btn" onClick={completeHandler}>
				<i className="fas fa-check"></i>
			</button>
			<button
				className="edit-btn"
				onClick={editButtonState ? saveHandler : editHandler}
			>
				<i className={!editButtonState ? `fas fa-edit` : `fas fa-save`}></i>
			</button>
			<button className="trash-btn" onClick={deleteTodo}>
				<i className="fas fa-trash"></i>
			</button>
		</div>
	);
};

export default Todo;
