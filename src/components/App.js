import React from 'react';
import HomeSection from './HomeSection';
import ScrollAnimPage from './ScrollingSection';
import ModuleSection from './ModulesSection';
import SoftwareSection from './SoftwareSection';
import mainLogo from '../assets/nav_buttons/main_logo.png';
import { useState, useEffect } from 'react';

export default function App() {
	const [scrollImgIndex, setScrollImgIndex] = useState(0);
	const [scrollingSectionHeight, setScrollingSectionHeight] = useState('0');
	const [appScrollY, setAppScrollY] = useState(0);

	useEffect(() => {
		const scrollStart = 600;
		const scrollEnd = 2100;
		const IMG_COUNT = 50; // Coordinate with Scroll Section Component
		const START_IMG_INDEX = 1;
		let scrollFrame = Math.abs(scrollEnd - scrollStart);
		const scrollFramePerImage = scrollFrame / IMG_COUNT;
		scrollFrame = scrollFrame - scrollFramePerImage; // Adjusting Frame to start at 0

		setScrollingSectionHeight(
			`calc(${IMG_COUNT * scrollFramePerImage}px + 100vh)`
		);
		window.addEventListener('scroll', () => {
			setAppScrollY(window.scrollY);

			if (window.scrollY >= scrollStart && window.scrollY <= scrollEnd) {
				// LERP
				const imgIndex =
               ((scrollY - 600) * (IMG_COUNT - START_IMG_INDEX)) / scrollFrame +
               START_IMG_INDEX;

				setScrollImgIndex(Math.floor(imgIndex) - 1);
			} else if (window.scrollY >= scrollEnd){
				setScrollImgIndex(IMG_COUNT - 1);
			}
		});
	}, []);

	return (
		<>
			<TopNavMenu />
			<HomeSection />
			<ScrollAnimPage
				imgIndex={scrollImgIndex}
				height={scrollingSectionHeight}
				appScrollPos={appScrollY}
			/>
			<ModuleSection />
			<SoftwareSection />
		</>
	);
}

function TopNavMenu() {
	/*
		Use by expandNavStyle state
		default value, Fully expanded when at homepage
	*/
	const expandedNav = {
		title: { display: 'block' },
		subtext: { display: 'block' },
		img: { width: '40px', height: '40px' },
	};

	const dockedNav = {
		title: {
			display: 'none',
		},
		subtext: {
			display: 'none',
		},
		img: {
			width: '20px',
			height: '20px',
		},
	};

	const expandeMenuStyle = {
		...dockedNav,
		menu: { height: '100vh' },
	};

	const hiddenMenuStyle = {
		...dockedNav,
		menu: { height: 'auto' },
	};

	const [expandNavStyle, setExpandNavStyle] = useState(expandedNav);
	const [menuExpandedStyle, setMenuExpandedStyle] = useState(hiddenMenuStyle);
	const [menuExpanded, setMenuExpanded] = useState(false);
	const menuItemsManager = new MenuOptionManager();

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 100) {
				setExpandNavStyle(dockedNav);
			} else {
				setExpandNavStyle(expandedNav);
			}
		});
	}, []);

	function toggleMenuTray() {
		// Toggle ON
		if (!menuExpanded) {
			menuItemsManager.showItems();
			setMenuExpanded(true);
			setMenuExpandedStyle(expandeMenuStyle);
			setExpandNavStyle(dockedNav);
		} else {
			// TOGGLE OFF
			if (window.scrollY > 100) {
				setExpandNavStyle(hiddenMenuStyle);
			} else {
				setExpandNavStyle(expandedNav);
			}
			setMenuExpandedStyle(hiddenMenuStyle);
			menuItemsManager.hideItems();
			setMenuExpanded(false);
			console.log('callder');
		}
	}

	menuItemsManager.add([
		{
			title: 'Macro Boards',
			img: 'hehe',
			subText: 'Some message goes here but whaterver dude',
		},
		{
			title: 'Modules',
			img: 'buts',
			subText: 'Hekhekhekeh wataevah',
		},
		{
			title: 'Softwares',
			img: 'uks',
			subText:
            'This is the software side of this thing hehe it is what it is',
		},
	]);

	return (
		<div className="top-nav-menu" style={menuExpandedStyle.menu}>
			<div id="nav-dock-cont">
				<div id="nav-but-title-cont">
					<button
						id="top-nav_but"
						onClick={toggleMenuTray}
						style={{
							width: '40px',
							height: '40px',
							backgroundImage: `url(${mainLogo})`,
							backgroundSize: '30px',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
							backgroundColor: 'rgba(0,0,0,0)',
							border: 'none',
						}}
					></button>
					<h2 style={expandNavStyle.title} id="title-text">
                  Dsign x Wrk
					</h2>
				</div>
				<p style={expandNavStyle.subtext}>
               Catering to the artists who value the craft of artistry in their
               professional endevour.
				</p>
			</div>
			<div id="nav-menu-cont">
				{menuItemsManager.menuItems.map((item, i) => {
					return (
						<MenuItemOption
							key={i}
							img={item.img}
							title={item.title}
							subText={item.subText}
							style={item.style}
						/>
					);
				})}
			</div>
		</div>
	);
}

class MenuOptionManager {
	constructor() {
		this.menuItems = [];
	}

	add(input) {
		const Schema = (img, title, subText, style, setStyle) => {
			return {
				img: img,
				title: title,
				subText: subText,
				setStyle: setStyle,
				style: style,
			};
		};

		if (input instanceof Array) {
			for (let item of input) {
				const [style, _setStyle] = useState({
					display: 'none',
					opacity: '0',
				});

				const newObj = new Schema(
					item.img,
					item.title,
					item.subText,
					style,
					_setStyle
				);

				this.menuItems.push(newObj);
			}
		} else if (input instanceof Object) {
			const [style, _setStyle] = useState({
				display: 'none',
				opacity: '0',
			});

			const newObj = new Schema(
				input.img,
				input.title,
				input.subText,
				style,
				_setStyle
			);

			this.menuItems.push(newObj);
		}
	}

	async showItems(ms = 70) {
		for (const item of this.menuItems) {
			console.log(item);
			await new Promise((resolve) => setTimeout(resolve, ms));
			item.setStyle({
				display: 'flex',
				opacity: '1',
			});
		}
	}

	hideItems() {
		for (const item of this.menuItems) {
			item.setStyle({
				display: 'none',
				opacity: '0',
			});
		}
	}
}

function MenuItemOption({ img, title, subText, style }) {
	return (
		<>
			<div className="menu-item" style={style}>
				<hr></hr>
				<div id="menu-item-img-title-cont">
					<img src={img}></img>
					<div id="menu-item-title-cont">
						<h3>{title}</h3>
						<p>{subText}</p>
					</div>
				</div>
			</div>
		</>
	);
}
