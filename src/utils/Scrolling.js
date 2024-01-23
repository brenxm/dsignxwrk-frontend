export default class TrackScrollSpeed {
	#stopRequest = false;
	#scrolling = false;

	constructor(component){
		console.log(component);
		this.component = component;
		this.lastPos = component.scrollLeft;
		this.lastTime = performance.now();
		
	}

	start(cb){
		if (this.#scrolling) {
			console.log('Scroll function in action');
			return;
		}

		this.frameLoopCallback = cb;

		this.#stopRequest = false;
		this.#scrolling = true;
		requestAnimationFrame(() => this.trackSCrollSPeed(this.frameLoopCallback));
	}

	stop(){
		this.#stopRequest = true;
	}

	trackSCrollSPeed = (cb) => {
		const currentPos = this.component.scrollLeft;
		const currentTime = performance.now();

		const timeElapsed = currentTime - this.lastTime;
		const distanceScrolled = currentPos - this.lastPos;

		const speed = Math.abs((distanceScrolled / timeElapsed) * 1000); // speed per sec

		this.lastPos = currentPos;
		this.lastTime = currentTime;

		cb(speed);

		if (!this.#stopRequest){
			requestAnimationFrame(()=> this.trackSCrollSPeed(this.frameLoopCallback));
		}

		return speed;
	};
}