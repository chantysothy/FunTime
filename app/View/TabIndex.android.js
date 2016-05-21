'use strict';

import React, {
  StyleSheet,
  View
} from 'react-native';

import NewsList from './NewsList';
import JokeList from './JokeList'
import BeautyList from './BeautyList'
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';

var TabArray = [
{
 key:0,
 title:'头条',
 icon:'ios-paper-outline',
 selectedIcon:'ios-paper',
},
{
 key:1,
 title:'笑话',
 icon:'happy-outline',
 selectedIcon:'happy',
},
{
  key:2,
  title:'美女',
  icon:'ios-photos-outline',
  selectedIcon:'ios-photos',
},
];

export default class TabIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tabIndex:0,//被选中的tab
		};
	}

  _renderScene() {
    switch(this.state.tabIndex) {
          case 0://头条
          return <NewsList pnav = {this.props.pnav}/>;
          break;

          case 1://笑话
          return <JokeList pnav = {this.props.pnav}/>;
          break;

          case 2://美女
          return <BeautyList pnav = {this.props.pnav}/>;
          break;
        }
      }

      render() {
        return (
          <View style = {styles.container}>
          <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
          {
            TabArray.map(
              (val) => {
                return (
                  <TabNavigator.Item
                  selected = {this.state.tabIndex === val.key}
                  title = {val.title}
                  renderIcon={() => <Icon name = {val.icon} size = {25} style = {styles.tabIcon}/>}
                  renderSelectedIcon={() => <Icon name = {val.selectedIcon} size = {25} style = {styles.tabIcon}/>}
                  key = {val.key}
                  onPress = {() => {
                    this.setState({ tabIndex: val.key});
                  }}>
                  {this._renderScene()}
                  </TabNavigator.Item>
                  );
              }
              )
          }
          </TabNavigator>
          </View>
          );
      }
    };

    const styles = StyleSheet.create({
     container: {
       flex:1,
       marginBottom:0
     },

     tab: {
      height: 55,
      backgroundColor: '#fff',
      alignItems: 'center',
    },

    tabIcon : {
      marginTop: 15, 
    }

  });
