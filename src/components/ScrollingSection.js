import React from 'react';
import { useEffect, useState } from 'react';

export default function ScrollAnimPage({imgIndex}) {
	const [scrollImgs, SetScrollImgs] = useState([]);

	// Initialization
	useEffect(()=>{
		loadScrollImgs(30).then(modules => {
			const loadedImages = modules.map(module => module.default);
			SetScrollImgs(loadedImages);
		});
	}, []);

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

	return <div className="scroll-anim-section">
		<div id='sequence-images-cont'>
			<img src={scrollImgs[imgIndex]} />
		</div>
	</div>;
}
