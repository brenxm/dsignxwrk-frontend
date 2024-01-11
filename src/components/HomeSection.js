import React from 'react';
import { Header, ImageSlider, ScrollDownButton } from './CommonComponents';
import img1 from '../assets/image.png';
import img2 from '../assets/1 copy.png';
import img3 from '../assets/1 copy 2.png';

const images = [img1, img2, img3];

export default function HomeSection() {
	return (
		<div className='home-section_cont'>
			<Header title="Dsign x Wrk" message="Some text heheh wataever" />
			<div>Macro Board (M)</div>
			<p>A versitile modular macro board that the user can change to whatever design layout it fits their needs.Paired with different modules which has their own strength.</p>
			{<ImageSlider images={images} iconSelection={null}/>}
			<ScrollDownButton label='Explore more'/>
		</div>
	);
}
