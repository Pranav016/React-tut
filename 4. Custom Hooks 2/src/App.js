import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-https';

function App() {
	const {
		isLoading,
		error,
		sendRequest: fetchTasks,
	} = useHttp(
		{
			url: 'https://react-tut-a0f33-default-rtdb.firebaseio.com/tasks.json',
		},
		transformTasks
	);

	const [tasks, setTasks] = useState([]);

	function transformTasks(taskObj) {
		const loadedTasks = [];

		for (const taskKey in taskObj) {
			loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
		}

		setTasks(loadedTasks);
	}

	useEffect(() => {
		fetchTasks();
	}, []);

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={fetchTasks}
			/>
		</React.Fragment>
	);
}

export default App;
