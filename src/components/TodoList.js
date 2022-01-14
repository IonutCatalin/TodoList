import React, { useEffect, useState } from "react";
import Form from "./Form";
import Todo from "./Todo";

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [status, setStatus] = useState("all");
	const [filteredTodos, setFilteredTodos] = useState([]);
	const [inputText, setInputText] = useState("");

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
		console.log("get la initialiare todos", todos);
	}

	const onTodoAdd = (todo) => {
		setTodos([...todos, todo]);
		console.log("adaugare pe frontend", todos);
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

	useEffect(() => {
		getTodos();
	}, []);

	useEffect(() => {
		filterHandler();
	}, [status]);

	return (
		<>
			<Form setStatus={setStatus} onTodoAdd={onTodoAdd} />
			<div className="todo-container">
				<ul className="todo-list">
					{todos.map((todo) => (
						<Todo
							key={todo.id}
							text={todo.text}
							setTodos={setTodos}
							todos={todos}
							todo={todo}
							onTodoDelete={onTodoDelete}
							onTodoComplete={onTodoComplete}
						/>
					))}
				</ul>
			</div>
		</>
	);
};

export default TodoList;
