import * as React from "react";
import WebPage from "../../stories/screens/WebPage";
export interface Props {
	navigation: any;
}
export interface State { }
export default class WebPageContainer extends React.Component<Props, State> {
	render() {
		return (
			<WebPage navigation={this.props.navigation} />
		)
	}
}
