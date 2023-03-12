const mockPlaySoundFile = jest.fn();
jest.mock('../src/sound-player', () => {
	return jest.fn().mockImplementation(() => {
		return { playSoundFile: mockPlaySoundFile };
	});
});

import SoundPlayer from '../src/sound-player';
import SoundPlayerConsumer from '../src/sound-player-consumer';

beforeEach(() => {
	// Clear all instances and calls to constructor and all methods:
	SoundPlayer.mockClear();
	mockPlaySoundFile.mockClear();
});

it('We can check if the consumer called the class constructor', () => {
	new SoundPlayerConsumer();
	expect(SoundPlayer).toHaveBeenCalledTimes(1);
});

it('We can check if the consumer called a method on the class instance', () => {
	const soundPlayerConsumer = new SoundPlayerConsumer();
	const coolSoundFileName = 'song.mp3';
	soundPlayerConsumer.playSomethingCool();
	expect(mockPlaySoundFile).toHaveBeenCalledWith(coolSoundFileName);
});
