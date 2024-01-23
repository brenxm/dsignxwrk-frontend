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
	const imgWidth = 500;
	const imgsViewPos = [];
	const vw = window.innerWidth;

	// Initialize event listeners
	useEffect(()=>{
		for (let i = 0; i < imgs.length; i++) {
			imgsViewPos.push((imgWidth * i) + ((imgWidth - vw) / 2));
		}
	},[]);


	return <div className="slider-img-cont" style={{
		display: 'flex',
		flexDirection: 'row',
		overflow: 'auto',
		width: '100vw',
		pointerEvents: 'auto',
		scrollSnapType: 'x mandatory'
	}}>
		{imgs.map((img, i) => <img id='img-cont' src={img} key={i} style={{
			width: '130vw',
			pointerEvents: 'none',
			scrollSnapAlign: 'center',
		}} />)}
	</div>;
}
