import React from 'react';
import HomeSection from '../HomeSection';
import ScrollAnimPage from '../ScrollingSection';
import ModuleSection from '../ModulesSection';
import SoftwareSection from '../SoftwareSection';
import TopNavMenu from './TopNav';

export default function HomePage({appScrollY, scrollImgIndex, scrollingSectionHeight, mainSubtext, softwareSectionTitle, softwareSectionSubText}){
	return (<>
		<TopNavMenu appScrollYPos={appScrollY} />
		<div>
			<HomeSection />
			<ScrollAnimPage
				imgIndex={scrollImgIndex}
				height={scrollingSectionHeight}
				appScrollPos={appScrollY}
				mainSubtext={mainSubtext}
			/>
			<ModuleSection />
			<SoftwareSection title={softwareSectionTitle} titleSubText={softwareSectionSubText} />
		</div>
	</>);
}