import React from 'react';
import HomeSection from './HomeSection';
import ScrollAnimPage from './ScrollingSection';
import ModuleSection from './ModulesSection';
import SoftwareSection from './SoftwareSection';
import mainLogo from '../assets/nav_buttons/main_logo.png';
import { CircleButton } from './StylizedButton';
import { useEffect, useState } from 'react';
import { Spacer } from './CommonComponents';

export default function App() {
	return (
		<>
			<TopNavMenu />
			<HomeSection />
			<ScrollAnimPage />
			<ModuleSection />
			<SoftwareSection />
		</>
	);
}

function TopNavMenu() {
	const navDockStyle ={
		top: '0',
		width: '100%',
		borderRadius: '0',
	};

	const navUndockStyle = {
		top: '30px',
		width: '80%',
		borderRadius: '20px',
	};

	const inUndockArea = () => (window.scrollY <= 100);
	let isMenuTrayEnable = false;

	const [navMenuStyle, setNavMenuStyle] = useState({...navUndockStyle, height: '70px'});
	const [titleOpacity, setTitleOpacity] = useState('1');


	useEffect(() => {
		window.addEventListener('scroll', () => {
			console.log('scrolled');
			if (isMenuTrayEnable) {
				console.log('should called');
				return;
			}
			
			let navStyle = { ...navMenuStyle };

			// UNDOCK nav menu
			if (inUndockArea()) {
				setNavMenuStyle({...navStyle, ...navUndockStyle});
				setTitleOpacity('1');
			} else {
				setNavMenuStyle({...navStyle, ...navDockStyle});
				setTitleOpacity('0');
			}

		});
	}, []);

	function toggleMenuTray() {
		const navMenuCurrHeight = document
			.querySelector('.top-nav-menu')
			.getBoundingClientRect().height;
		let navStyle = {...navMenuStyle};
		
		// Toggle ON
		if (navMenuCurrHeight == 70) {
			navStyle = {...navStyle, height: '100vh', top: '0', width: '100%', borderRadius: '0'};
			isMenuTrayEnable = true;
			
		} else { // TOGGLE OFF
			isMenuTrayEnable = false;

			if (inUndockArea()){
				navStyle = {...navStyle, ...navUndockStyle, height: '70px'};
				console.log('calling');
				
			} else {
				navStyle = {...navStyle, ...navDockStyle, height: '70px' };
			}
			
		}
		
		setNavMenuStyle(navStyle);
		
		console.log(isMenuTrayEnable);
	}

	return (
		<div className="top-nav-menu" style={navMenuStyle}>
			<CircleButton
				icon={<NavMenuButton icon={mainLogo} />}
				clickFn={toggleMenuTray}
			/>
			<h2
				style={{ opacity: titleOpacity, transition: 'all 0.2s ease' }}
				id="title-text"
			>
            Dsign x Wrk
			</h2>
			<Spacer size={'0.3'} />
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
