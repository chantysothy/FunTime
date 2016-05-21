'use strict';

import React, {
	StyleSheet,
	Text,
	View,
	Image
} from 'react-native';

export default class BeautyLi extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return this._li(this.props.data);
	}

	_li(data) {
		return (
			<View style = {styles.list}>
			<Image style = {styles.listImg} source = {{uri : 'http://tnfs.tngou.net/image' + data.img}} resizeMode = {'cover'}>
			<View style = {styles.listBottom}>
			<Image style = {styles.listLookImg} source = {require('./look_count.png')}/>
			<Text style = {styles.listLookText}>{data.count}</Text>
			<Image style = {styles.listCollectImg} source = {require('./collect_count.png')}/>
			<Text style = {styles.listCollectText}>{data.fcount}</Text>
			<Text style = {styles.listTitle}>{data.title}</Text>
			</View>
			</Image>
			</View>
			);

	}
}


const styles = StyleSheet.create({
	list : {
		marginTop : 10,
		marginLeft : 10,
		marginRight : 10,
		borderWidth : 1,
		borderColor : '#fff',
		backgroundColor : '#fff'
	},

	listImg : {
        marginLeft : 5,
        marginRight : 5,
        marginTop : 5,
        marginBottom : 5,
		height : 140,
		backgroundColor : '#eee' 
	},

	listBottom : {
		opacity : 0.4,
		backgroundColor : '#000',
		position : 'absolute',
		height : 25,
		bottom : 0,
		right : 0,
		left : 0,
		flexDirection : 'row'
	},

	listLookImg : {
		width : 15,
		height : 15,
		marginTop : 5,
		marginLeft : 5
	},

	listLookText : {
		fontWeight : '600',
		opacity : 1,
		color : '#fff',
		fontSize : 12,
		marginTop : 5,
		marginLeft : 2,
	},

	listCollectText : {
		fontWeight : '600',
		opacity : 1,
		color : '#fff',
		fontSize : 12,
		marginTop : 5,
		marginLeft : 3,
	},

	listCollectImg : {
		width : 11,
		height : 10,
		marginLeft : 10,
		marginTop : 7
	},

	listTitle : {
		fontWeight : '600',
		opacity : 1,
		color : '#fff',
		fontSize : 12,
		marginTop : 6,
		marginLeft : 10, 
	}

});