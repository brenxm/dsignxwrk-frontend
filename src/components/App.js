import React from 'react';
import HomeSection from './HomeSection';

export default function App() {
	return (
		<>
			{/* Nav */}
			<TopNavMenu />

			{/* BODY */}
			<HomeSection />
		</>
	);
}

function TopNavMenu() {
	return (
		<div className="top-nav-menu">
			<NavMenuButton label={'logo'} />
			<NavMenuButton label={'sc'} />
		</div>
	);
}

function NavMenuButton({ label }) {
	return <button>{label}</button>;
}
