import * as React from "react";
import NativeBaseGallery from "../../stories/screens/NativeBaseGallery";
export interface Props {
	navigation: any;
}
export interface State { }
export default class NativeBaseGalleryContainer extends React.Component<Props, State> {
	render() {
		return <NativeBaseGallery navigation={this.props.navigation} />;
	}
}
