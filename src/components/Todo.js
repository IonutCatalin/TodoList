import React, { useState } from "react";

const Todo = ({
	todo,
	text,
	onTodoDelete,
	onTodoComplete,
	onTodoEdit,
	inputTextHandler,
	editInputText,
}) => {
	const [editButtonState, setEditButtonState] = useState(false);

	async function deleteTodo() {
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
