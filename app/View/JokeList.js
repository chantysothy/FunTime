'use strict';

var JOKE_LIST_URL = "http://apis.baidu.com/showapi_open_bus/showapi_joke/joke_text";//请求地址
var IMG_LIST_URL = "http://route.showapi.com/107-33?showapi_sign=c374fd8215694c4f984345dd2b8483d1&showapi_appid=18432";//图片列表地址
var START_PAGE = 1;//起始页码

import React, {
	StyleSheet,
	View,
	ListView,
	RefreshControl,
	ActivityIndicatorIOS,
	TouchableOpacity,
	Alert,
	Text,
	Image,
	Platform
} from 'react-native';

import Dimensions from 'Dimensions';
import JokeLi from './JokeLi'
import Swiper from 'react-native-swiper'
import ProgressBar from 'ProgressBarAndroid';

var ds = new ListView.DataSource({
	rowHasChanged : (r1,r2) => r1 !== r2,
});

export default class JokeList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startPage : 1,
			imgDatas : null,
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
			this._refreshData(START_PAGE);
			this._loadImg();
		}
	}

    async _loadImg() {
    	var url = IMG_LIST_URL;
    	fetch(url, {
			method: 'GET',
		})
		.then((response) => response.json())
		.then (
			(responseData) => {
				console.log('---img---');
				console.log(responseData);
				if (responseData.showapi_res_code == 0) {

					var temp = this.state.datas;
					if (temp != null) {
						temp.lengh = 0;
					};

					temp = new Array();
					for (var i = 0; i <3; i++) {
						if (responseData.showapi_res_body.list[i] != null) {
                           temp.push(responseData.showapi_res_body.list[i]);
						}
					}

					this.setState({
						imgDatas : temp,
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

	async _refreshData(page){
		var url = JOKE_LIST_URL + '?page=' + page;
		console.log(url);
		fetch(url, {
			method: 'GET',
			headers: {
				'apikey': '09082f0baf913108dac1f71e4f4961f9',
			},
		})
		.then((response) => response.json())
		.then (
			(responseData) => {
				console.log(responseData);
				if (responseData.showapi_res_code == 0) {

					var temp = this.state.datas;
					if (temp != null) {
						temp.lengh = 0;
					};

					temp = responseData.showapi_res_body.contentlist;
					console.log(temp);

					this.setState({
						datas : temp,
						loaded : true,
						hasMore : responseData.showapi_res_body.currentPage <  responseData.showapi_res_body.allPages ? true : false,
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

	async _loadMore(page){
		var url = JOKE_LIST_URL + '?page=' + page;
		console.log(url);
		fetch(url, {
			method: 'GET',
			headers: {
				'apikey': '09082f0baf913108dac1f71e4f4961f9',
			},
		})
		.then((response) => response.json())
		.then (
			(responseData) => {
				console.log(responseData);
				if (responseData.showapi_res_code == 0) {
					var temp = this.state.datas;
					if (temp != null && responseData.showapi_res_body.contentlist != null) {
						for (var i = 0; i < responseData.showapi_res_body.contentlist.length; i++) {
							temp.push(responseData.showapi_res_body.contentlist[i]);
						};
					};

					this.setState({
						datas : temp,
						loaded : true,
						hasMore : responseData.showapi_res_body.currentPage <  responseData.showapi_res_body.allPages ? true : false,
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
			this._refreshData(START_PAGE);
			this.setState({isRefreshing : false, startPage : 1});
		},5000);
	}

	_renderRow(data, sectionID, rowID) {
		return (
			<TouchableOpacity activeOpacity={0.4} onPress={()=>this._popUpDetail(data)}>
			<JokeLi data = {data}/>
			</TouchableOpacity>
			);
	}

	_popUpDetail(data) {
		Alert.alert(data.text);
	}

	_jumpToDetail(i) {
		this.props.pnav.push({
			name : '详情',
			params : {data : this.state.imgDatas[i]},
		});
	}

	_getImgUrl(i) {
		if (this.state.imgDatas != null && this.state.imgDatas[i]) {
			return this.state.imgDatas[i].thumburl;
			console.log(this.state.imgDatas[i].thumburl);
		} else {
			return ' ';
		}
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
		this._loadMore(tempPage);
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

				<Swiper height = {120} autoplay = {(Platform.OS === 'ios') ? true : false} autoplayTimeout = {3} showsButtons = {false}>
				 <View style = {styles.slide1}>
				  <TouchableOpacity activeOpacity={0.4} onPress={()=>this._jumpToDetail(0)}>
				  <Image style = {styles.slideImg} source = {{uri : this._getImgUrl(0)}}/>
				  </TouchableOpacity>
				 </View>
				 <View style = {styles.slide2}>
				  <TouchableOpacity activeOpacity={0.4} onPress={()=>this._jumpToDetail(1)}>
				  <Image style = {styles.slideImg} source = {{uri : this._getImgUrl(1)}}/>
				  </TouchableOpacity>
				 </View>
				 <View style = {styles.slide3}>
				  <TouchableOpacity activeOpacity={0.4} onPress={()=>this._jumpToDetail(2)}>
				  <Image style = {styles.slideImg} source = {{uri : this._getImgUrl(2)}}/>
				  </TouchableOpacity>
				 </View>
				</Swiper>

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
		backgroundColor : '#efeff6'
	},

	listView : {
		flex : 1,
		overflow : 'hidden',
		marginBottom : (Platform.OS === 'ios') ? 50 : 0,
	},

	noMoreText : {
		color : '#888',
	},

	slide1 : {
		flex : 1,
		justifyContent : 'center',
		alignItems : 'center',
		backgroundColor : '#272822',
	},

	slide2 : {
		flex : 1,
		justifyContent : 'center',
		alignItems : 'center',
		backgroundColor : '#272822',
	},

	slide3 : {
		flex : 1,
		justifyContent : 'center',
		alignItems : 'center',
		backgroundColor : '#272822',
	},

	slideImg : {
		height : 120,
		width : Dimensions.get('window').width,
	}
});