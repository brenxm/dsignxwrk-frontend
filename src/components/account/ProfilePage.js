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
			<p id="profile-greetings-and-name">
					Hi, Brenx
			</p>
			{/* For testing, use recent_orders.json in public dir */}
			<ProfileDisplayItems label='Recent orders'data={recentOrdersData}/>
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


function ProfileDisplayItems ({ label, data }){

	const [displayItems, setDisplayItems] = useState([]);

	useEffect(()=>{

		const loadIcons = async () => {
			const loadedItems = await Promise.all(
				data.map(async (dataItem)=>{
					const icon = await import('../../assets/image.png');
					return {
						icon: icon.default,
						itemName: dataItem.itemName,
						datePurchase: dataItem.datePurchase
					};
				})
			);

			setDisplayItems(loadedItems);
		};
		loadIcons();
	}, [data]
	);

	return (
		<div id='profile-display-items-main-cont'>
			<p className='profile-display-main-title'>{label}</p>
			<hr></hr>
			{/* each item from items requires is an object with 3 attributes
					1. item icon
					2. name of item
					3. date of purchase
				*/}
			<div id='items-container'>
				{displayItems.map((data, i)=>
					<div key={i} className='display-item-instance'>
						<img src={data.icon} className='display-item-instance-icon'></img>
						<p className='display-item-instance-name'>{data.itemName}</p>
						<p className='display-item-instance-date-purchase'>{data.datePurchase}</p>
					</div>
				)}
			</div>
			<button id="view-all-button">View all</button>
			<hr></hr>
		</div>
	);
}
