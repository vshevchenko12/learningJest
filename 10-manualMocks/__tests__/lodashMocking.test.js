import lodash from 'lodash';

test('if lodash head is mocked', () => {
	expect(lodash.head([2, 3])).toBe(5);
});
