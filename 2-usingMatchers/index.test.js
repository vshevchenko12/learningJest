/* Common Matchers */

test('two plus two is four', () => {
	expect(2 + 2).toBe(4);
});

test('object assignment', () => {
	const data = { one: 1 };
	data['two'] = 2;
	// toEqual ignores object keys with undefined properties, undefined array items, array sparseness, or object type mismatch. To take these into account use toStrictEqual instead.
	expect(data).toEqual({ one: 1, two: 2 });
});

test('array assignment', () => {
	const data = [1];
	data.push(2);
	expect(data).toEqual([1, 2]);
});

test('adding positive numbers is not zero', () => {
	for (let a = 1; a < 10; a++) {
		for (let b = 1; b < 10; b++) {
			expect(a + b).not.toBe(0);
		}
	}
});

/* Truthiness */

// toBeNull matches only null
// toBeUndefined matches only undefined
// toBeDefined is the opposite of toBeUndefined
// toBeTruthy matches anything that an if statement treats as true
// toBeFalsy matches anything that an if statement treats as false

test('null', () => {
	const n = null;
	expect(n).toBeNull();
	expect(n).toBeDefined();
	expect(n).not.toBeUndefined();
	expect(n).not.toBeTruthy();
	expect(n).toBeFalsy();
});

test('zero', () => {
	const z = 0;
	expect(z).not.toBeNull();
	expect(z).toBeDefined();
	expect(z).not.toBeUndefined();
	expect(z).not.toBeTruthy();
	expect(z).toBeFalsy();
});

test('two plus two', () => {
	const value = 2 + 2;
	expect(value).toBeGreaterThan(3);
	expect(value).toBeGreaterThanOrEqual(3.5);
	expect(value).toBeLessThan(5);
	expect(value).toBeLessThanOrEqual(4.5);

	// toBe and toEqual are equivalent for numbers
	expect(value).toBe(4);
	expect(value).toEqual(4);
});

/* Numbers */

test('two plus two', () => {
	const value = 2 + 2;
	expect(value).toBeGreaterThan(3);
	expect(value).toBeGreaterThanOrEqual(3.5);
	expect(value).toBeLessThan(5);
	expect(value).toBeLessThanOrEqual(4.5);

	// toBe and toEqual are equivalent for numbers
	expect(value).toBe(4);
	expect(value).toEqual(4);
});

test('adding floating point numbers', () => {
	const value = 0.1 + 0.2;
	//expect(value).toBe(0.3);           This won't work because of rounding error
	expect(value).toBeCloseTo(0.3); // This works.
});

/* Strings */

test('there is no I in team', () => {
	expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
	expect('Christoph').toMatch(/stop/);
});

/* Arrays and iterables */

const shoppingList = [
	'diapers',
	'kleenex',
	'trash bags',
	'paper towels',
	'milk',
];

test('the shopping list has milk on it', () => {
	expect(shoppingList).toContain('milk');
	expect(new Set(shoppingList)).toContain('milk');
});

function compileAndroidCode() {
	throw new Error('you are using the wrong JDK!');
}

/* Exceptions */

// The function that throws an exception needs to be invoked within a wrapping function otherwise the toThrow assertion will fail.
test('compiling android goes as expected', () => {
	expect(() => compileAndroidCode()).toThrow();
	expect(() => compileAndroidCode()).toThrow(Error);

	// You can also use a string that must be contained in the error message or a regexp
	expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
	expect(() => compileAndroidCode()).toThrow(/JDK/);

	// Or you can match an exact error message using a regexp like below
	// expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // Test fails
	expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass
});
