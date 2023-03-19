export default class SoundPlayer {
	constructor() {
		/** TypeError: Cannot set property foo of #<SoundPlayer> which has only a getter */
		// this.foo = 'bar';
	}

	playSoundFile(fileName) {
		console.log('Playing sound file ' + fileName);
	}

	get foo() {
		return 'bar';
	}
	static brand() {
		return 'player-brand';
	}
}
