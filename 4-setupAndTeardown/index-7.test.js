/** General Advice */

// it('this will be the only test that runs', () => {
// 	expect(true).toBe(false);
// });

// it.only('this test will not run', () => {
// 	expect('A').toBe('A');
// });

let a = 'A';

it('this will be the only test that runs', () => {
	expect(a).toBe('A');
	a = 'B';
});

it.only('this test will not run', () => {
	expect(a).toBe('A');
});
