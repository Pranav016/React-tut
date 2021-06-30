import { Route } from 'react-router-dom';
import Products from './pages/Products';
import Welcome from './pages/Welcome';
import MainHeader from './components/MainHeader';

function App() {
	return (
		<>
			<MainHeader />
			<main>
				<Route path='/welcome' component={Welcome} />
				<Route path='/products' component={Products} />
			</main>
		</>
	);
}

export default App;
