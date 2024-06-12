import './assets/styles/app.scss';
import { ChangeEvent, useState } from 'react';
import appaImage from './assets/img/appa-1.webp';
import momoImage from './assets/img/momo.webp';
import background from './assets/img/cubes-noise-bg.webp';
import Age from './components/age';
import { DisplayOptions } from './enums/display-options';
import { APPA_BIRTHDAY, DAYS_IN_YEAR, MS_IN_DAY } from './consts/consts';
import { SelectOption } from './classes/select-option';
import { ReactComponent as DogSwitchIcon } from './assets/img/dog-switch-icon.svg';
import { ReactComponent as DiscoBallIcon } from './assets/img/disco-ball-icon.svg';

export default function App() {
	const [isPartyTime, setIsPartyTime] = useState(false);
	const [selectedOption, setSelectedOption] = useState(DisplayOptions.FULL);
	const [isDrawerOpen, setDrawerOpen] = useState(false);
	const [whichDogIsDisplayed, setWhichDogIsDisplayed] = useState('Appa');

	const switchDog = () => {
		if (whichDogIsDisplayed === 'Appa'){
			setWhichDogIsDisplayed('Momo');
		} else {
			setWhichDogIsDisplayed('Appa');
		}
	}

	const togglePartyTime = () => {
		setIsPartyTime(current => !current);
	}

	const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
		const option = DisplayOptions[event.target.value.toUpperCase() as keyof typeof DisplayOptions];
		setSelectedOption(option);
		setDrawerOpen(false);
	}

	const handleToggle = () => {
		setDrawerOpen(current => !current);
	}

	const ageOptions = setAgeOptions();

	return (
		<div className="app" style={{ backgroundImage: `url(${background})` }}>
			<div className="app__inner">
				<main className={`app__content ${isPartyTime ? 'app__content--party-time' : ''}`}>
					<div className="app__actions-bar">
					<DogSwitchIcon className="app__action app__action--dog-switcher" onClick={switchDog} />
					<DiscoBallIcon className="app__action app__action--party-time" onClick={togglePartyTime} />
					</div>
					<div className="appa">
						<img src={ whichDogIsDisplayed === 'Appa' ? appaImage : momoImage} className="appa__picture" alt="Appa The Dog" />
						<div className={`appa__drawer ${isDrawerOpen ? 'appa__drawer--open' : ''}`}>
							<label>Age Display</label>
							<select className="app__select" onChange={handleSelect}>
								{ageOptions.map((option) => (
									<option value={option.value}>{option.label}</option>
								))}
							</select>
							<div className="appa__toggle" onClick={handleToggle}>
								<span>▼</span>
							</div>
						</div>
					</div>
					<Age selectedOption={selectedOption} dog={whichDogIsDisplayed}></Age>
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