import React from 'react';
import { useState } from 'react';
// eslint-disable-next-line
import loadImagesFromPublic from '../utils/loadImagesFromPublic';

import rawModuleData from '../../public/modules.json';

export default function ModuleSection() {
	// Follow schematic for adding a module element in the list
	// 1. Icon
	// 2. Display image
	// 3. title
	// 4. subtext

	const [selectedIconIndex, setSelectedIconIndex] = useState(0);
	// eslint-disable-next-line
	const [moduleData, setModuleData] = useState(rawModuleData)
	// eslint-disable-next-line
	const [paginationImgs, setPaginationImgs] = useState([]);
	// eslint-disable-next-line
	const [displayImgs, setDisplayImgs] = useState([]);


	useState(()=>{
		const paginationImgsPaths = rawModuleData.map((value)=> `module_pagination_icons/${value.paginationImg}.svg`);
		console.log(paginationImgsPaths);
		loadImagesFromPublic(paginationImgsPaths).then((modules)=>{
			const loadedImages = modules.map((module) => module.default);
			setPaginationImgs(loadedImages);
		});

		const displayImgsPaths = rawModuleData.map((value)=> `module_imgs/${value.displayImg}.webp`);
		loadImagesFromPublic(displayImgsPaths).then((modules)=>{
			const loadedImages = modules.map((module) => module.default);
			setDisplayImgs(loadedImages);
		});
	},[]);

	return (
		<div id="module-section">
			<div id="module-section-page-title-cont">Modules</div>

			<div id="pagination-icon-cont">
				{moduleData.map((element, i) => (
					<Paginationicons
						key={i}
						src={paginationImgs[i]}
						title={element.title}
						selectedIconIndex={selectedIconIndex}
						ikey={i}
						handleClick={() => {
							setSelectedIconIndex(i);
						}}
					/>
				))}
			</div>
			<hr />

			<div id="display-image-cont">
				<img src={displayImgs[selectedIconIndex]} />
			</div>

			<div id="title-and-text-cont">
				<p className="title">{moduleData[selectedIconIndex].title}</p>
				<p className="subtext">
					{moduleData[selectedIconIndex].subtext}
				</p>
			</div>
		</div>
	);
}

function Paginationicons({ src, handleClick, ikey, selectedIconIndex, title }) {
	return (
		<div
			className="module-section-pagination-icon-cont"
			style={selectedIconIndex == ikey ? 
				{
					top: '10px',
				}:
				{
					top: '0',
				}}
			onClick={() => {
				handleClick();
			}}
		>
			<div id='pagination-selected-indicator' style={
				selectedIconIndex == ikey ? { display: 'block'} : {display: 'none'}
			}></div>
			<img src={src} />
			<p id='pagination-icon-title'>{title}</p>
		</div>
	);
}
