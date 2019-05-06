import * as React from "react";
import { Item, Input, Icon, Form, Toast } from "native-base";
import { Field,reduxForm } from "redux-form";
import Login from "../../stories/screens/Login";
import {connect} from 'react-redux';
const required = value => (value ? undefined : "Required");
const maxLength = max => value => (value && value.length > max ? `Must be ${max} characters or less` : undefined);
const maxLength15 = maxLength(15);
const minLength = min => value => (value && value.length < min ? `Must be ${min} characters or more` : undefined);
const minLength8 = minLength(6);
//const email = value =>
//	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Invalid email address" : undefined;
const alphaNumeric = value => (value && /[^a-zA-Z0-9 ]/i.test(value) ? "Only alphanumeric characters" : undefined);
import { login } from "./actions";


export interface Props {
	navigation: any;
	valid:boolean;
	isLoggedIn:boolean;
	loginP:Function;
}

export interface State {}

class LoginForm extends React.Component<Props, State> {
	textInput: any;

	renderInput({ input, meta: { touched, error } }) {
		return (
			<Item error={error && touched}>
				<Icon active name={input.name === "code" ? "person" : "unlock"} />
				<Input
					ref={c => (this.textInput = c)}
					placeholder={input.name === "code" ? "Code" : "Password"}
					secureTextEntry={input.name === "password" ? true : false}
					{...input}
				/>
			</Item>
		);
	}


	login() {
		if (this.props.valid) {
				this.props.loginP(this.textInput);
		} else {
			Toast.show({
				text: "Enter Valid Code!",
				duration: 2000,
				position: "top",
				textStyle: { textAlign: "center" },
			});
		}
	}



	lista() {
		
			this.props.navigation.navigate("Drawer");
	
	}


	render() {
		const form = (
			<Form>
				<Field name="code" component={this.renderInput} validate={[alphaNumeric, required,minLength8,maxLength15]} />
				
			</Form>
		);
		return <Login loginForm={form} onLogin={() => this.login()} goList={() => this.lista()} isLoggedIn={this.props.isLoggedIn} goHotel={() => this.lista()}  />;
	}
}


const LoginReduxForm = reduxForm({
	form: "login",
})(LoginForm);


function mapDispatchToProps(dispatch) {
	return {
		loginP: code => dispatch(login(code)),
	};
}

const mapStateToProps = state => ({
    isLoggedIn: state.loginReducer.isLoggedIn,
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginReduxForm);

