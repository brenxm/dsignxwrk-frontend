import React from 'react';
import { useEffect, useState } from 'react';
// eslint-disable-next-line
import sliderImg1 from '../assets/scroll_imgs/0050.webp';
// eslint-disable-next-line
import sliderImg2 from '../assets/scroll_imgs/0050.webp';
// eslint-disable-next-line
import sliderImg3 from '../assets/scroll_imgs/0050.webp';

export default function ScrollAnimPage({ imgIndex, height, appScrollPos }) {
	const [scrollImgs, SetScrollImgs] = useState([]);
	const [elementsOpacity, setElementsOpacity] = useState({
		titleText: '0',
		subtext: '0',
		detailContainer: '0',
	});

	// eslint-disable-next-line
	const [selectedIndicator, setSelectedIndicator] = useState(0);

	const scrollXImages = [
		scrollImgs[imgIndex],
		sliderImg1,
		sliderImg2
	];

	const [clickedIndicator, setClickedIndicator] = useState(false); // Conditional flag for swiping images to X direction to prevent unintended feedback loop of parents selectedIndex state var

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

	/* Two types of browsing the imgs with scrolling X
		1. clicking the indicator (gray buttons)
		2. scrolling to x
	*/

	function handleIndicatorButtonClick(toIndex){
		// Update indicator colors
		setSelectedIndicator(toIndex);
		setClickedIndicator(true);
	}

	function handleUpdateScrollIndex(toIndex){
		setSelectedIndicator(toIndex);
	}

	function loadScrollImgs(numOfImgs) {
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
				<ImgSlider imgs={scrollXImages} 
					selectedIndex={selectedIndicator}
					scrollListener={handleUpdateScrollIndex}
					clickedIndicator={clickedIndicator}
					setClickedIndicator={setClickedIndicator}
				/>

				<div className='imgs-indicator-cont' >
					{scrollXImages.map((img, i) => {
						return <div key={i}
							style={{ backgroundColor: selectedIndicator == i ? 'gray' : 'rgba(0,0,0,0.3)' }}
							onClick={()=>{handleIndicatorButtonClick(i);}}
							
						></div>;
					})}
					
				</div>
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

function ImgSlider({imgs, selectedIndex, clickedIndicator, setClickedIndicator}){
	const imgWidth = 500;
	const vw = window.innerWidth;

	let listening = false;
	let thisComponent;

	let selectedImg;


	// eslint-disable-next-line
	async function startIndexListener(thisComponent){
		while (listening){
			await new Promise((resolve)=>{
				setTimeout(()=>{
					resolve();
				}, 200);
			});

			console.log(`${getClosestIndex(thisComponent)}`);
		}
	}

	// Initialize event listeners
	useEffect(()=>{
		listening = true;
		const thisComponent = document.querySelector('.slider-img-cont');
		startIndexListener(thisComponent);
	},[]);

	useEffect(()=>{
		console.log(`should change the viewing img to ${selectedIndex}`);
		if (clickedIndicator){
			scrollTo(selectedIndex);
		}

		setClickedIndicator(false);
		console.log('should update the indicator');

	},[selectedIndex]);

	function getViewPositions(){
		const imgsViewPos = [];

		for (let i = 0; i < imgs.length; i++) {
			imgsViewPos.push((imgWidth * i) + ((imgWidth - vw) / 2));
		}

		return imgsViewPos;
	}

	function getClosestIndex(thisComponent){
		let closestIndex;
		let shortestDistance;

		let imgsViewPos = getViewPositions();

		for (let i = 0; i < imgsViewPos.length; i++){
			const d = Math.abs(imgsViewPos[i] - thisComponent.scrollLeft);
			if (shortestDistance == undefined || d < shortestDistance){
				shortestDistance = d;
				closestIndex = i;
			}
		}

		if (selectedImg != closestIndex){
			selectedImg = closestIndex;
			return closestIndex;
		}
	}

	function scrollTo(index) {
		thisComponent = document.querySelector('.slider-img-cont');
		console.log(`Should move to ${getViewPositions()[index]}`);
		thisComponent.scrollTo({
			left: getViewPositions()[index],
			behavior: 'smooth'
		});
	}


	return <div className="slider-img-cont" style={{
	}}>
		{imgs.map((img, i) => <img id='img-cont' src={img} key={i} />)}
	</div>;
}
