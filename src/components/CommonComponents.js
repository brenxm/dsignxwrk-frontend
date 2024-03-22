import React from 'react';

export function Header({ icon, title, message }) {
	return (
		<div className="section-header_cont">
			<div id="section-header_icon_title_cont">
				<img src={icon}></img>
				<h2>{title}</h2>
			</div>
			<p>{message}</p>
		</div>
	);
}

export function ImageSlider({ images, iconSelection }) {
	return (
		<div className="image-slider_cont">
			{/* Images */}
			<div id="image-slider_image-frame">
				<img id="image-slider_img" src={images[0]}></img>
			</div>

			{/* Selection indicatior */}
			<div id="image-slider_selector-cont">
				{iconSelection
					? iconSelection.map((icon, i) => <img src={icon} key={i}></img>)
					: images.map((icon, i) => (
						<div id="default-dot-selection_unselected" key={i}></div>
					))}
			</div>
		</div>
	);
}

export function ScrollDownButton({ label, scrollCord }) {
	function handleClick() {
		window.scrollTo(0, scrollCord);
	}
	return (
		<button className="scrolldown-but_cont" onClick={handleClick}>
			<p>{label}</p>
			<div id="scrolldown-but_arrow"></div>
		</button>
	);
}
export function Spacer({ size }) {
	return <div className="spacer" style={{ flexGrow: size }}></div>;
}


export function TextFieldOne({label, placeholder, errorMessage, errorMessageEnabled, onChangeFn}) {

	return (
		<div className='input-field-one-main-cont'>
			<p className="input-field-one-label">{label}</p>
			<input className='input-field-one-input' placeholder={placeholder} onChange={onChangeFn} ></input>
			<p className='input-field-one-error-message' style={{
				opacity: errorMessageEnabled ? '1' : '0'
			}}>{errorMessage}</p>
		</div>
	);
}

export function PasswordInputField({label, errorMessage}){
	return (
		<div className='pw-input-field-main-cont'>
			<p className='pw-input-field-label'>{label}</p>
			<input className='pw-input-field-input' type='password'></input>
			<p className='pw-input-field-error-message'>{errorMessage}</p>
		</div>
	);
}

export function ButtonOne({label, handleClick}){
	return(
		<button className='button-one-but' onClick={handleClick}>
			{label}
		</button>
	);
}

export function TextButtonOne({label, onClickFn}) {
	return(
		<button className="text-button-one" onClick={onClickFn}>
			{label}
		</button>
	);
}

export function CheckBoxOne({label, name}){
	<div>
		<input type='checkbox' name={name} className='checkbox-one' />
		<label htmlFor={name}>{label}</label>
	</div>;
}

