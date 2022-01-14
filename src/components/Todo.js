import React, { useState } from "react";

const Todo = ({
	todo,
	text,
	todos,
	setTodos,
	onTodoDelete,
	onTodoComplete,
}) => {
	const [editButtonState, setEditButtonState] = useState(false);
	const [editInputText, setEditInputText] = useState(text);

	const inputTextHandler = (e) => {
		setEditInputText(e.target.value);
	};

	async function deleteTodo() {
		const response = await fetch(`http://localhost:3001/todos/${todo.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		console.log("ce e aici", data);

		onTodoDelete(todo.id);

		console.log("dupa stergere in baza de date", todos);
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
		console.log("todoid", todo.id);
		console.log("todo", todo);
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
