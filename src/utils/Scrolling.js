export default class TrackScrollSpeed {
	#stopRequest = false;
	#scrolling = false;

	constructor(component){
		console.log(component);
		this._lastPos = component.scrollLeft;
		this._lastTime = performance.now();
	}

	start(){
		if (this.#scrolling) {
			console.log('Scroll function in action');
			return;
		}

		this.#stopRequest = false;
		requestAnimationFrame(this.trackSCrollSPeed);
	}

	stop(){
		this.#stopRequest = true;
	}

	trackSCrollSPeed(){
		const currentPos = this._component;
		const currentTime = performance.now();

		const timeElapsed = currentTime - this._lastTime;
		const distanceScrolled = currentPos - this._lastPos;

		const speed = (distanceScrolled / timeElapsed) * 1000; // speed per sec

		console.log(` The speed of scrolling is ${speed} pixels per second`);

		this._lastPos = currentPos;
		this._lastTime = currentTime;

		if (this.#stopRequest){
			return;
		}

		requestAnimationFrame(this.trackSCrollSPeed);
	}
}