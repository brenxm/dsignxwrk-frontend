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

	const [navMenuStyle, setNavMenuStyle] = useState({top: '30px', width: '80%', borderRadius:' 20px'});
	const [titleOpacity, setTitleOpacity] = useState('1');

	useEffect( ()=> {
		window.addEventListener('scroll', ()=>{
			if(window.scrollY <= 100){
				setNavMenuStyle({ top: '30px', width: '80%' , borderRadius: '20px'});
				setTitleOpacity('1');
			} else {
				setNavMenuStyle({ top: '0', width: '100%' ,borderRadius: '0'});
				setTitleOpacity('0');
			}

			console.log(window.scrollY);
		});		
	}, []);
	
	return (
		<>
			<TopNavMenu style={navMenuStyle} titleOpacity={titleOpacity}/>
			<HomeSection />
			<ScrollAnimPage />
			<ModuleSection />
			<SoftwareSection />
		</>
	);
}



function TopNavMenu({style, titleOpacity}) {
	return (
		<div className="top-nav-menu" style={style}>
			<CircleButton icon={<NavMenuButton icon={mainLogo} />}/>
			<h2 style={{ opacity: titleOpacity, transition: 'all 0.2s ease' }}id="title-text">Dsign x Wrk</h2>
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
