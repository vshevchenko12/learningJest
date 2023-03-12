jest.mock('../src/sound-player'); // SoundPlayer is now a mock constructor

import SoundPlayerConsumer from '../src/sound-player-consumer';

it('We can check if the consumer called a method on the class instance', () => {
	const soundPlayerConsumer = new SoundPlayerConsumer();
	soundPlayerConsumer.playSomethingCool();
});
