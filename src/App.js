import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoDetails from "./components/TodoDetails";
function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" element={<TodoList />}></Route>

					<Route path="/todos/:id" element={<TodoDetails />}></Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
