import React from 'react';
import img from '../assets/home_image.webp';
import imgSlider1 from '../assets/slider_1.webp';
import imgSlider2 from '../assets/slider_2.webp';
import imgSlider3 from '../assets/slider_3.webp';
import imgSlider4 from '../assets/slider_4.webp';

export default function HomeSection() {
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
					<div style={{ flex: '0.4' }}></div>
					<SliderEffect scrImg={imgSlider2} />
					<SliderEffect scrImg={imgSlider3} />
					<SliderEffect scrImg={imgSlider4} />
					<SliderEffect scrImg={imgSlider1} />
				</div>
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
