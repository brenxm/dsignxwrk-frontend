import React from 'react';
import { useEffect, useState } from 'react';
// eslint-disable-next-line
import sliderImg1 from '../assets/scroll_imgs/0050.webp';
// eslint-disable-next-line
import sliderImg2 from '../assets/scroll_imgs/0050.webp';
// eslint-disable-next-line
import sliderImg3 from '../assets/scroll_imgs/0050.webp';

import TrackScrollSpeed from '../utils/Scrolling';

export default function ScrollAnimPage({ imgIndex, height, appScrollPos }) {
	const [scrollImgs, SetScrollImgs] = useState([]);
	const [elementsOpacity, setElementsOpacity] = useState({
		titleText: '0',
		subtext: '0',
		detailContainer: '0',
	});

	// Initialization
	useEffect(() => {
		loadScrollImgs(50).then((modules) => {
			const loadedImages = modules.map((module) => module.default);
			SetScrollImgs(loadedImages);
		});
	}, []);

	useEffect(() => {
		if (appScrollPos >= 2100) {
			showElements();
		} else {
			hideElements();
		}
	}, [appScrollPos]);

	function loadScrollImgs(numOfImgs) {
		// Load all images in a specified file
		// Param
		// scrollImgs (Array)
		// -> None
		const images = [];

		for (let i = 1; i <= numOfImgs; i++) {
			const prefixNum = i - 10 >= 0 ? i : `0${i}`; //Prefix handling
			images.push(import(`../assets/scroll_imgs/00${prefixNum}.webp`));
		}
		return Promise.all(images);
	}
	/* eslint-disable-next-line */
   function showElements() {
		setElementsOpacity({
			titleText: '1',
			subtext: '1',
			detailContainer: '1',
		});
	}

	/* eslint-disable-next-line */
   function hideElements() {
		setElementsOpacity({
			titleText: '0',
			subtext: '0',
			detailContainer: '0',
		});
	}

	return (
		<div
			className="scroll-anim-section"
			style={{
				height: height,
			}}
		>
			<div id="sequence-images-cont">
				<h2
					style={{
						opacity: elementsOpacity.titleText,
					}}
				>
               The Macro Board
				</h2>
				<ImgSlider imgs={[
					scrollImgs[imgIndex],
					sliderImg1,
					sliderImg2
				]}/>
				<p
					style={{
						opacity: elementsOpacity.subtext,
					}}
				>
               Lorem ipsum how swapping! It&aposs like when you can switch out
               parts of a machine usually a computer whilte it&aposs still
               running.
				</p>
			</div>
			<div
				className="icon-detail-cont"
				style={{
					opacity: elementsOpacity.detailContainer,
				}}
			>
				<IconDetail icon={'heh'} subtext="Hotswap module" />
				<IconDetail icon={'heh'} subtext="Modular approach" />
				<IconDetail icon={'heh'} subtext="Tactile key response" />
				<IconDetail icon={'heh'} subtext="Mac and Windows" />
				<IconDetail icon={'heh'} subtext="1000hz polling rate" />
				<IconDetail icon={'heh'} subtext="CNC Aluminum body" />
			</div>
		</div>
	);
}

function IconDetail({ icon, subtext }) {
	return (
		<div className="icon-detail">
			<img src={icon} />
			<p>{subtext}</p>
		</div>
	);
}

function ImgSlider({imgs}){
	// eslint-disable-next-line
	const imgWidth = 500;
	let scrollInterpolation;
	// eslint-disable-next-line
	const imgsViewPos = [];
	const vw = window.innerWidth;
	let thisComponent;
	let scrollSpeed; // Time interval var
	let scrollDetection; // time interval var
	let scrollFunctionBusy = false;
	let actionPending;
	
	// Flags
	let userScrolling = false;
	let scrolling = false;

	let trackSCrollSPeed;

 
	// Initialize event listeners
	useEffect(()=>{
		thisComponent = window.document.querySelector('.slider-img-cont');
		trackSCrollSPeed = new TrackScrollSpeed(thisComponent);

		thisComponent.addEventListener('touchstart', ()=>{
			actionPending = true;
			userScrolling = true;
			interuptScrollAnim();

			trackSCrollSPeed.start();
		});

		thisComponent.addEventListener('touchend', () => {
			userScrolling = false;
			window.clearInterval(scrollSpeed);

			if (!scrolling){
				attemptScroll();
			}
		});

		thisComponent.addEventListener('scroll', ()=>{
			window.clearTimeout(scrollDetection);
			scrolling = true;

			scrollDetection = setTimeout(()=>{
				scrolling = false;
				attemptScroll();
			}, 66);
		});

		for (let i = 0; i < imgs.length; i++) {
			imgsViewPos.push((imgWidth * i) + ((imgWidth - vw) / 2));
		}
	},[]);


	function interuptScrollAnim(){
		window.clearInterval(scrollInterpolation);
		scrollFunctionBusy = false;
	}

	function attemptScroll(){
		console.log(`${userScrolling} is user scrolling?`);
		console.log(`${scrollFunctionBusy} is scrollBz?`);
		if (userScrolling || scrollFunctionBusy || !actionPending) return;

		scrollFunctionBusy = true;
		scrollToIndex();
		actionPending = false;
	}

	// eslint-disable-next-line
	function scrollToIndex(){
		const x = thisComponent.scrollLeft;
		const toIndex = getClosestIndex(x);

		const targetPos = (imgWidth * toIndex) + ((imgWidth - vw) / 2);
		const currentPos = thisComponent.scrollLeft;

		// Ease interpolation
		// f(t) = 3 * t^2 * (1 - t) + 3 * t * (1 - t)^2 + (1 - t)^3
		const time = 500; //
		let accu = 0;
		const interval = time/60; // 60 fps

		scrollInterpolation = setInterval(()=>{
			accu += interval;

			const moveTo = easeInOutCubic(normalized(accu, 0, time)) * (targetPos - currentPos) + currentPos;
			
			thisComponent.scrollTo(moveTo, 0);

			if (accu >= time){
				window.clearInterval(scrollInterpolation);
			}
		}, interval);

		function easeInOutCubic(t){
			if (t < 0.5){
				return 4 * t * t * t;
			} else {
				const f =((2 * t) - 2);
				return 0.5 * f * f * f + 1;
			}
		}

		function normalized(x, min, max){
			return (x-min)/(max-min);
		}
	}


	// eslint-disable-next-line
	function getClosestIndex(x){
		let buffer = null;
		let closestIndex = null;
		for (let i = 0; i < imgsViewPos.length; i++) {
			const d = Math.abs(x - imgsViewPos[i]);
			if (!buffer || buffer > d){
				closestIndex = i;
				buffer = d;
			}
		}

		return closestIndex;
	}

	return <div className="slider-img-cont" style={{
		display: 'flex',
		flexDirection: 'row',
		overflow: 'auto',
		width: '100vw',
		pointerEvents: 'auto'
	}}>
		{imgs.map((img, i) => <img id='img-cont' src={img} key={i} style={{
			width: `${imgWidth}px`,
			pointerEvents: 'none',
		}} />)}
	</div>;
}
