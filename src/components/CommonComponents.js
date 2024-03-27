import React from 'react';
import { useState } from 'react';

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

/**
 * 
 * @param {
 * 	label: (str) 
 *  placeholder: (str) - optional placeholder for input field
 * 	errorMessage: (str) - description/error to display when validation fail
 *  validationFlagOnChange: (fn that accept a str as argument and returns bool) - test the validation every changes in input
 * validationFlagOnSubmit: (fn that accept a str as argutment and returns bool) - test the validation of input on submission
 * } param0 
 */
export function TextFieldOne({label, placeholder, errorMessage, validationFlag}) {
	
	/* eslint-disable-next-line */
	const [errorMessageIsEnable, setErrorMessageIsEnable] = useState(false);

	function onChangeHandle(e){
		if (!validationFlag) return;
		let text = e.target.value;
		
		console.log(validationFlag(text));
	}

	return (
		<div className='input-field-one-main-cont'>
			<label className="input-field-one-label">{label}</label>
			<input className='input-field-one-input' name={label} placeholder={placeholder} onChange={onChangeHandle} ></input>
			<p className='input-field-one-error-message' style={{
				opacity: errorMessageIsEnable ? '1' : '0'
			}}>{errorMessage}</p>
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

