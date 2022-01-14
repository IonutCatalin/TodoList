import React, { useEffect, useState } from "react";
import Form from "./Form";
import Todo from "./Todo";

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [status, setStatus] = useState("all");
	const [filteredTodos, setFilteredTodos] = useState([]);
	const [editInputText, setEditInputText] = useState("");

	const inputTextHandler = (e) => {
		setEditInputText(e.target.value);
	};

	const statusHandler = (e) => {
		setStatus(e.target.value);
	};

	const filterHandler = () => {
		switch (status) {
			case "completed":
				setFilteredTodos(todos.filter((todo) => todo.completed === true));
				break;
			case "uncompleted":
				setFilteredTodos(todos.filter((todo) => todo.completed === false));
				break;
			default:
				setFilteredTodos(todos);
				break;
		}
	};

	async function getTodos() {
		const response = await fetch("http://localhost:3001/todos", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		setTodos(data);
	}

	const onTodoAdd = (todo) => {
		setTodos([...todos, todo]);
	};

	const onTodoDelete = (todo) => {
		const todoToBeRemovedIndex = todos.filter((t) => todo !== t.id);
		setTodos(todoToBeRemovedIndex);
	};

	const onTodoComplete = (todo) => {
		const todoToBeCompletedIndex = todos.findIndex((t) => todo.id === t.id);
		todos[todoToBeCompletedIndex].completed =
			!todos[todoToBeCompletedIndex].completed;

		setTodos([...todos]);
	};

	const onTodoEdit = (todo) => {
		const todoToBeEditedIndex = todos.findIndex((t) => todo.id === t.id);
		if (!editInputText) return;
		todos[todoToBeEditedIndex].text = editInputText;

		setTodos([...todos]);
		setEditInputText("");
	};

	useEffect(() => {
		getTodos();
	}, []);

	useEffect(() => {
		filterHandler();
	}, [todos, status]);

	return (
		<>
			<Form
				setStatus={setStatus}
				onTodoAdd={onTodoAdd}
				status={status}
				statusHandler={statusHandler}
			/>
			<div className="todo-container">
				<ul className="todo-list">
					{filteredTodos.map((todo) => (
						<Todo
							key={todo.id}
							text={todo.text}
							todo={todo}
							onTodoDelete={onTodoDelete}
							onTodoComplete={onTodoComplete}
							onTodoEdit={onTodoEdit}
							inputTextHandler={inputTextHandler}
							editInputText={editInputText}
						/>
					))}
				</ul>
			</div>
		</>
	);
};

export default TodoList;
