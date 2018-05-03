import * as React from "react";
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body } from "native-base";
import RN from 'react-native';

import styles from "./styles";
import htmlsrc from '../../../../resources/index.html'

export interface Props {
	navigation: any;
}
export interface State { text: string, text2: string }
class WebPage extends React.Component<Props, State> {
	myWebView: any // RN.WebViewStatic
	constructor(props) {
		super(props)
		this.state = {
			text: "ReactNative WebView Sample",
			text2: ''
		}
	}
	handleDataReceived(msgData) {
		this.setState({
			text2: `Message from web view ${msgData.data}`
		});
		msgData.isSuccessfull = true;
		msgData.args = [msgData.data % 2 ? "green" : "red"];
		this.myWebView.postMessage(JSON.stringify(msgData));
	}
	onWebViewMessage(event) {
		console.log("Message received from webview");

		let msgData;
		try {
			msgData = JSON.parse(event.nativeEvent.data);
		} catch (err) {
			console.warn(err);
			return;
		}

		switch (msgData.targetFunc) {
			case "handleDataReceived":
				this[msgData.targetFunc].apply(this, [msgData]);
				break;
		}
	}
	render() {
		const param = this.props.navigation.state.params;
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="ios-arrow-back" />
						</Button>
					</Left>

					<Body style={{ flex: 3 }}>
						<Title> Web Page </Title>
					</Body>

					<Right />
				</Header>
				<Content padder>
					<Text style={styles.welcome}>text:{this.state.text}</Text>
					<Text style={styles.welcome}>text2:{this.state.text2}</Text>
				</Content>
				<RN.WebView
					scrollEnabled={false}
					source={{ html: htmlsrc }}
					//  { uri: 'https://github.com/facebook/react-native' }}
					// style={{ marginTop: 20 }}
					injectedJavaScript={'(function(){return "Send me back!"}());'}
					onNavigationStateChange={(navEvent) => console.log(navEvent.jsEvaluationValue)}
					//onxMessage={(event) => console.log(event.nativeEvent.data)}
					ref={webview => { this.myWebView = webview; }}
					onMessage={(ev) => { this.onWebViewMessage(ev) }}
				/>
			</Container>
		)
	}
}

export default WebPage;
