import { Route, Switch, Redirect } from 'react-router-dom';
import Products from './pages/Products';
import Welcome from './pages/Welcome';
import MainHeader from './components/MainHeader';
import ProductsDetails from './pages/ProductsDetails';

function App() {
	return (
		<>
			<MainHeader />
			<main>
				{/* Switch component renders the first route that matches the requested path */}
				<Switch>
					<Route path='/' exact>
						<Redirect to='/welcome' />
					</Route>
					<Route path='/welcome' component={Welcome} />
					<Route path='/products' component={Products} exact />
					<Route
						path='/products/:productId'
						component={ProductsDetails}
					/>
				</Switch>
			</main>
		</>
	);
}

export default App;
