import React from 'react';
import recentOrdersData from '../../../public/recent_order_tests/recent_orders.json';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
	return (
		<div id="profile-page-main-cont">
			<div id="profile-page-nav-bar">
				<NavButtons label="View/Edit Profile"/>
				<NavButtons label="logout"/>
			</div>
			<div>
                Hi, Brenx
			</div>
			{/* For testing, use recent_orders.json in public dir */}
			<ProfileDisplayItems label='Recent orders'items={recentOrdersData}/>
		</div>
	);
}

/* profile page nav buttons*/
function NavButtons({label}){
	return (
		<button>
			{label}
		</button>
	);
}


function ProfileDisplayItems ({ label, items: data }){

	const [displayItems, setDisplayItems] = useState([]);
	// Modify each item to load icon using 'import' with 'icon' attribute as reference
	let items = [];

	useEffect(
		()=>{
			items = data.map((data) => {
				return {
					icon: import('../../assets/image.png').then((module) => module.default),
					itemName: data.itemName,
					datePurchase: data.datePurchase
				};
			});

			setDisplayItems(items);
			console.log(items);
		}, []
	);

	return (
		<div id='profile-display-items-main-cont'>
			<h3>{label}</h3>
			<hr></hr>
			{/* each item from items requires is an object with 3 attributes
                1. item icon
                2. name of item
                3. date of purchase
            */}
			<div id='items-container'>
				{displayItems.map((data, i)=>
					<div key={i}>
						<img src={data.icon}></img>
						<p>{data.itemName}</p>
						<p>{data.datePurchase}</p>
					</div>
				)}
			</div>
            
			<hr></hr>
		</div>
	);
}
