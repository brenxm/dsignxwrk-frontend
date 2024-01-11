import React from 'react';

export function Header({ icon, title, message }) {
	return (
		<div>
			<div>
				<img src={icon}></img>
				<h2>{title}</h2>
			</div>
			<p>{message}</p>
		</div>
	);
}


export function ImageSlider({images, iconSelection}){
	return <div className='image-slider_cont'>
		{/* Images */}
		<div >
			<img id="image-slider_image-frame" src={images[0]}></img>
		</div>

		{/* Selection indicatior */}
		<div id='image-slider_selector-cont'>
			{iconSelection ? iconSelection.map( (icon, i) => <img src={icon} key={i}></img>) : images.map( (icon, i) => <div id="default-dot-selection" key={i}></div>)}
		</div>
	</div>;
}

export function ScrollDownButton({label}) {
	return <div className='scrolldown-but_cont'>
		<p>{label}</p>
		<div id='scrolldown-but_arrow'></div>
	</div>;
}
