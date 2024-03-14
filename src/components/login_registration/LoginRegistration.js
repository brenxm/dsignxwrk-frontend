import React from 'react';
import { TextFieldOne } from '../CommonComponents';
import { ButtonOne } from '../CommonComponents';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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
			<button onClick={createAccountHandleButton}>Create an account</button>
		</div>
	);
}

export function RegistrationPage() {
	return (
		<div>
			<TextFieldOne label="First Name" />
			<TextFieldOne label="Last Name" />
			<TextFieldOne label="Email address" />
			<TextFieldOne label="Phone Number" />
			<TextFieldOne label="Address 1" />
			<TextFieldOne label="Address 2" />
			<TextFieldOne label="City" />
			<TextFieldOne label="State" />
			<TextFieldOne label="Zip Code" />
		</div>
	);
}