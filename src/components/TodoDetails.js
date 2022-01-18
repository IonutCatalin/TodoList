import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

const TodoDetails = () => {
	const { id } = useParams();
	const [todo, setTodo] = useState({});
	// const [inputText, setInputText] = useState("");
	const [reviews, setReviews] = useState([]);

	const [reviewInfos, setReviewInfos] = useState({
		rating: "5 stars",
		message: "",
		date: new Date().getFullYear(),
	});

	const onTodoAddReview = (review) => {
		setReviews([...reviews, review]);
	};

	const ratingHandler = (e) => {
		const newData = { ...reviewInfos };
		newData[e.target.name] = e.target.value;
		setReviewInfos(newData);

		console.log(newData);
	};
	// const inputTextHandler = (e) => {
	// 	setInputText(e.target.value);
	// };

	async function getTodo() {
		const response = await fetch(`http://localhost:3001/todos/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		setTodo(data);
		console.log(todo);
	}

	async function getReviews() {
		const response = await fetch(`http://localhost:3001/reviews?todoID=${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		setReviews(data);
		console.log("reviews", reviews);
	}

	async function submitReviewHandler(e) {
		const { rating, message } = reviewInfos;

		e.preventDefault();
		//if (!rating || !message) return;

		try {
			const response = await fetch(`http://localhost:3001/reviews`, {
				method: "POST",
				body: JSON.stringify({
					message: reviewInfos.message,
					rating: reviewInfos.rating,
					todoID: String(id),
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			onTodoAddReview(data);
		} catch (err) {
			console.log(err);
		}

		// getReviewList();  get toate reviewurile
		setReviewInfos({ ...reviewInfos, message: "" });
	}

	useEffect(() => {
		getTodo();
	}, []);

	useEffect(() => {
		getReviews();
	}, []);
	return (
		<>
			<div style={{ margin: "50px 50px", fontSize: "2rem" }}>
				<div>TODO PAGE with id - {id}</div>
				<div>{todo.text}</div>
				<div>
					{todo.completed === true
						? "Status: Completed"
						: "Status: Uncompleted"}
				</div>
				<Link to="/">Go Back</Link>
			</div>
			<form>
				<textarea
					type="text"
					className="todo-input"
					name="message"
					value={reviewInfos.message}
					onChange={ratingHandler}
				/>

				<div className="select">
					<select
						name="rating"
						className="filter-todo"
						onChange={(e) => {
							ratingHandler(e);
						}}
						value={reviewInfos.rating}
					>
						<option value="5 stars">5 stars</option>
						<option value="4 stars">4 stars</option>
						<option value="3 stars">3 stars</option>
						<option value="2 stars">2 stars</option>
						<option value="1 star">1 star</option>
					</select>
				</div>
				<button
					onClick={submitReviewHandler}
					className="todo-button"
					type="submit"
				>
					{" "}
					Submit a review
					<i className="fas fa-plus-square"></i>
				</button>
			</form>
			<div
				style={{
					width: "250px",
					margin: "0 auto",
				}}
			>
				{reviews.map((review) => {
					return (
						<li
							key={review.id}
							className="todo-item"
							style={{
								display: "flex",
								flexDirection: "row",

								float: "right",
							}}
						>
							{review.message} {<div style={{ marginRight: "10px" }}></div>}
							{review.rating === "5 stars" ? (
								<div>
									<i className="fas fa-star" style={{ color: "yellow" }}></i>
									<i className="fas fa-star" style={{ color: "yellow" }}></i>
									<i className="fas fa-star" style={{ color: "yellow" }}></i>
									<i className="fas fa-star" style={{ color: "yellow" }}></i>
									<i className="fas fa-star" style={{ color: "yellow" }}></i>
								</div>
							) : (
								<div></div>
							)}
							{review.rating === "4 stars" ? (
								<div>
									<i className="fas fa-star" style={{ color: "yellow" }}></i>
									<i className="fas fa-star" style={{ color: "yellow" }}></i>
									<i className="fas fa-star" style={{ color: "yellow" }}></i>
									<i className="fas fa-star" style={{ color: "yellow" }}></i>
									<i className="fas fa-star"></i>
								</div>
							) : (
								<div></div>
							)}
							{review.rating === "3 stars" ? (
								<div>
									<i className="fas fa-star" style={{ color: "yellow" }}></i>
									<i className="fas fa-star" style={{ color: "yellow" }}></i>
									<i className="fas fa-star" style={{ color: "yellow" }}></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
								</div>
							) : (
								<div></div>
							)}
							{review.rating === "2 stars" ? (
								<div>
									<i className="fas fa-star" style={{ color: "yellow" }}></i>
									<i className="fas fa-star" style={{ color: "yellow" }}></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
								</div>
							) : (
								<div></div>
							)}
							{review.rating === "1 star" ? (
								<div>
									<i className="fas fa-star" style={{ color: "yellow" }}></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
									<i className="fas fa-star"></i>
								</div>
							) : (
								<div></div>
							)}
						</li>
					);
				})}
			</div>
		</>
	);
};

export default TodoDetails;
