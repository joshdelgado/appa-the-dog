import React from 'react';
import appa from './assets/img/appa-1.webp';
// import appaSmall from './assets/img/appa-1--small.webp';
import background from './assets/img/90s-bg.webp';
import './assets/App.scss';
import Age from './components/age';

export default function App() {
	return (
		<div className="app" style={{ backgroundImage: `url(${background})` }}>
			<div className="app__inner">
				<main className="app__content">
					<img src={appa} className="appa-picture" alt="Appa The Dog" />
					<Age></Age>
				</main>
			</div>
		</div>
	);
}