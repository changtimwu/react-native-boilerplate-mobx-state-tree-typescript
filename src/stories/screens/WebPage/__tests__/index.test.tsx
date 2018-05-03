import React from "react";
import BlankPage, { TestComp, TPButton, tpstyles } from "../index";
import { shallow, ShallowWrapper, configure } from "enzyme";
import { ButtonProperties } from 'react-native'
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const fakenav = (navname?: string) => {
	var nav = {
		state: {},
		goBack: jest.fn()
	}
	if (navname) {
		nav.state['params'] = {
			name: { item: navname }
		}
	}
	return nav
}

describe("BlankPage", () => {
})
