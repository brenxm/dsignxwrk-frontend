import React from 'react';
import {
	Header,
	ImageSlider,
	ScrollDownButton,
	Spacer,
} from './CommonComponents';
import img1 from '../assets/main_board.png';
import img2 from '../assets/1 copy.png';
import img3 from '../assets/1 copy 2.png';
import mainIcon from '../assets/nav_buttons/main_logo.png';

const images = [img1, img2, img3];

export default function HomeSection() {
	return (
		<div className="home-section_cont">
			<Header
				icon={mainIcon}
				title="Dsign x Wrk"
				message='A fusion of design and work, " dsign x wrk" embodies the integration of creative aesthetics with practical functionality. It represents a commitment to blending artistic passion with work, catering to those who value the artistry in their professional endeavors.'
			/>
			{<ImageSlider images={images} iconSelection={null} />}
			<Spacer />
			<ScrollDownButton label="Explore Macro Board" scrollCord={600} />
		</div>
	);
}
