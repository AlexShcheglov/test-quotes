import React, { Component } from 'react';
import Table from './Table';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="page">
				<h1 className="title">Quotes ON Desigh</h1>
				<Table />
			</div>
		);
	}
}

export default App;
