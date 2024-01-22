export default class TrackScrollSpeed {
	#stopRequest = false;
	#scrolling = false;

	constructor(component){
		console.log(component);
		this.component = component;
		this.lastPos = component.scrollLeft;
		this.lastTime = performance.now();
	}

	start(){
		if (this.#scrolling) {
			console.log('Scroll function in action');
			return;
		}

		this.#stopRequest = false;
		this.#scrolling = true;
		requestAnimationFrame(this.trackSCrollSPeed);
	}

	stop(){
		this.#stopRequest = true;
	}

	trackSCrollSPeed = () => {
		const currentPos = this.component.scrollLeft;
		const currentTime = performance.now();

		const timeElapsed = currentTime - this.lastTime;
		const distanceScrolled = currentPos - this.lastPos;

		const speed = (distanceScrolled / timeElapsed) * 1000; // speed per sec

		console.log(` The speed of scrolling is ${speed} pixels per second`);

		this.lastPos = currentPos;
		this.lastTime = currentTime;

		if (this.#stopRequest){
			return;
		}

		requestAnimationFrame(this.trackSCrollSPeed);
	};
}