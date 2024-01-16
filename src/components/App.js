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
			<div className="top-nav-cont">
				<TopNavMenu />
			</div>

			<div className="main-body">
				<HomeSection />
				<ScrollAnimPage />
				<ModuleSection />
				<SoftwareSection />
			</div>
		</>
	);
}

class SingletonBool {
	constructor(boolean = false) {
		this.bool = boolean;
	}

	getBool() {
		return this.bool;
	}

	setBool(boolean) {
		this.bool = boolean;
	}
}
function TopNavMenu() {
	const navDockStyle = {
		top: '0',
		width: '100%',
		borderRadius: '0',
		height: '70px',
	};

	const navUndockStyle = {
		top: '30px',
		width: '80%',
		borderRadius: '20px',
		height: '70px',
	};

	const expandedNavMenuStyle = {
		top: '0',
		width: '100%',
		borderRadius: '0',
		height: '100vh',
	};

	const inUndockArea = () => window.scrollY <= 100;

	let expandedNavMenu = new SingletonBool();

	const [navMenuStyle, setNavMenuStyle] = useState({
		...navUndockStyle,
		height: '70px',
	});

	const [titleOpacity, setTitleOpacity] = useState('1');

	const [navDockContDisplay, setNavDockContDisplay] = useState('none');

	const handleScroll = (e) => {
		console.log(e.target);
		if (expandedNavMenu.bool) {
			console.log('should called');
			return;
		}

		// UNDOCK nav menu
		if (inUndockArea()) {
			setNavMenuStyle(navUndockStyle);
			setTitleOpacity('1');
		} else {
			setNavMenuStyle(navDockStyle);
			setTitleOpacity('0');
		}
	};

	useEffect(() => {
		const app = document.querySelector('#app');

		app.addEventListener('scroll', handleScroll);

		return () => {
			app.removeEventListener('scroll', handleScroll);
		};
	}, [
		expandedNavMenu.bool,
		setNavMenuStyle,
		navUndockStyle,
		navDockStyle,
		setTitleOpacity,
		inUndockArea,
	]);

	function toggleMenuTray() {
		const app = document.querySelector('#app');
		const navMenuCurrHeight = document
			.querySelector('.top-nav-menu')
			.getBoundingClientRect().height;

		// Toggle ON
		if (navMenuCurrHeight == 70) {
			app.removeEventListener('scroll', handleScroll);
			setNavMenuStyle(expandedNavMenuStyle);
			expandedNavMenu.setBool(true);
			setNavDockContDisplay('Block');
			setTitleOpacity(0);
		} else {
			// TOGGLE OFF
			setTitleOpacity(1);
			setNavDockContDisplay('none');
			expandedNavMenu.setBool(false);
			app.addEventListener('scroll', handleScroll);
			if (inUndockArea()) {
				setNavMenuStyle(navUndockStyle);
			} else {
				setNavMenuStyle(navDockStyle);
			}
		}
	}

	// Navigation OPTIONS
	const navOptions = [
		{
			title: 'Macro Boards',
			img: 'hehe',
			text: 'Some message goes here but whaterver dude'
		},
		{
			title: 'Modules',
			img: 'buts',
			text: 'Hekhekhekeh wataevah'
		},
		{
			title: 'Softwares',
			img: 'uks',
			text: 'This is the software side of this thing hehe it is what it is'
		}
	];

	return (
		<div className="top-nav-menu" style={navMenuStyle}>
			<div id='nav-dock-cont' > 
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
			<div id='nav-menu-cont' style={{
				display: navDockContDisplay
			}}>
				{navOptions.map((value, i)=>{
					return <MenuItemOption  key={i} img={value.img} title={value.title} message={value.text} />;
				})}
			</div>
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

function MenuItemOption({img, title, message}){
	return (<>
		<div className='menu-item'>
			<hr></hr>
			<div id='menu-item-img-title-cont'>
				<img src={img}>
				</img>
				<div id='menu-item-title-cont'>
					<h3>
						{title}
					</h3>
					<p>
						{message}
					</p>
				</div>
			</div>
		</div>
	</>
	);
} 