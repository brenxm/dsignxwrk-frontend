import React from 'react';

export function CircleButton({icon}) {
	const nav_color = 'rgb(32, 32, 32)';
	const nav_highLight = 'rgb(20, 20, 20)';

	return (
		<div style={{
			background: 'radial-gradient(rgb(35,35,35) 64.5%, rgba(0,0,0, 0.9) 64.5%, rgba(0,0,0, 0.9) 69%,rgb(35,35,35) 69%,rgb(35,35,35) 100%)',
			width: '50px',
			height: '50px',
			borderRadius: '50%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}}>
			<div style={{
				backgroundColor: 'rgb(32,32,32)',
				width: '90%',
				height: '90%',
				borderRadius: '50%',
				display: 'flex',
				justifyContent: 'center',
				background: `conic-gradient(rgb(40, 40, 40) 0deg, ${nav_color}, ${nav_color} 110deg, ${nav_highLight} 180deg, ${nav_color} 300deg, rgb(40, 40, 40) 360deg)`,
				alignItems: 'center',
				rotate: '135deg'
			}}>
				<div style={{
					width: '100%',
					height: '100%',
					borderRadius: '50%',
					display: 'flex',
					justifyContent: 'center',
					background: 'radial-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.0), rgba(0,0,0,0))',
					alignItems: 'center',
				}}>
					{icon}
				</div>
			</div>
		</div>
	);
}

export function SquareButton({ icon }) {
	const nav_color = 'rgb(32, 32, 32)';
	const nav_highLight = 'rgb(20, 20, 20)';

	return (
		<div style={{
			background: 'radial-gradient(rgb(35,35,35) 64.5%, rgba(0,0,0, 0.9) 64.5%, rgba(0,0,0, 0.9) 69%,rgb(35,35,35) 69%,rgb(35,35,35) 100%)',
			width: '50px',
			height: '50px',
			borderRadius: '10%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}}>
			<div style={{
				backgroundColor: 'rgb(32,32,32)',
				width: '90%',
				height: '90%',
				borderRadius: '10%',
				display: 'flex',
				justifyContent: 'center',
				background: `conic-gradient(rgb(40, 40, 40) 0deg, ${nav_color}, ${nav_color} 110deg, ${nav_highLight} 180deg, ${nav_color} 300deg, rgb(40, 40, 40) 360deg)`,
				alignItems: 'center',
				rotate: '135deg'
			}}>
				<div style={{
					width: '100%',
					height: '100%',
					borderRadius: '10%',
					display: 'flex',
					justifyContent: 'center',
					background: 'radial-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.0), rgba(0,0,0,0))',
					alignItems: 'center',
				}}>
					{icon}
				</div>
			</div>
		</div>
	);
}