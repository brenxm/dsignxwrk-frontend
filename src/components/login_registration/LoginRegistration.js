import React, { useRef} from 'react';
import { TextButtonOne } from '../CommonComponents';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
/* eslint-disable-next-line */
import checkIconGreen from '../../assets/check-black.png';
/* eslint-disable-next-line */
import checkIconGray from '../../assets/check-gray.png';

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

	/* Modify to this change input field values*/
	/* eslint-disable-next-line */
	const inputFieldData = [
		{
			label: 'firstName',
			validations: [
				{
					flag: (val)=> val.length > 0,
					errMsg: 'This field is required.'
				},
				{
					flag: (val) => val.length <= 40,
					errMsg: 'Must not exceed 40 characters.'
				}
			],
			formatter: (val) => val
		},
		{
			label: 'lastName',
			validations: [
				{
					flag: (val) => val.length > 0,
					errMsg: 'This field is required.'
				},
				{
					flag: (val) => val.length <= 40,
					errMsg: 'Must not exceed 40 characters.'
				}
			]
		},
	];
	
	// Add id attribute to inputFieldData
	inputFieldData.map((val, i)=> val.id = i);

	console.log(inputFieldData);

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


			// Validating all processes with the current element
			for(let i = 0; i < validations.length; i++){

				// If invalid value
				if(!validations[i].flag(inputValue)){ 
					tempErrMsgs[counter] = validations[i].errMsg;
					break;
				}
			}

			counter++;

		});

		setErrorMessages(tempErrMsgs);

		console.log(tempErrMsgs);

		// Check if all inputs are valid
		const allValid = tempErrMsgs.every((value)=> value == false);
		console.log(allValid);
	}

	/* TODO: Make a schematic for input fields
	-name/label (str) - in camelcase, used as 'name' reference, label (separated by space at camelcase and first word capitalized)
	-flags (arr of obj) - check each flag in order, 
		-per flag
			-pattern/flag ((inputStr)->bool)
			-error-message (str)
			
	 */

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
					<div key={i}>
						<label htmlFor={val.label} >
							{camelCaseToCapitalized(val.label)}
						</label>
						<input name={val.label}>
							
						</input>
						<p>
							{errorMessages[val.id]}
						</p>
					</div>
				);
			})}
			<TextButtonOne label={'Login instead'} onClickFn={handleLoginInsteadBtn}/>
			<button>
				Submit
			</button>
		</form>
	);
}
