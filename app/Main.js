'use strict';

import React, {
	StyleSheet,
	Navigator,
	TouchableOpacity,
	Text,
	Platform
} from 'react-native';

import TabIndex from './View/TabIndex'
import Detail from './View/Detail'
import BeautyDetail from './View/BeautyDetail'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Main extends React.Component {
	constructor(props) {
		super(props);
	}
	
	_renderScene(route,nav) {
		if (route.name == "详情") {
			return <Detail {...route.params} pnav = {nav} />;
		} else if (route.name == '美女详情') {
			return <BeautyDetail {...route.params} pnav = {nav} />;
		} else {
			return <TabIndex pnav = {nav} />;
		}        
	}

	render() {
		return (
			<Navigator
			style = {styles.container}
			initialRoute = {{name : '首页'}}
			renderScene = {this._renderScene}
			navigationBar = {
				<Navigator.NavigationBar 
				translucent = {true}
				style = {styles.navBar}
				routeMapper = {NavigationBarRouteMapper}
				/>
			}
			>
			</Navigator>
			);
	}
};

var NavigationBarRouteMapper = {

	LeftButton(route, navigator, index, navState) {
		if (index > 0) {
			return (
				<TouchableOpacity
				onPress={() => navigator.pop()}
				style={styles.navLeftButton}>
				<Icon
				name='ios-arrow-left'
				size={30}
				color='#666'
				style={styles.icon}
				/>
				</TouchableOpacity>
				);
		} else {
			return null;
		}
	},

	RightButton(route, navigator, index, navState) {
		return null;
	},

	Title(route, navigator, index, navState) {
		// if (Platform.OS === 'ios') {
			return (
				<Text style = {styles.navBarTitle} >
				{route.name}
				</Text>
				);
		// } else {
			// return null;
		// }

	}
	
};

const styles = StyleSheet.create({
	container : {
		flex : 1,
	},

	navBar : {
		backgroundColor : '#fdfdfd',
		borderColor : '#dddddd',
		borderWidth : 1,
		height : (Platform.OS === 'ios')? 64: 48,
	},

	navLeftButton : {
		paddingLeft : 5,
	},

	navBarTitle : {
		fontSize : 20,
		fontWeight: (Platform.OS === 'ios')? '500': '300',
		letterSpacing : 0.8,
		marginTop: (Platform.OS === 'ios')? 12: 20,
		color : '#272822', 
	},

	icon : {
		width : 30,
		height : 30,
		marginTop:(Platform.OS === 'ios')? 6: 9,
		textAlign :'center'
	}
});