'use strict';

var NEWS_LIST_URL = "http://www.tngou.net/tnfs/api/list";//请求地址
var START_PAGE = 1;
var COUNT = 20; 

import React, {
	StyleSheet,
	View,
	ListView,
	RefreshControl,
	ActivityIndicatorIOS,
	TouchableOpacity,
	Alert,
	Text,
	Platform
} from 'react-native';

import BeautyLi from './BeautyLi'
import ProgressBar from 'ProgressBarAndroid';

var ds = new ListView.DataSource({
	rowHasChanged : (r1,r2) => r1 !== r2,
});

export default class BeautyList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startPage : 1,
			datas : null,
			loaded : false,
			hasMore : false,
			isRefreshing : false,
		};
		
		this._refreshData = this._refreshData.bind(this);
		this._reloadData = this._reloadData.bind(this);
		this._loadMore = this._loadMore.bind(this);
		this._renderFooter = this._renderFooter.bind(this);
		this._onEndReached = this._onEndReached.bind(this);
		this._renderRow = this._renderRow.bind(this);
	}

	componentDidMount() {
		if (!this.state.loaded) {
			this._refreshData(START_PAGE,COUNT);
		}
	}

	async _refreshData(page,count){
		var url = NEWS_LIST_URL + '?id=6&page=' + page + '&rows=' + count;
		console.log(url);
		fetch(url, {
			method: 'GET',
		})
		.then((response) => response.json())
		.then (
			(responseData) => {
				console.log(responseData);
				if (responseData.status == true) {

					var temp = this.state.datas;
					if (temp != null) {
						temp.lengh = 0;
					};

					temp = responseData.tngou;

					this.setState({
						datas : temp,
						loaded : true,
						hasMore : responseData.tngou.length < COUNT ? false : true,
					});

				} else {
					Alert.alert('网络繁忙，请稍后重试');
				}
			}
			)
		.catch((error) => {
			console.log(error);
			Alert.alert('擦，接口又挂了！');
		})
		.done();
	}

	async _loadMore(page,count){
		var url = NEWS_LIST_URL + '?id=6&page=' + page + '&rows=' + count;
		console.log(url);
		fetch(url, {
			method: 'GET',
		})
		.then((response) => response.json())
		.then (
			(responseData) => {
				console.log(responseData);
				if (responseData.status == true) {
					var temp = this.state.datas;
					if (temp != null && responseData.tngou != null) {
						for (var i = 0; i < responseData.tngou.length; i++) {
							temp.push(responseData.tngou[i]);
						};
					};

					this.setState({
						datas : temp,
						loaded : true,
						hasMore : responseData.tngou.length < COUNT ? false : true,
					});

				} else {
					Alert.alert('网络繁忙，请稍后重试');
				}
			}
			)
		.catch((error) => {
			console.log(error);
			Alert.alert('擦，接口又挂了！');
		})
		.done();
	}

	_reloadData() {
		this.setState({
			isRefreshing : true
		});

		setTimeout(() => {
			this._refreshData(START_PAGE, COUNT);
			this.setState({isRefreshing : false, startPage : 1});
		},5000);
	}

	_renderRow(data, sectionID, rowID) {
		console.log('------');
		console.log((Platform.OS === 'ios'));
		return (
			<TouchableOpacity activeOpacity={0.4} onPress={()=>this._jumpToDetail(data)}>
			<BeautyLi data = {data}/>
			</TouchableOpacity>
			);
	}

	_jumpToDetail(data) {
		this.props.pnav.push({
			name : '美女详情',
			params : {data : data},
		});
	}

	_renderFooter() {
		if (this.state.hasMore) {
			if (Platform.OS === 'ios') {
				return (
				<View style={{height:40,alignItems:'center',justifyContent:'center'}}>
				<ActivityIndicatorIOS color = {'#d43d3d'} />
				</View>
				);
			} else {
				return (
					<View style={{height:40,alignItems:'center',justifyContent:'center'}}>
					<ProgressBar color = {'#d47b83'} styleAttr="Small" />
					</View>
				);
			}
		} else {
			return (
				<View style={{height:40,alignItems:'center',justifyContent:'center'}}>
				<Text style = {styles.noMoreText}>客官，看完了！</Text>
				</View>
				);
		}
	}

	_onEndReached() {
		var tempPage = this.state.startPage + 1;
		this._loadMore(tempPage, COUNT);
		this.setState({startPage : tempPage});
	}

	render() {
		if (!this.state.loaded) {
			if(Platform.OS === 'ios') {
				return (
					<View style={{flex:1}}>
					<View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
					<ActivityIndicatorIOS color = {'#d43d3d'} />
					</View>
					</View>
					);
			} else {
				return (
					<View style={{flex:1}}>
					<View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
					<ProgressBar color = {'#d47b83'} />
					</View>
					</View>
					);
			}
		} else {
			return (
				<View style = {styles.listViewContainer} >

				<ListView style = {styles.listView}
				automaticallyAdjustContentInsets = {false}
				initialListSize = {20}
				pageSize = {20}
				scrollRenderAheadDistance={50}
				onEndReachedThreshold={100}
				removeClippedSubviews = {true}
				dataSource = {ds.cloneWithRows(this.state.datas)}
				renderRow = {this._renderRow}
				minPulldownDistance = {30}
				renderFooter = {this._renderFooter}
				onEndReached = {this._onEndReached}
				refreshControl = {
					<RefreshControl
					refreshing = {this.state.isRefreshing}
					onRefresh = {this._reloadData}
					tintColor = '#d43d3d'
					title = "Loading..."
					/>
				}
				/>
				</View>
				);
		}
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffffff',
	},

	listViewContainer : {
		flex : 1,
		marginTop : (Platform.OS === 'ios') ? 64 : 48,
		backgroundColor : '#efefef'
	},

	listView : {
		flex : 1,
		overflow : 'hidden',
		marginBottom : (Platform.OS === 'ios') ? 50 : 0,
	},

	noMoreText : {
		color : '#888',
	},
});