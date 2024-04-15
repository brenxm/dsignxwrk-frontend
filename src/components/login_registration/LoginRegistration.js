import React, { useRef} from 'react';
import { ButtonOne, TextButtonOne } from '../CommonComponents';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
/* eslint-disable-next-line */
import checkIconGreen from '../../assets/check-black.png';
/* eslint-disable-next-line */
import checkIconGray from '../../assets/check-gray.png';
import validations from '../../../public/validations/pw_validations';

export function LoginPage() {

	/* eslint-disable-next-line*/
	const [errorMessageEnabled, setErrorMessageEnabled] = useState(false);
	let navigate = useNavigate();

	/* eslint-disable-next-line */
	function createAccountHandleButton(){
		console.log('clicked button');
		navigate('/registration');
	}

	// TODO: Update the 'action' attribute to the receiving api network path of server
	return (
		<div id="login-page">
			<form id='login-form-cont' method='POST' action=''>
				<label id='username-label' htmlFor="username">Username</label>
				<input id='username-input' name="username" required></input>
				<label id='password-label' htmlFor="password">Password</label>
				<input id='password-input'name="password" type='password' required></input>
				<p style={{
					opacity: errorMessageEnabled ? '1' : '0'
				}}id='login-form-error-message'>Username and password does not match.</p>
				<button id='login-form-submit-button' type="submit" >Login</button>
			</form>
			<TextButtonOne onClickFn={null} label='Forgot username or password'/>
			<TextButtonOne onClickFn={createAccountHandleButton} label="Create an account" />
		</div>
	);
}

export function RegistrationPage() {
	let navigate = useNavigate();
	let formRef = useRef(null);

	function handleLoginInsteadBtn(){
		navigate('/login');
	}

	/*** Modify to this change input field values ***/
	/* schematic for inputfield data 
		validChar: (regex) - accepted character,
		type: (valid input element attribute as str),
		label: (str camelCase) - renders in UI (formatted) and used as property
		validations: (array of obj) - validates input in order, first error will show in UI. No error means valid
			[
				flag: (fn) param as the input value, returns a bool,
				errMsg: (str) error message that renders if invalid
			]
		placeholder: (optional str),
		autocapitalized: (str) 
	*/
	
	const inputFieldData = [
		{
			validChar: /[a-zA-Z -]/,
			label: 'firstName',
			validations: [
				{
					flag: (val) => val.length <= 40,
					errMsg: 'Must not exceed 40 characters.'
				}
			],
			required: true,
			formatter: (val) => val
		},
		{
			validChar: /[a-zA-Z -]/,
			label: 'lastName',
			validations: [
				{
					flag: (val) => val.length <= 40,
					errMsg: 'Must not exceed 40 characters.'
				}
			],
			required: true
		},
		{
			label: 'emailAddress',
			validations: [
				{
					flag: (val) => /[\w]+@[A-Za-z0-9]+.[A-Za-z]+$/.test(val),
					errMsg: 'Invalid format. Example of accepted format youremail@yuhoo.com.'
				}
			],
			required: true
		},
		{
			validChar: /\d/,
			label: 'phoneNumber',
			type: 'number',
			validations: [
				{
					flag: (val) => /^\d\d\d[ -]?\d\d\d[ -]?\d\d\d\d$/.test(val),
					errMsg: 'Invalid phone number.'
				}
			],
			placeholder: 'Optional'
		},
		{
			label: 'addressStreet',
			validations: [],
			required: true
		},
		{
			label: 'street2',
			validations: [],
		},
	];
	
	// Add id attribute to inputFieldData
	inputFieldData.map((val, i)=> val.id = i);

	// Dynamically modify error messages of each input. If an input error message is set to undefined or false value, it means that the there is no error.
	/* eslint-disable-next-line */
	const [errorMessages, setErrorMessages] = useState(new Array(inputFieldData.length));


	function handleSubmitRegistration(e) {
		e.preventDefault();
		/* eslint-disable-next-line */
		const formData = new FormData(formRef.current);

		let counter = 0; 

		const tempErrMsgs = new Array(errorMessages.length);
		tempErrMsgs.fill(false);


		/* eslint-disable-next-line */
		formData.forEach((inputValue, inputName) => {
			// Check validations
			/* eslint-disable-next-line */
			const validations = inputFieldData[counter].validations;


			if (inputValue == ''){
				if (inputFieldData[counter].required) {
					tempErrMsgs[counter] = 'This field is required.';
				}

			} else {
				for (let i = 0; i < validations.length; i++) {

					// If invalid value
					if (!validations[i].flag(inputValue)) {

						tempErrMsgs[counter] = validations[i].errMsg;
						break;
					}
				}
			}

			counter++;
		});

		setErrorMessages(tempErrMsgs);

		console.log(tempErrMsgs);

		// Check if all inputs are valid
		const allValid = tempErrMsgs.every((value)=> value == false);
		console.log(allValid);


		// if all valid, ensure to format 
	}


	function camelCaseToCapitalized(inputStr) {
		let spacedOut = inputStr.replace(/([A-Z])/g, ' $1').trim().toLowerCase();
		let result = spacedOut.charAt(0).toUpperCase() + spacedOut.slice(1);
		return result;
	}

	return (
		<form id='registration-page-main-cont' ref={formRef} onSubmit={handleSubmitRegistration}>
			<p id='registration-page-title'>Register an account</p>
			{inputFieldData.map((val,i)=>{
				return (
					<div key={i} className='registration-input-cont'>
						<label htmlFor={val.label} className='registration-input-label'>
							{`${camelCaseToCapitalized(val.label)}${val.required ? '*' : ''}`}
						</label>
						<input name={val.label} className='registration-input-field' placeholder={val.placeholder}
							onChange={
								(e)=>{
									const lastValueIndex = e.target.value.length - 1;
									const recentCharacter = e.target.value.charAt(lastValueIndex);
									try {
										if (!val.validChar.test(recentCharacter)) {
											e.target.value = e.target.value.slice(0, lastValueIndex);
										} else {
											console.log('valid character');
										}
									} catch (error) {
										console.log(error);
									}
								}
							}
						>
						</input>
						<p className='registration-input-errmsg'>
							{errorMessages[val.id]}
						</p>
					</div>
				);
			})}
			<ButtonOne label="Register"/>
			<TextButtonOne label={'Login instead'} onClickFn={handleLoginInsteadBtn}/>
		</form>
	);
}
