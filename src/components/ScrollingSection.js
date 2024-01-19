import React from 'react';
import { useEffect } from 'react';


export default function ScrollAnimPage({imgIndex}) {

	const scrollImgs = [];

	// Initialization
	useEffect(()=>{
		loadScrollImgs(scrollImgs, 30);
	}, []);

	// Updating the current img viewed in sequence based on the scrollY data passed from App component
	useEffect(()=>{
		console.log(imgIndex);
	}, [imgIndex]);

	function loadScrollImgs(scrollImgsRef, numOfImgs) {
		// Load all images in a specified file
		// Param
		// scrollImgs (Array)
		// -> None

		for (let i = 1; i <= numOfImgs; i++) {
			const prefixNum = i - 10 >= 0 ? i : `0${i}`; //Prefix handling
			const imgPath = `../assets/scroll_imgs/00${prefixNum}.webp`;
			scrollImgsRef.push(imgPath);
		}
		console.log(scrollImgs[0]);
	}

	return <div className="scroll-anim-section">
		<div id='sequence-images-cont'>
			<img src={scrollImgs[imgIndex]}>
			</img>
		</div>
	</div>;
}
