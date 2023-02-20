
const msInDay: number = 86400000,
	daysInWeek: number = 7,
	daysInMonth: number = 30,
	daysInYear: number = 365;
// monthsInYear: number = 12,
// weeksInYear: number = 52,
// weeksInMonth: number = 4,
// displayOptions: string[] = ['day', 'week', 'month', 'yeah', 'detailed', 'second', 'minute', 'hour'];

export default function Age() {
	const today: Date = new Date(),
		birthday: Date = new Date('10/22/2022'),
		ageInMs: any = today.getTime() - birthday.getTime();

	let age = getReadableAge(ageInMs);

	return (
		<h2 className="appa"><span>Appa</span> is {age} old!</h2>
	);
}

function getReadableAge(ageInMs: number): string {
	const ageInDays: number = Math.floor(ageInMs / msInDay),
		// ageInWeeks: number = Math.floor(ageInDays / daysInWeek),
		// ageInMonths: number = Math.floor(ageInDays / daysInMonth),
		ageInYears: number = Math.floor(ageInDays / daysInYear);

	let ageObj: { [index: string]: number } = {
		year: 0,
		month: 0,
		week: 0,
		day: 0,
	};
	let age: string = '';

	let remainingDays = ageInDays;
	if (ageInYears >= 1) {
		ageObj.year += ageInYears;
		remainingDays -= (ageInYears * daysInYear);
	} else {
		delete ageObj.year;
	}
	if (remainingDays / daysInMonth >= 1) {
		ageObj.month += Math.floor(remainingDays / daysInMonth);
		remainingDays -= Math.floor(remainingDays / daysInMonth) * daysInMonth;
	} else {
		delete ageObj.month;
	}

	if (remainingDays / daysInWeek >= 1) {
		ageObj.week += Math.floor(remainingDays / daysInWeek);
		remainingDays -= Math.floor(remainingDays / daysInWeek) * daysInWeek;
	} else {
		delete ageObj.week;
	}
	if (remainingDays >= 1) {
		ageObj.day += remainingDays;
	} else {
		delete ageObj.day;
	}


	const lastKey = Object.keys(ageObj).pop();

	for (const k in ageObj) {
		const v = ageObj[k];
		console.log(`${k}: ${v}`);

		if (k === lastKey) {
			age += 'and '
		}

		if (v > 0) {
			age += `${v} ${k}`;
			if (v > 1) {
				age += 's';
			}
			age += ' ';
		}
	}

	return age;
}