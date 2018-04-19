import React from "react";
import BlankPage from "../index";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const navigation = { state: jest.fn() };

it("renders correctly", () => {
	const tree = shallow(<BlankPage navigation={navigation} />)
	expect(tree).toMatchSnapshot();
});
