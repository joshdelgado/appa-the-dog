import React from 'react';
import logo from './assets/logo.svg';
import background from './assets/img/90s-bg-temp.jpg';
import './assets/App.scss';
import Age from './components/age';

export default function App() {
	return (
		<div className="App" style={{ backgroundImage: `url(${background})` }}>
			<div className="App-inner">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<Age></Age>
				</header>
			</div>
		</div>
	);
}