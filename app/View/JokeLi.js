'use strict';

import React, {
	StyleSheet,
	Text,
	View,
	Image
} from 'react-native';

export default class JokeLi extends React.Component {
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
			<Text style = {styles.listTitle} numberOfLines = {1}>{data.title}</Text>
			<Image style = {styles.listImg} source = {require('./enter.png')}/>
			</View>
			<View style = {styles.line}/>
			<Text style = {styles.listDesc} numberOfLines = {3}>{data.text}</Text>
			</View>
			);

	}
}


const styles = StyleSheet.create({
	list : {
		marginTop : 10,
		marginLeft : 10,
		marginRight : 10,
		paddingTop : 15,
		paddingBottom : 15,
		paddingLeft : 10,
		paddingRight : 10,
		backgroundColor : '#feffff',
		borderRadius : 5,
		borderWidth : 1,
		borderColor : '#e0e1e4'
	},

	listTitle : {
		fontWeight : '500',
		letterSpacing : 0.8,
		fontSize : 16,
		color : '#6d7789',
	},

	listImg : {
		width : 20,
		height : 20,
		position : 'absolute',
		right : - 5,
	},

	line : {
		height : 1,
		backgroundColor : '#e0e1e4',
		marginTop : 10
	},

	listDesc : {
		fontSize : 13,
		color : '#838485',
		marginTop : 10,
		marginLeft : 5
	}

});