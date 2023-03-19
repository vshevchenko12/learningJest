const staticMethodMock = jest
	.spyOn(SoundPlayer, 'brand')
	.mockImplementation(() => 'some-mocked-brand');

const getterMethodMock = jest
	.spyOn(SoundPlayer.prototype, 'foo', 'get')
	.mockImplementation(() => 'some-mocked-result');

// import SoundPlayerConsumer from '../src/sound-player-consumer';
import SoundPlayer from '../src/sound-player';

it('custom methods are called', () => {
	const player = new SoundPlayer();
	const foo = player.foo;
	const brand = SoundPlayer.brand();

	expect(staticMethodMock).toHaveBeenCalled();
	expect(getterMethodMock).toHaveBeenCalled();
});
