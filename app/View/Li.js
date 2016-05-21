'use strict';

import React, {
	StyleSheet,
	Text,
	View,
	Image
} from 'react-native';

import Dimensions from 'Dimensions';


export default class Li extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return this._li(this.props.data);
	}

	_li(data) {
		return (
			<View style = {styles.list}>
			<View style = {{flexDirection : 'row'}}>
			<View style = {styles.listContent}>
			<Text style = {styles.listTitle} numberOfLines = {2}>{data.title}</Text>
			<Text style = {styles.listDesc} numberOfLines = {1}>{data.ctime}</Text>
			<Text style = {styles.listFrom} numberOfLines = {1}>{data.description}</Text>
			</View>
			<Image style = {styles.listImg} source = {{uri : data.picUrl}} />
			</View>
			</View>
			);
	}
}


const styles = StyleSheet.create({
	list : {
		paddingTop : 15,
		paddingBottom : 15,
		paddingLeft : 15,
		paddingRight : 15,
		backgroundColor : '#fff',
		marginBottom : 1,
	},

	listContent : {
		flex : 1,
		height : Dimensions.get('window').width * 67/375,
		position : 'relative'
	},

	listTitle : {
		fontWeight : '400',
		marginTop : 0,
		letterSpacing : 0.8,
		fontSize : 16,
		color : '#333',
	},

	listImg : {
		marginLeft : 15,
		width : Dimensions.get('window').width * 90/375,
		height : Dimensions.get('window').width * 67/375,
		backgroundColor : '#eeeeee'
	},

	listDesc : {
		fontSize : 12,
		color : '#bbb',
		position : 'absolute',
		bottom : 2
	},

	listFrom : {
		fontSize : 12,
		color : '#bbb',
		position : 'absolute',
		right : 2,
		bottom : 2
	}

});