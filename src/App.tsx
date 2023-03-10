import './assets/styles/app.scss';
import { ChangeEvent, useState } from 'react';
import appa from './assets/img/appa-1.webp';
import discoBall from './assets/img/disco-ball.png';
// import appaSmall from './assets/img/appa-1--small.webp';
import background from './assets/img/90s-bg.webp';
import Age from './components/age';
import { DisplayOptions } from './enums/display-options';
import { APPA_BIRTHDAY, DAYS_IN_YEAR, MS_IN_DAY } from './consts/consts';
import { SelectOption } from './classes/select-option';

export default function App() {
	const [isPartyTime, setIsPartyTime] = useState(false);
	const [selectedOption, setSelectedOption] = useState(DisplayOptions.FULL);
	const [isDrawerOpen, setDrawerOpen] = useState(false);

	const togglePartyTime = () => {
		setIsPartyTime(current => !current);
	}

	const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
		const option = DisplayOptions[event.target.value.toUpperCase() as keyof typeof DisplayOptions];
		setSelectedOption(option);
	}

	const handleToggle = () => {
		setDrawerOpen(current => !current);
	}

	const ageOptions = setAgeOptions();

	return (
		<div className="app" style={{ backgroundImage: `url(${background})` }}>
			<div className="app__inner">
				<main className={`app__content ${isPartyTime ? 'app__content--party-time' : ''}`}>
					<img src={discoBall} className="app__party-time" alt="Party Time" onClick={togglePartyTime} />
					<div className="appa-wrap">
						<img src={appa} className="appa-picture" alt="Appa The Dog" />
						<div className={`appa-wrap__drawer ${isDrawerOpen ? 'appa-wrap__drawer--open' : ''}`}>
							<label>Age Display</label>
							<select className="app__select" onChange={handleSelect}>
								{ageOptions.map((option) => (
									<option value={option.value}>{option.label}</option>
								))}
							</select>
							<div className="appa-wrap__toggle" onClick={handleToggle}>
								<span>▼</span>
							</div>
						</div>
					</div>
					<Age selectedOption={selectedOption}></Age>
				</main>
			</div>
		</div>
	);
}

function setAgeOptions(): SelectOption[] {
	let ageOptions: SelectOption[] = [
		new SelectOption('Full', DisplayOptions.FULL)
	];

	if (new Date().getTime() - new Date(APPA_BIRTHDAY).getTime() >= MS_IN_DAY * DAYS_IN_YEAR) {
		ageOptions.push(new SelectOption('Years', DisplayOptions.YEAR));
	}

	ageOptions.push(new SelectOption('Months', DisplayOptions.MONTH));
	ageOptions.push(new SelectOption('Weeks', DisplayOptions.WEEK));
	ageOptions.push(new SelectOption('Days', DisplayOptions.DAY));

	return ageOptions;
}