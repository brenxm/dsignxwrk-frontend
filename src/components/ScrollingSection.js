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

	const scrollXImages = [
		scrollImgs[imgIndex],
		sliderImg1,
		sliderImg2
	];

	// Initialization
	useEffect(() => {
		loadScrollImgs(50).then((modules) => {
			const loadedImages = modules.map((module) => module.default);
			SetScrollImgs(loadedImages);
		});
	}, []);

	useEffect(() => {
		// Toggle render for the elements except for the animation
		if (appScrollPos >= 2100) {
			showElements();
		} else {
			hideElements();
		}
	}, [appScrollPos]);


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
					scrollYPos={appScrollPos} 
				/>
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

function ImgSlider({imgs, scrollYPos}){
	const imgWidth = 500;
	const vw = window.innerWidth;
	let thisComponent;
	const [selectedPaginationIndex, SetSelectedPaginationIndex] = useState(0);

	useEffect(()=>{
		const thisComponent = document.querySelector('.slider-img-cont');
		
		thisComponent.addEventListener('scroll', ()=>{
			const imgElemWidth = thisComponent.scrollWidth / imgs.length;
			const currentPos = thisComponent.scrollLeft;
			const viewingPosIndicators = [];
			for (let i = 0; i < imgs.length; i++) {
				viewingPosIndicators.push(i * imgElemWidth);
			}

			const index = getClosestValueIndex(currentPos, viewingPosIndicators);
			SetSelectedPaginationIndex(index);
		});
	},[]);

	function scrollTo(index) {
		thisComponent = document.querySelector('.slider-img-cont');
		thisComponent.scrollTo({
			left: getViewPositions()[index],
			behavior: 'smooth'
		});
	}

	function getViewPositions() {
		const imgsViewPos = [];

		for (let i = 0; i < imgs.length; i++) {
			imgsViewPos.push((imgWidth * i) + ((imgWidth - vw) / 2));
		}

		return imgsViewPos;
	}

	function getClosestValueIndex(x, values){
		let closestDistance;
		let closestIndex;

		for (let i = 0; i < values.length; i++){
			const dif = Math.abs(values[i] - x);

			if (closestDistance == undefined || dif < closestDistance){
				closestDistance = dif;
				closestIndex = i;
			}
		}

		return closestIndex;
	}

	return <div className="carousel-viewer-cont" style={{
	}}>
		<div className='slider-img-cont'>
			{imgs.map((img, i) => <img id='img-cont' src={img} key={i} style={{
				display: scrollYPos > 2100 || i == 0 ? 'block' : 'none'
			}}/>)}
		</div>
		<div className='pagination-cont'>
			{imgs.map((img, i) => <div key={i} style={{
				backgroundColor: selectedPaginationIndex == i ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)',
				display: scrollYPos > 2100 ? 'block' : 'none'
			}}
			onClick={()=>{
				scrollTo(i);
			}}
			></div>)}
		</div>
	</div>;
}
