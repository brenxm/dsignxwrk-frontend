import React from 'react';
import img from '../assets/home_image.webp';
import imgSlider1 from '../assets/slider_1.webp';
import imgSlider2 from '../assets/slider_2.webp';
import imgSlider3 from '../assets/slider_3.webp';
import imgSlider4 from '../assets/slider_4.webp';

export default function HomeSection() {



	// Scroll animation
	const smoothScrollTo = (yPos) => {
		const currentPos = window.scrollY;
		const dist = Math.abs(yPos - currentPos);
		const fps = 200;

		const distPerFrame = dist/fps;

		let increment = window.scrollY;

		const move = () => {
			increment += distPerFrame;
			const moveIncrement = smoothAnim(normalize(increment, currentPos, yPos)) * yPos;

			console.log(moveIncrement);

			window.scrollTo(0, moveIncrement);
			if (window.scrollY < yPos){
				requestAnimationFrame(move);
			}
		};

		requestAnimationFrame(move);

		const smoothAnim = (x) => {
			// Smooth 
			return Math.pow(x, 0.5);
		};

		// eslint-disable-next-line
		const easeInOut = (x) => {
			// x as normalized distance from current pos to target pos
			if (x < 0.5){
				return 4 * x * x * x;
			} else {
				return 1 - ((1 - x) * (1 - x) * (1 - x) * 4);
			}
		};

		// easeout
		// eslint-disable-next-line
		const easeOut = (x) => {
			return 1 - (1 - x) * (1 - x) * (1 - x);
		};

		const normalize = (x, min, max) => {
			return (x - min) / (max - min);
		};

	};

	return (
		<div className="home-section-cont">
			<div className="rotators-cont">
				<img
					src={img}
					style={{
						backgroundSize: '200px',
						backgroundPosition: 'center',
						height: '100%',
					}}
				></img>
				<div id="slider-effect-cont">
					<SliderEffect scrImg={imgSlider1} />
					<SliderEffect scrImg={imgSlider2} />
					<SliderEffect scrImg={imgSlider3} />
					<SliderEffect scrImg={imgSlider4} />
					<div style={{ flex: '0.4' }}></div> {/*Spacer*/}
					<SliderEffect scrImg={imgSlider2} />
					<SliderEffect scrImg={imgSlider3} />
					<SliderEffect scrImg={imgSlider4} />
					<SliderEffect scrImg={imgSlider1} />
				</div>
			</div>
			<div id='home-section-macroboard-title-cont'
				onClick={()=>{
					smoothScrollTo(2100);
				}}
			>
				<h3>
					Macro Board
				</h3>
				<p>
					<b>[</b>Explore more<b>]</b>
				</p>
			</div>
		</div>
	);
}

function SliderEffect({ scrImg }) {
	return (
		<div className="slider-element-cont" style={{}}>
			<div
				id="slider-img"
				style={{
					backgroundImage: `url(${scrImg})`,
				}}
			></div>
		</div>
	);
}
