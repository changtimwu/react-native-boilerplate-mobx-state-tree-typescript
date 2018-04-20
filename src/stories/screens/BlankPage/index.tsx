import * as React from "react";
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body } from "native-base";
import RN from 'react-native';

import styles from "./styles";
export interface Props {
	navigation: any;
}
export interface State { }
class BlankPage extends React.Component<Props, State> {
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
						<Title>{param ? param.name.item : "Blank Page"}</Title>
					</Body>

					<Right />
				</Header>

				<Content padder>
					<Text>{param !== undefined ? param.name.item : "Create Something Awesome . . ."}</Text>
				</Content>
			</Container>
		);

	}
}

export class TestComp extends React.Component<{}, { cap: string }> {
	constructor(props) {
		super(props)
		this.state = { cap: 'before press' }
	}

	render() {
		return (
			<RN.Button
				title="Learn More"
				onPress={() => { this.setState({ cap: 'after press' }) }}
			>
				{this.state.cap}
			</RN.Button>
		)
	}
}

export const tpstyles = RN.StyleSheet.create({
	default: { backgroundColor: 'papayawhip' },
	primary: { backgroundColor: 'pink' }
})

export class TPButton extends React.Component<{ label: string, type?: string, onClick: Function }> {
	/* 
		static propTypes = { 
			label: React.PropTypes.string.isRequired
			type:React.PropTypes.oneOf([ 'default', 'type'])
			onClick: React.PropTypes.func.isRequired 
		} // don't know this trigger error to above class's constructor
	*/
	static displayName = 'TPButton'
	static defaultProps = { type: 'default' }
	onPress() {
		this.props.onClick()
	}
	render() {
		return (
			<RN.TouchableOpacity style={tpstyles[this.props.type]} onPress={this.onPress}>
				<RN.Text>{this.props.label}</RN.Text>
			</RN.TouchableOpacity >
		)
	}
}

export default BlankPage;
