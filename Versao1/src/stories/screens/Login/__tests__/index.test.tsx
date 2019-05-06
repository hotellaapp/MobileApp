import React from "react";
import Login from "../index";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

const onLogin = jest.fn();
const goList = jest.fn();
const goHotel = jest.fn();
const loginForm = React.Component;

it("renders correctly", () => {
	const tree = renderer.create(<Login onLogin={onLogin} loginForm={loginForm} goList ={goList} isLoggedIn = {false} goHotel={goHotel}/>).toJSON();
	expect(tree).toMatchSnapshot();
});
