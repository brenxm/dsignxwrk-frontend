import React from 'react';
import img from '../assets/homeboard3.png';

export default function HomeSection() {
	
	return (
		<div
			className="home-section_cont"
			style={{
				backgroundImage: `url(${img})`,
				backgroundSize: '800px',
				backgroundPositionX: '-200px',
				backgroundPositionY: '-100px',
			}}
		>
		</div>
	);
}

/*
<Header
				icon={mainIcon}
				title="Dsign x Wrk"
				message='A fusion of design and work, " dsign x wrk" embodies the integration of creative aesthetics with practical functionality. It represents a commitment to blending artistic passion with work, catering to those who value the artistry in their professional endeavors.'
			/>
*/
