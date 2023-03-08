/** Enable Fake Timers */

beforeAll(() => {
	jest.useFakeTimers();
});

afterEach(() => {
	jest.clearAllTimers();
});

test('waits 1 second before ending the game', () => {
	jest.spyOn(global, 'setTimeout');

	const timerGame = require('../timerGame');
	timerGame();

	expect(setTimeout).toHaveBeenCalledTimes(1);
	expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

/** Run All Timers */

// jest.useFakeTimers();
test('calls the callback after 1 second', () => {
	const timerGame = require('../timerGame');
	const callback = jest.fn();

	timerGame(callback);

	// At this point in time, the callback should not have been called yet
	expect(callback).not.toBeCalled();

	// Fast-forward until all timers have been executed
	jest.runAllTimers();

	// Now our callback should have been called!
	expect(callback).toBeCalled();
	expect(callback).toHaveBeenCalledTimes(1);
});

/** Advance Timers by Time */

// jest.useFakeTimers();
it('calls the callback after 1 second via advanceTimersByTime', () => {
	const timerGame = require('../timerGame');
	const callback = jest.fn();

	timerGame(callback);

	// At this point in time, the callback should not have been called yet
	expect(callback).not.toBeCalled();

	// Fast-forward until all timers have been executed
	jest.advanceTimersByTime(1000);

	// Now our callback should have been called!
	expect(callback).toBeCalled();
	expect(callback).toHaveBeenCalledTimes(1);
});
