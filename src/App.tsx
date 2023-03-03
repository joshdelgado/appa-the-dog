import { useState } from 'react';
import appa from './assets/img/appa-1.webp';
import discoBall from './assets/img/disco-ball.png';
// import appaSmall from './assets/img/appa-1--small.webp';
import background from './assets/img/90s-bg.webp';
import './assets/App.scss';
import Age from './components/age';

export default function App() {
	const [isPartyTime, setIsPartyTime] = useState(false);

	const togglePartyTime = () => {
		setIsPartyTime(current => !current);
	}

	return (
		<div className="app" style={{ backgroundImage: `url(${background})` }}>
			<div className="app__inner">
				<main className={`app__content ${isPartyTime ? 'app__content--party-time' : ''}`}>
					<img src={discoBall} className="app__party-time" alt="Party Time" onClick={togglePartyTime} />
					<img src={appa} className="appa-picture" alt="Appa The Dog" />
					<Age></Age>
				</main>
			</div>
		</div>
	);
}