import './assets/styles/app.scss';
import { ChangeEvent, useState } from 'react';
import appaImage1 from './assets/img/appa-1.webp';
import appaImage2 from './assets/img/appa-2.webp';
import appaImage3 from './assets/img/appa-3.webp';
import momoImage1 from './assets/img/momo-1.webp';
import momoImage2 from './assets/img/momo-2.webp';
import momoImage3 from './assets/img/momo-3.webp';
import background from './assets/img/cubes-noise-bg.webp';
import Age from './components/age';
import { DisplayOptions } from './enums/display-options';
import { APPA_BIRTHDAY, APPA_GOTCHADAY, DAYS_IN_YEAR, MOMO_BIRTHDAY, MOMO_GOTCHADAY, MS_IN_DAY } from './consts/consts';
import { SelectOption } from './classes/select-option';
import { ReactComponent as DogSwitchIcon } from './assets/img/dog-switch-icon.svg';
import { ReactComponent as DiscoBallIcon } from './assets/img/disco-ball-icon.svg';
import { Dog } from './classes/dog';
import { Photo } from './classes/photo';

export default function App() {
	const appa: Dog = new Dog('Appa', APPA_BIRTHDAY, APPA_GOTCHADAY, [
		new Photo(appaImage1, 'Appa but as a little baby'),
		new Photo(appaImage2, 'Appa covered in snow and ice'),
		new Photo(appaImage3, 'Appa sitting on Momo'),
	]);
	const momo: Dog = new Dog('Momo', MOMO_BIRTHDAY, MOMO_GOTCHADAY, [
		new Photo(momoImage1, 'Momo is sad about carrots'),
		new Photo(momoImage2, 'Momo getting in your face'),
		new Photo(momoImage3, 'Momo standing in the water he\'s drinking'),
	]);

	const [isPartyTime, setIsPartyTime] = useState(false);
	const [selectedOption, setSelectedOption] = useState(DisplayOptions.FULL);
	const [isDrawerOpen, setDrawerOpen] = useState(false);
	const [displayDog, setDisplayDog] = useState(appa);
	const [displayPhotoIndex, setDisplayPhotoIndex] = useState(0);

	const displayNextPhoto = () => {
		let nextPhoto = displayPhotoIndex + 1;
		if (nextPhoto === displayDog.photos.length) {
			nextPhoto = 0;
		}
		setDisplayPhotoIndex(nextPhoto);
	}

	const switchDog = () => {
		if (displayDog.name === 'Appa') {
			setDisplayDog(momo);
		} else {
			setDisplayDog(appa);
		}
		setDisplayPhotoIndex(0);
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
						<img className="appa__picture"
							src={displayDog.photos[displayPhotoIndex].src}
							alt={displayDog.photos[displayPhotoIndex].alt} />
						<div className={`appa__drawer ${isDrawerOpen ? 'appa__drawer--open' : ''}`}>
							<label>Age Display</label>
							<select className="app__select" onChange={handleSelect}>
								{ageOptions.map((option) => (
									<option value={option.value} key={option.value}>{option.label}</option>
								))}
							</select>
							<div className="appa__toggle" onClick={handleToggle}>
								<span>▼</span>
							</div>
						</div>
					</div>
					<button className="appa__photos-button" onClick={displayNextPhoto}>
						<Age selectedOption={selectedOption} dog={displayDog}></Age>
					</button>
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