jest.mock('../src/sound-player');

import SoundPlayer from '../src/sound-player';
import SoundPlayerConsumer from '../src/sound-player-consumer';

describe('When SoundPlayer throws an error', () => {
	beforeAll(() => {
		SoundPlayer.mockImplementation(() => {
			return {
				playSoundFile: () => {
					throw new Error('Test error');
				},
			};
		});
	});

	it('Should throw an error when calling playSomethingCool', () => {
		const soundPlayerConsumer = new SoundPlayerConsumer();
		expect(() => soundPlayerConsumer.playSomethingCool()).toThrow();
	});
});
