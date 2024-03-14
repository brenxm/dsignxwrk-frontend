import React from 'react';
import { useState, useEffect } from 'react';
import data from '../../public/main.json';
import HomePage from './homepage/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage, RegistrationPage } from './login_registration/LoginRegistration';



export default function App() {
	// eslint-disable-next-line
	const [scrollImgIndex, setScrollImgIndex] = useState(0);
	// eslint-disable-next-line
	const [scrollingSectionHeight, setScrollingSectionHeight] = useState('0');
	// eslint-disable-next-line
	const [appScrollY, setAppScrollY] = useState(0);

	useEffect(() => {
		const scrollStart = 600;
		const scrollEnd = 2000;
		const IMG_COUNT = 50; // Coordinate with Scroll Section Component
		const START_IMG_INDEX = 1;
		let scrollFrame = Math.abs(scrollEnd - scrollStart);
		const scrollFramePerImage = scrollFrame / IMG_COUNT;
		scrollFrame = scrollFrame - scrollFramePerImage; // Adjusting Frame to start at 0

		disableScroll();

		window.addEventListener('scroll', () => {
			setAppScrollY(window.scrollY);

			if (window.scrollY >= scrollStart && window.scrollY <= scrollEnd) {
				// LERP
				const imgIndex =
               ((scrollY - 600) * (IMG_COUNT - START_IMG_INDEX)) / scrollFrame +
               START_IMG_INDEX;

				setScrollImgIndex(Math.floor(imgIndex) - 1);
			} else if (window.scrollY >= scrollEnd) {
				setScrollImgIndex(IMG_COUNT - 1);
			}
		});
	}, []);

	useEffect(()=>{
		window.addEventListener('scroll', ()=>{
			setAppScrollY(window.scrollY);
		});
	},[]);

	// eslint-disable-next-line
	function disableScroll() {
		window.addEventListener('scroll', preventScroll, { passive: false });
	}

	function preventScroll(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage appScrollY={appScrollY} scrollImgIndex={scrollImgIndex} scrollingSectionHeight={scrollingSectionHeight} mainSubtext={data['macro board']} softwareSectionTitle={'Software'} softwareSectionSubText={data['software']} />} />
				<Route path="/login" element={<LoginPage />}/>
				<Route path="/registration" element={<RegistrationPage />}/>
			</Routes>
		</Router>
	);
}