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
	describe("Render", () => {
		it("can render correctly when input navigation has name param", () => {
			const inputTitle = 'kjdkjsljkas'
			const w = shallow(<BlankPage navigation={fakenav(inputTitle)} />)
			let t = w.find('Styled(Body) Styled(Title)')
			expect(t.children().text()).toEqual(inputTitle)
			t = w.find('Styled(Content) Styled(Text)')
			expect(t.children().text()).toEqual(inputTitle)
		})
		it("can render correctly when input navigation has no param at all", () => {
			const w = shallow(<BlankPage navigation={fakenav()} />)
			let t = w.find('Styled(Body) Styled(Title)')
			expect(t.children().text()).toEqual("Blank Page")
			t = w.find('Styled(Content) Styled(Text)')
			expect(t.children().text()).toEqual("Create Something Awesome . . .")
		})
	})
	describe("Back Button", () => {
		let btn
		it("works", () => {
			let nav = fakenav()
			const w = shallow(<BlankPage navigation={nav} />)
			btn = w.find('Styled(Button)').first()
			btn.props().onPress()
			expect(nav.goBack).toHaveBeenCalledTimes(1)
		})
	})
})

describe("ReactNative", () => {
	describe("Button", () => {
		let wrapper: ShallowWrapper
		let btn: ShallowWrapper
		beforeEach(() => {
			wrapper = shallow(<TestComp />)
			btn = wrapper.find('Button')
		})
		it("render correctly", () => {
			expect(btn.prop('title')).toEqual('before press')
		})
		it("can change title via public action", () => {
			(wrapper.instance() as TestComp).changeTitle()
			wrapper.update()
			// you have to find again because the button was actually re-generated due to prop change
			let b = wrapper.find('Button')
			expect(b.prop('title')).toEqual('title updated')
		})

		it("can change title via button press", () => {
			(btn.props() as ButtonProperties).onPress()
			wrapper.update()
			// you have to find again because the button is actually re-generated due to prop change
			let b = wrapper.find('Button')
			expect(b.prop('title')).toEqual('title updated')
		})
	})
})

describe("TPButton", () => {
	describe("Rendering", () => {
		let wrapper
		beforeEach(() => {
			wrapper = shallow(<TPButton label="Submit" onClick={() => { }} />)
		})
		it('should render a <TouchableOpacity />', () => {
			expect(wrapper.find('TouchableOpacity')).toHaveLength(1)
		})
		it('should render a label', () => {
			expect(wrapper.find('Text').contains('Submit')).toBe(true)
		})
		it('should have default style', () => {
			expect(wrapper.find('TouchableOpacity').prop('style')).toEqual(tpstyles.default)
		})
		it('should have primary style', () => {
			let w = shallow(<TPButton label="Submit" type='primary' onClick={() => { }} />)
			expect(w.find('TouchableOpacity').prop('style')).toEqual(tpstyles.primary)
		})
	})
	describe("Interaction", () => {
		let wrapper: ShallowWrapper
		let props
		beforeEach(() => {
			props = { label: 'bingo', onClick: jest.fn() }
			wrapper = shallow(<TPButton {...props} />)
		})
		it('should handle press', () => {
			wrapper = shallow(<TPButton {...props} />)
			let tpb = wrapper.instance() as TPButton
			tpb.onPress()
			expect(props.onClick).toHaveBeenCalledTimes(1)
		})
	})
})