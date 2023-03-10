import { APPA_BIRTHDAY, MS_IN_DAY } from '../consts/consts';
import { DisplayOptions } from '../enums/display-options';
import { AgeObject } from '../interfaces/age-interface';

export default function Age(props: { selectedOption: DisplayOptions | undefined }) {
	const today: Date = new Date(),
		birthday: Date = new Date(APPA_BIRTHDAY),
		// gotchaday: Date = new Date(APPA_GOTCHADAY),
		age = getAgeInNaturalLanguage(today, birthday, props.selectedOption);

	return (
		<h2 className="age"><span>Appa</span> is {age}&nbsp;old!</h2>
	);
}

function getAgeInNaturalLanguage(today: Date, birthday: Date, display: DisplayOptions = DisplayOptions.FULL): string {
	const ageObjects: AgeObject[] = getAgeObjects(today, birthday);
	return display === DisplayOptions.FULL ? getAgeInDetail(ageObjects[0]) : getAgeInSpecificUnit(ageObjects[1], display);
}

function getAgeInDetail(ageObj: AgeObject): string {
	const lastKey = Object.keys(ageObj).pop();
	let ageString: string = '';

	for (const k in ageObj) {
		const v = ageObj[k];

		if (k === lastKey) {
			ageString += 'and ';
		}

		if (v > 0) {
			ageString += `${v} ${k}`;
			if (v > 1) {
				ageString += 's';
			}
			if (k !== lastKey) {
				ageString += ' ';
			}
		}
	}
	return ageString;
}

function getAgeInSpecificUnit(age: AgeObject, unit: DisplayOptions): string {
	let ageString = `${age[unit].toString()} ${unit}`;
	if (age[unit] > 1) {
		ageString += 's';
	}
	return ageString;
}

function getAgeObjects(today: Date, birthday: Date): AgeObject[] {
	const timeBetween = today.getTime() - birthday.getTime();
	let totalDays = Math.floor(timeBetween / MS_IN_DAY),
		totalWeeks = Math.floor(totalDays / 7),
		totalMonths = Math.floor(totalDays / 30),
		years = Math.floor(totalDays / 365),
		remainingDays = totalDays % 30,
		remainingWeeks = 0,
		remainingMonths = totalMonths % 12;

	if (remainingDays >= 7) {
		remainingWeeks = Math.floor(remainingDays / 7);
		remainingDays = remainingDays % 7;
	}

	const ageObj: AgeObject = {
		year: years,
		month: remainingMonths,
		week: remainingWeeks,
		day: remainingDays
	};

	const detailedAgeObj: AgeObject = {
		year: years,
		month: totalMonths,
		week: totalWeeks,
		day: totalDays
	};

	return [ageObj, detailedAgeObj];
}