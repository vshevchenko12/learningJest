/** Scoping */

let cities = [];

function initializeCityDatabase() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			cities.push({ name: 'Vienna' });
			cities.push({ name: 'San Juan' });
			resolve();
		}, 100);
	});
}

function initializeFoodDatabase() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			cities[0].foods = ['Wiener Schnitzel'];
			cities[1].foods = ['Mofongo'];
			resolve();
		}, 100);
	});
}

// console.log(cities);
/** [] */

function isCity(name) {
	return cities.map((city) => city.name).includes(name);
}

function isValidCityFoodPair(name, food) {
	const city = cities.find((city) => city.name === name);

	if (!city || !city.foods) {
		return false;
	}

	return city.foods.includes(food);
}

beforeEach(() => {
	return initializeCityDatabase();
});

it('city database has Vienna', () => {
	// console.log(cities);
	/** [ { name: 'Vienna' }, { name: 'San Juan' } ] */
	expect(isCity('Vienna')).toBeTruthy();
});

it('city database has San Juan', () => {
	expect(isCity('San Juan')).toBeTruthy();
});

describe('matching cities to foods', () => {
	// Applies only to tests in this describe block
	beforeEach(() => {
		return initializeFoodDatabase();
	});

	it('Vienna <3 veal', () => {
		expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
	});

	it('San Juan <3 plantains', () => {
		// console.log(cities);
		/** [
      { name: 'Vienna', foods: [ 'Wiener Schnitzel' ] },
      { name: 'San Juan', foods: [ 'Mofongo' ] },
      { name: 'Vienna' },
      { name: 'San Juan' },
      { name: 'Vienna' },
      { name: 'San Juan' }
    ] */
		expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
	});
});
