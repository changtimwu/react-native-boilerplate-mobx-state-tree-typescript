import * as React from "react";
import { Container, Header, Title, Content, Text, ActionSheet, Button, Icon, Left, Right, Body } from "native-base";
import Web3Exp from './web3exp'
let BUTTONS = [
	{ text: "Option 0", icon: "american-football", iconColor: "#2c8ef4" },
	{ text: "Option 1", icon: "analytics", iconColor: "#f42ced" },
	{ text: "Option 2", icon: "aperture", iconColor: "#ea943b" },
	{ text: "Delete", icon: "trash", iconColor: "#fa213b" },
	{ text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = 4;

import styles from "./styles";
export interface Props {
	navigation: any;
}
export interface State { }
class NativeBaseGalleryPage extends React.Component<Props, State> {
	showAction() {
		ActionSheet.show(
			{
				options: BUTTONS,
				cancelButtonIndex: CANCEL_INDEX,
				destructiveButtonIndex: DESTRUCTIVE_INDEX,
				title: "Testing ActionSheet"
			},
			buttonIndex => {
				this.setState({ clicked: BUTTONS[buttonIndex] });
			}
		)
	}
	web3init() {
		let w3 = new Web3Exp()
		w3.netinfo()
		w3.ethsysInfo()
		w3.blkinfo()
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
						<Title>{param ? param.name.item : "NativeBase Gallery"}</Title>
					</Body>

					<Right />
				</Header>

				<Content padder>
					<Button onPress={() => { this.web3init() }}><Text>Web3 Init</Text></Button>
					<Button onPress={() => { this.showAction() }} >
						<Text>Actionsheet</Text>
					</Button>
				</Content>
			</Container >
		);
	}
}

export default NativeBaseGalleryPage;
