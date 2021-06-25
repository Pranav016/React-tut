import React, { useState, useEffect, useCallback } from 'react';
import AddMovie from './components/AddMovie';
import MoviesList from './components/MoviesList';
import './App.css';
require('dotenv').config();

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMovieHandler = useCallback(async () => {
		try {
			setError(null);
			setIsLoading(true);
			const response = await fetch(
				'https://react-tut-a0f33-default-rtdb.firebaseio.com/movies.json'
			);
			if (!response.ok) {
				throw new Error('Something went wrong!');
			}
			const data = await response.json();
			const loadedMovies = [];
			for (const key in data) {
				loadedMovies.push({
					id: key,
					title: data[key].title,
					openingText: data[key].openingText,
					releaseDate: data[key].releaseDate,
				});
			}
			setMovies(loadedMovies);
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	}, []);

	// hoisting doesn't work when function stored in a variable
	useEffect(() => {
		fetchMovieHandler();
	}, [fetchMovieHandler]);

	async function addMovieHandler(movie) {
		const response = await fetch(
			'https://react-tut-a0f33-default-rtdb.firebaseio.com/movies.json',
			{
				method: 'POST',
				body: JSON.stringify(movie),
				header: {
					'Content-Type': 'application/json',
				},
			}
		);
		const data = await response.json();
		console.log(data);
	}

	let content = <p>No movies found</p>;

	if (movies.length > 0) {
		content = <MoviesList movies={movies} />;
	}

	if (error) {
		content = <p>{error}</p>;
	}

	if (isLoading) {
		content = <p>Loading...</p>;
	}

	return (
		<React.Fragment>
			<section>
				<AddMovie onAddMovie={addMovieHandler} />
			</section>
			<section>
				<button onClick={fetchMovieHandler}>Fetch Movies</button>
			</section>
			<section>{content}</section>
		</React.Fragment>
	);
}

export default App;
