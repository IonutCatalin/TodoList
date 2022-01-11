import React from "react";

const Form = ({ inputText, setInputText, todos, setTodos, setStatus }) => {
	const inputTextHandler = (e) => {
		setInputText(e.target.value);
	};

	async function submitTodoHandler(e) {
		e.preventDefault();

		await fetch("http://localhost:3001/todos", {
			method: "POST",
			body: JSON.stringify({
				text: inputText,
				completed: false,
				id: Math.max(...todos.map((todo) => todo.id)) + 1,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		setInputText("");
	}

	const statusHandler = (e) => {
		setStatus(e.target.value);
	};

	return (
		<form>
			<input
				value={inputText}
				onChange={inputTextHandler}
				type="text"
				className="todo-input"
			/>
			<button onClick={submitTodoHandler} className="todo-button" type="submit">
				<i className="fas fa-plus-square"></i>
			</button>
			<div className="select">
				<select name="todos" className="filter-todo" onChange={statusHandler}>
					<option value="all">All</option>
					<option value="completed">Completed</option>
					<option value="uncompleted">Uncompleted</option>
				</select>
			</div>
		</form>
	);
};

export default Form;
