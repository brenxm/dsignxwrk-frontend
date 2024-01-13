import React from 'react';
import { useState } from 'react';
import HomeSection from './HomeSection';
import ScrollAnimPage from './ScrollingSection';
import mainLogo from '../assets/nav_buttons/main_logo.png';
import shoppingIcon from '../assets/nav_buttons/shopping_bag.png';


export default function App() {
	const [scrollAnimDisplay, setScrollAnimDsiplay] = useState('none');
	const [scrollAnimOpacity, setScrollAnimOpacity] = useState(0);

	window.addEventListener('scroll', () => {
		const yCoord = window.scrollY;
		console.log(yCoord);
		switch(true){
		case (yCoord > 200 && yCoord < 650):
			setScrollAnimDsiplay('block');
			setScrollAnimOpacity((yCoord - 200) / (650 - 200));
			console.log((yCoord - 200) / (650 - 200));
		}
	});
	return (
		<>
			<div>
				{/* Nav */}
				<TopNavMenu />

				{/* BODY */}
				<HomeSection />
			</div>

			{/* SCROLL ANIM */}
			<ScrollAnimPage display={scrollAnimDisplay} opacity={scrollAnimOpacity}/>
		</>
	);
}

function TopNavMenu() {
	return (
		<div className="top-nav-menu">
			<NavMenuButton icon={mainLogo} />
			<NavMenuButton icon={shoppingIcon} />
		</div>
	);
}

function NavMenuButton({ icon }) {
	return (
		<button id="top-nav_but">
			<img src={icon} id="top-nav_but_img"></img>
		</button>
	);
}
