import React from 'react';
import { TextFieldOne } from '../CommonComponents';
import { ButtonOne } from '../CommonComponents';
import { useState } from 'react';

export default function LoginRegistration() {
	return (
		<LoginPage />
	);
}

function LoginPage() {

	/* eslint-disable-next-line*/
	const [errorMessageEnabled, setErrorMessageEnabled] = useState(false);

	return (
		<div id="login-page">
			<h3 id="login-page-title">Login</h3>
			<TextFieldOne label={'Username'}/>
			<TextFieldOne label={'Password'} errorMessage={'Username and password does not match.'} errorMessageEnabled={errorMessageEnabled}></TextFieldOne>
			<ButtonOne label={'Login'} />
			<button>Forgot username or password</button>
			<p>or</p>
			<button>Create an account</button>
		</div>
	);
}

/* eslint-disable-next-line */
function RegistrationPage() {
	return (
		<div>

		</div>
	);
}