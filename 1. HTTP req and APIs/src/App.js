import React from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
	const fetchMovieHandler = () => {
		const [movies, setMovies] = useState(initialState);

		const movies = fetch('https://swapi.dev/api/films/')
			.then((response) => response.json())
			.then((data) => {
				const transformedMovies = data.results.map((movie) => {
					return {
						id: movie.episode_id,
						title: movie.title,
						openingText: movie.opening_crawl,
						releaseDate: movie.release_date,
					};
				});
				setMovies(transformedMovies);
			})
			.catch((err) => console.log(err));
	};

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMovieHandler}>Fetch Movies</button>
			</section>
			<section>
				<MoviesList movies={movies} />
			</section>
		</React.Fragment>
	);
}

export default App;
