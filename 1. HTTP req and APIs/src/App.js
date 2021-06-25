import React, { useState, useEffect } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	// useEffect

	const fetchMovieHandler = async () => {
		try {
			setError(null);
			setIsLoading(true);
			const response = await fetch('https://swapi.dev/api/films/');
			if (!response.ok) {
				throw new Error('Something went wrong!');
			}
			const data = await response.json();
			const transformedMovies = data.results.map((movie) => {
				return {
					id: movie.episode_id,
					title: movie.title,
					openingText: movie.opening_crawl,
					releaseDate: movie.release_date,
				};
			});
			setMovies(transformedMovies);
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	};

	let content = <p>No movies found</p>;

	if (movies.length > 0) {
		content = <MoviesList movies={movies} />;
	}

	if (error) {
		content = error;
	}

	if (isLoading) {
		content = <p>Loading...</p>;
	}

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMovieHandler}>Fetch Movies</button>
			</section>
			<section>{content}</section>
		</React.Fragment>
	);
}

export default App;
