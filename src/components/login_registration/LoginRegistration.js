import React from 'react';
import { TextFieldOne, TextButtonOne, PasswordInputField } from '../CommonComponents';
import { ButtonOne } from '../CommonComponents';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import checkIconGreen from '../../assets/check-black.png';
import checkIconGray from '../../assets/check-gray.png';


export function LoginPage() {

	/* eslint-disable-next-line*/
	const [errorMessageEnabled, setErrorMessageEnabled] = useState(false);
	let navigate = useNavigate();

	function createAccountHandleButton(){
		console.log('clicked button');
		navigate('/registration');
	}

	return (
		<div id="login-page">
			<h3 id="login-page-title">Login</h3>
			<TextFieldOne label={'Username'}/>
			<TextFieldOne label={'Password'} errorMessage={'Username and password does not match.'} errorMessageEnabled={errorMessageEnabled}></TextFieldOne>
			<ButtonOne label={'Login'} />
			<button>Forgot username or password</button>
			<p>or</p>
			<TextButtonOne onClickFn={createAccountHandleButton} label="Create an account"/>
		</div>
	);
}

export function RegistrationPage() {
	let navigate = useNavigate();

	function handleLoginInsteadBtn(){
		navigate('/login');
	}

	/* eslint-disable-next-line */
	function PasswordRequirementIndicationCheck(){

		/**** 
		 *  3 status type in str
		 *  1. 'approved' - meet the criteria for this specific requirement
		 *  2. 'invalid' - when submitted but didn't meet criteria
		 *  3. 'pending'- when neither approved or submitted
		 *   ****/
		/* eslint-disable-next-line */
		const [status, setStatus] = useState('pending');

	
		return (
			<div className='check-mark-indicator-cont'>
				<img src={
					status=='pending' ? checkIconGray : checkIconGreen
				} className='registration-page-pw-check-mark'/>
				<p>{}</p>
			</div>
		);
	}

	return (
		<div id='registration-page-main-cont'>
			<p id='registration-page-title'>Register an account</p>
			<TextFieldOne label="First Name" />
			<TextFieldOne label="Last Name" />
			<TextFieldOne label="Email address" />
			<TextFieldOne label="Phone Number" />
			<TextFieldOne label="Address 1" />
			<TextFieldOne label="Address 2" />
			<TextFieldOne label="City" />
			<TextFieldOne label="State" />
			<PasswordInputField label="Password"/>
			<PasswordInputField label="Verify Password"/>
			<ButtonOne label={'submit'} />
			<TextButtonOne label={'Login instead'} onClickFn={handleLoginInsteadBtn}/>
		</div>
	);
}