import React from 'react';
import { TextFieldOne, TextButtonOne } from '../CommonComponents';
import { ButtonOne } from '../CommonComponents';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import checkIconGreen from '../../assets/check-black.png';
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

	/*return (
		<form id="login-page">
			<h3 id="login-page-title">Login</h3>
			<TextFieldOne label={'Username'}/>
			<TextFieldOne label={'Password'} errorMessage={'Username and password does not match.'} errorMessageEnabled={errorMessageEnabled}></TextFieldOne>
			<ButtonOne label={'Login'} />
			<button>Forgot username or password</button>
			<p>or</p>
			<TextButtonOne onClickFn={createAccountHandleButton} label="Create an account"/>
		</form>
		);
		*/

	function onSubmitHandle(e){
		const formData = new FormData(e.target.form);
		console.log(formData.entries());
		console.log('what up');
	}

	return (
		<div id="login-page">
			<form>
				<label htmlFor="username">Username</label>
				<input name="username"></input>
				<label htmlFor="password">Password</label>
				<input name="password" type='password' minLength='2'></input>
				<button type="button" onClick={onSubmitHandle}>Submit</button>
			</form>
			<TextButtonOne onClickFn={createAccountHandleButton} label="Create an account" />
		</div>
	);
}

export function RegistrationPage() {
	let navigate = useNavigate();

	function handleLoginInsteadBtn(){
		navigate('/login');
	}


	/* Password Validation Indicators
		Arguments:
			validations - (Array of objects)
				schema per object 
					flag: (bool) - validation testing 
					description: (str) - description of the test/flag

	 */
	/* eslint-disable-next-line */
	function PasswordValidationIndicators({pwValidations}){
		
		// Initialize validation flags to useState var
		const tempValidations = pwValidations.map((val)=>{
			return val['status'] = 'pending';
		});

		// eslint-disable-next-line
		const [validationStatuses, setValidationStatuses] = useState(tempValidations);
		
		

		function ValidationCheckElement({status, description}){
			return (
				<div className='pw-validation-checks-cont'>
					<img src={
						status == 'pending' ? checkIconGray : checkIconGreen
					} className='registration-page-pw-check-mark' />
					<p>{description}</p>
				</div>
			);
		}

		return (
			<div>
				{validationStatuses.map((val, i)=>{
					return <ValidationCheckElement key={i} status={val['status']} description={val['description']}/>;
				})}
			</div>
		);
	}

	return (
		<div id='registration-page-main-cont'>
			<p id='registration-page-title'>Register an account</p>
			<TextFieldOne label="First Name" validationFlag={validations()[0]['flag']}/>
			<TextFieldOne label="Last Name" />
			<TextFieldOne label="Email address" />
			<TextFieldOne label="Phone Number" />
			<TextFieldOne label="Address 1" />
			<TextFieldOne label="Address 2" />
			<TextFieldOne label="City" />
			<TextFieldOne label="State" />
			<ButtonOne label={'submit'} />
			<TextButtonOne label={'Login instead'} onClickFn={handleLoginInsteadBtn}/>
		</div>
	);
}

