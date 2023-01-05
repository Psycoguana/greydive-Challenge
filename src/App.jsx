import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import './App.css';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<Home />}></Route>
				<Route exact path="form/:uuid" element={<Form />}></Route>
			</Routes>
		</div>
	);
}

export default App;
