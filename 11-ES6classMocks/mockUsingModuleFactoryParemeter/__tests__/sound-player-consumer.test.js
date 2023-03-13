/** The mock can't be an arrow function because calling `new` on an arrow function is not allowed in JavaScript. So this won't work:

jest.mock('./sound-player', () => {
  return () => {
    // Does not work; arrow functions can't be called with new
    return {playSoundFile: () => {}};
  };
}); */

jest.mock('../src/sound-player', () => {
	return function () {
		return { playSoundFile: () => {} };
	};
});

import SoundPlayerConsumer from '../src/sound-player-consumer';

it('We can check if the consumer called a method on the class instance', () => {
	const soundPlayerConsumer = new SoundPlayerConsumer();
	// console.log(soundPlayerConsumer);
	/** SoundPlayerConsumer {
      soundPlayer: { playSoundFile: [Function: playSoundFile] }
    } */
	const result = soundPlayerConsumer.playSomethingCool();
	// console.log(result);
	/** undefined */
});
