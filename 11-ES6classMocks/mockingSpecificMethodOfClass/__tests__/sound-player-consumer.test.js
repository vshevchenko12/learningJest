import SoundPlayerConsumer from '../src/sound-player-consumer';
import SoundPlayer from '../src/sound-player';

const playSoundFileMock = jest
	.spyOn(SoundPlayer.prototype, 'playSoundFile')
	.mockImplementation(() => {
		console.log('mocked function');
	}); // comment this line if just want to "spy"

it('player consumer plays music', () => {
	const player = new SoundPlayerConsumer();
	player.playSomethingCool();
	expect(playSoundFileMock).toHaveBeenCalled();
});
