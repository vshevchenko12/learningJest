/** Repeating Setup */

let cities = [];

// sync

function initializeCityDatabase() {
	cities.push('Vienna');
	cities.push('San Juan');
}

function clearCityDatabase() {
	cities = [];
}

function isCity(name) {
	return cities.includes(name);
}

beforeEach(() => {
	initializeCityDatabase();
});

afterEach(() => {
	clearCityDatabase();
});

it('city database has Vienna', () => {
	expect(isCity('Vienna')).toBeTruthy();
});

it('city database has San Juan', () => {
	expect(isCity('San Juan')).toBeTruthy();
});

it('city database has only 2 sities', () => {
	expect(cities.length).toBe(2);
});

// async

let citiesAsync = [];

function initializeCityDatabaseAsync() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			citiesAsync.push('Vienna');
			citiesAsync.push('San Juan');
			resolve();
		}, 100);
	});
}

function clearCityDatabaseAsync() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			citiesAsync = [];
			resolve();
		}, 100);
	});
}

function isCityAsync(name) {
	return citiesAsync.includes(name);
}

beforeEach(() => {
	return initializeCityDatabaseAsync();
});

afterEach(() => {
	return clearCityDatabaseAsync();
});

it('city database has Vienna', () => {
	expect(isCityAsync('Vienna')).toBeTruthy();
});

it('city database has San Juan', () => {
	expect(isCityAsync('San Juan')).toBeTruthy();
});

it('city database has only 2 sities', () => {
	expect(citiesAsync.length).toBe(2);
});
