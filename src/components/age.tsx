
const msInDay: number = 86400000,
	appaBirthday: string = '10/22/2022';
// appaGotchaday: string = '1/27/2023',
// displayOptions: string[] = ['day', 'week', 'month', 'yeah', 'detailed', 'second', 'minute', 'hour'];

export default function Age() {
	const today: Date = new Date(),
		birthday: Date = new Date(appaBirthday),
		age = getAgeInNaturalLanguage(today, birthday);

	return (
		<h2 className="appa"><span>Appa</span> is {age} old!</h2>
	);
}

function getAgeInNaturalLanguage(today: Date, birthday: Date): string {
	const ageObj = getAgeObject(today, birthday),
		lastKey = Object.keys(ageObj).pop();
	let ageInNaturalLanguage = '';

	for (const k in ageObj) {
		const v = ageObj[k];

		if (k === lastKey) {
			ageInNaturalLanguage += 'and '
		}

		if (v > 0) {
			ageInNaturalLanguage += `${v} ${k}`;
			if (v > 1) {
				ageInNaturalLanguage += 's';
			}
			ageInNaturalLanguage += ' ';
		}
	}

	return ageInNaturalLanguage;
}

function getAgeObject(today: Date, birthday: Date): { [index: string]: number } {
	const timeBetween = today.getTime() - birthday.getTime()
	let totalDays = Math.floor(timeBetween / msInDay),
		// totalWeeks = Math.floor(totalDays / 7),
		totalMonths = Math.floor(totalDays / 30),
		years = Math.floor(totalDays / 365),
		remainingDays = totalDays %= 30,
		remainingWeeks = 0,
		remainingMonths = totalMonths %= 12;

	if (remainingDays >= 7) {
		remainingWeeks = Math.floor(remainingDays / 7);
		remainingDays = remainingDays % 7;
	}

	const ageObj: { [index: string]: number } = {
		year: years,
		month: remainingMonths,
		week: remainingWeeks,
		day: remainingDays
	};

	return ageObj;
}