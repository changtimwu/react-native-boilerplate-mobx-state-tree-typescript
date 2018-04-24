import React from "react";
import Login from "../index"
import { shallow, ShallowWrapper, configure } from "enzyme"
import { ButtonProperties } from 'react-native'
import Adapter from "enzyme-adapter-react-16"

configure({ adapter: new Adapter() });

const onLogin = jest.fn();
const fillDefault = jest.fn();
const loginForm = (
	<form>
	</form>
)


describe("LoginPage", () => {
	const w = shallow(<Login onLogin={onLogin} loginForm={loginForm} fillDefault={fillDefault} />)
	let btn
	describe("Render", () => {
		it("login button is there", () => {
			// <Button block onPress={() => this.props.onLogin()}>
			let t = w.find('Styled(Button) Styled(Text)').first()
			expect(t.contains('Login')).toBeTruthy()
		})
	})
	describe('Interaction', () => {
		it("login button trigs prop func", () => {
			btn = w.find('Styled(Button)').first()
			btn.props().onPress()
			expect(onLogin).toHaveBeenCalledTimes(1)
		})
		it("default button trigs prop func", () => {
			btn = w.find('Styled(Button)').at(1)
			btn.props().onPress()
			expect(fillDefault).toHaveBeenCalledTimes(1)
		})
	})
})
