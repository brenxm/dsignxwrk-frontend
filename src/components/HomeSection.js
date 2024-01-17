import React from 'react';
import img from '../assets/home_image.webp';
import imgSlider1 from '../assets/home_1.png';
import imgSlider2 from '../assets/home_2.png';

export default function HomeSection() {
	return (
		<div
			className="home-section_cont"
			style={{
				backgroundImage: `url(${img})`,
				
			}}
		>
			<div style={{
				backgroundImage: `url(${imgSlider1})`,
				height: '100%',
				width: '100%',
				backgroundSize: '650px',
				animationName: 'module-slider',
				animationDuration: '1000s',
				animationIterationCount: 'infinite',
				animationTimingFunction: 'linear'
			}}></div>

			<div style={{
				backgroundImage: `url(${imgSlider2})`,
				height: '100%',
				width: '100%',
				backgroundSize: '650px',
				animationName: 'module-slider',
				animationDuration: '1000s',
				animationIterationCount: 'infinite',
				animationTimingFunction: 'linear'
			}}></div>
		</div>
	);
}
