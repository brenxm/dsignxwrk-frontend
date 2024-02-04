import React from 'react';
import { useState } from 'react';

import placeholderImg from '../assets/placeholder.png';

export default function ModuleSection() {
	// Follow schematic for adding a module element in the list
	// 1. Icon
	// 2. Display image
	// 3. title
	// 4. subtext

	const [selectedIconIndex, setSelectedIconIndex] = useState(0);

	const moduleElements = [
		{
			icon: placeholderImg,
			displayImage: placeholderImg,
			title: 'Oled key module',
			subText:
            'Oled key, state of the art screen with deep blacks and unbelievable contrast that delivers unmatch screen clarity. What can I say, the best screen for monitors now made as key switch',
		},
		{
			icon: placeholderImg,
			displayImage: placeholderImg,
			title: 'E-ink key module',
			subText:
            'Einkk key, state of the art screen with deep blacks and unbelievable contrast that delivers unmatch screen clarity. What can I say, the best screen for monitors now made as key switch dfhjdkf sdhfsjdfg sdf',
		},
		{
			icon: placeholderImg,
			displayImage: placeholderImg,
			title: 'Oled key module',
			subText:
            'Oled key, state of the art screen with deep blacks and unbelievable contrast that delivers unmatch screen clarity. What can I say, the best screen for monitors now made as key switch',
		},
		{
			icon: placeholderImg,
			displayImage: placeholderImg,
			title: 'E-ink key module',
			subText:
            'Einkk key, state of the art screen with deep blacks and unbelievable contrast that delivers unmatch screen clarity. What can I say, the best screen for monitors now made as key switch dfhjdkf sdhfsjdfg sdf',
		},
		{
			icon: placeholderImg,
			displayImage: placeholderImg,
			title: 'Oled key module',
			subText:
            'Oled key, state of the art screen with deep blacks and unbelievable contrast that delivers unmatch screen clarity. What can I say, the best screen for monitors now made as key switch',
		},
	];

	return (
		<div id="module-section">
			<div id="module-section-page-title-cont">Modules</div>

			<div id="pagination-icon-cont">
				{moduleElements.map((element, i) => (
					<Paginationicons
						key={i}
						src={element.icon}
						selectedIconIndex={selectedIconIndex}
						ikey={i}
						handleClick={() => {
							setSelectedIconIndex(i);
						}}
					/>
				))}
			</div>

			<div id="display-image-cont">
				<img src={moduleElements[selectedIconIndex].displayImage} />
			</div>

			<div id="title-and-text-cont">
				<p className="title">{moduleElements[selectedIconIndex].title}</p>
				<p className="subtext">
					{moduleElements[selectedIconIndex].subText}
				</p>
			</div>
		</div>
	);
}

function Paginationicons({ src, handleClick, ikey, selectedIconIndex }) {
	return (
		<div
			className="module-section-pagination-icon-cont"
			style={{
				top: selectedIconIndex == ikey ? '10px' : '0',
			}}
			onClick={() => {
				handleClick();
			}}
		>
			<img src={src} />
		</div>
	);
}
