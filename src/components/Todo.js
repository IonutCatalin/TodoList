import React, { useState } from "react";

const Todo = ({ todo, text, todos, setTodos }) => {
	const [editButtonState, setEditButtonState] = useState(false);
	const [editInputText, setEditInputText] = useState(text);

	const inputTextHandler = (e) => {
		setEditInputText(e.target.value);
	};

	async function deleteTodo() {
		await fetch(`http://localhost:3001/todos/${todo.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	const saveHandler = () => {
		setEditButtonState(false);
		console.log(todo.id, "edited");
		fetch(`http://localhost:3001/todos/${todo.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...todo,
				text: editInputText ? editInputText : text,
			}),
		});
	};

	const editHandler = () => {
		setEditButtonState(true);
		console.log(todo.id, "editing");
	};

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
