jest.mock('../src/sound-player'); // SoundPlayer is now a mock constructor

import SoundPlayer from '../src/sound-player';
import SoundPlayerConsumer from '../src/sound-player-consumer';

/** If you use ARROW functions in your classes, they will not be part of the mock. The reason for that is that arrow functions are not present on the object's prototype, they are merely properties holding a reference to a function. */

beforeEach(() => {
	// Clear all instances and calls to constructor and all methods:
	SoundPlayer.mockClear();
});

it('We can check if the consumer called the class constructor', () => {
	const soundPlayerConsumer = new SoundPlayerConsumer();
	expect(SoundPlayer).toHaveBeenCalledTimes(1);
});

it('We can check if the consumer called a method on the class instance', () => {
	// Show that mockClear() is working:
	expect(SoundPlayer).not.toHaveBeenCalled();

	const soundPlayerConsumer = new SoundPlayerConsumer();
	// Constructor should have been called again:
	expect(SoundPlayer).toHaveBeenCalledTimes(1);

	soundPlayerConsumer.playSomethingCool();

	// mock.instances is available with automatic mocks:
	const mockSoundPlayerInstance = SoundPlayer.mock.instances[0];
	const mockPlaySoundFile = mockSoundPlayerInstance.playSoundFile;
	const coolSoundFileName = 'song.mp3';

	expect(mockPlaySoundFile.mock.calls[0][0]).toBe(coolSoundFileName);
	// Equivalent to above check:
	expect(mockPlaySoundFile).toHaveBeenCalledWith(coolSoundFileName);
	expect(mockPlaySoundFile).toHaveBeenCalledTimes(1);
	// console.log(SoundPlayer.mock);
	/** {
      calls: [ [] ],
      contexts: [ SoundPlayer { playSoundFile: [Function] } ],
      instances: [ SoundPlayer { playSoundFile: [Function] } ],
      invocationCallOrder: [ 2 ],
      results: [ { type: 'return', value: undefined } ],
      lastCall: []
    } */
});
