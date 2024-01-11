import React from 'react';

export default function App() {
	return (
		<>
			<TopNavMenu />
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
