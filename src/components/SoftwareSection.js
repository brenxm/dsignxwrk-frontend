import React, { useEffect, useState } from 'react';
import data from '../../public/software.json';

export default function SoftwareSection({ title, titleSubText }) {
	const [dataImgs, setDataImgs] = useState([]);
	
	useEffect(()=>{
		loadImgFromJson(data).then((modules) => {
			const loadedImages = modules.map((module) => module.default);
			setDataImgs(loadedImages);
		});
	}, []);

	function loadImgFromJson(data) {
		const imgs = [];
		for (let i = 0; i < data.length; i++) {
			imgs.push(import(`../../public/${data[i].img}`));
		}

		return Promise.all(imgs);
	}

	return (
		<div className="software-section">
			<div id="software-section-header">
				<h3 id="software-section-title">{title}</h3>
				<p id="software-section-title-subtext">{titleSubText}</p>
			</div>
			<div id="software-section-features-cont">
				{data.map((data, i) => {
					return <SoftwareFeature
						key={i}
						title={data.title}
						subtext={data.subtext}
						img={dataImgs[i]}
					/>;
				}
				)}
			</div>
		</div>
	);
}

// eslint-disable-next-line
function SoftwareFeature({ title, img, subtext }) {
	return (
		<div className="software-feature-cont">
			<h3 id="software-feature-title">{title}</h3>
			<img src={img} id="software-feature-display-img" />
			<p id="software-feature-subtext">{subtext}</p>
		</div>
	);
}
