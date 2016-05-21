'use strict';

import React, {
  StyleSheet,
  TabBarIOS,
  View
} from 'react-native';

import NewsList from './NewsList';
import JokeList from './JokeList'
import BeautyList from './BeautyList'
import Icon from 'react-native-vector-icons/Ionicons';

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
          <TabBarIOS translucent = {true}  barTintColor = '#ffffff'>
          {
            TabArray.map(
              (val) => {
                return (
                  <Icon.TabBarItem
                  title = {val.title}
                  selected = {this.state.tabIndex === val.key}
                  iconName = {val.icon}
                  key = {val.key}
                  selectedIconName = {val.selectedIcon}

                  onPress = {() => {
                    this.setState({ tabIndex: val.key});
                  }}>

                  {this._renderScene()}
                  
                  </Icon.TabBarItem>
                  );
              }
              )
          }
          </TabBarIOS>
          </View>
          );
      }
    };

    const styles = StyleSheet.create({
      container: {
       flex:1,
       marginBottom:0
     },
   });
