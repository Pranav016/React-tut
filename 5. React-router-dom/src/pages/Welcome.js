import React from 'react';
import { Route } from 'react-router';

const Welcome = () => {
	return (
		<>
			<h1>Welcome page</h1>
			{/* This is nested route feature/ can do conditional rendering based on path */}
			<Route path='/welcome/new-user'>
				<p>Welcome new user</p>
			</Route>
		</>
	);
};

export default Welcome;
