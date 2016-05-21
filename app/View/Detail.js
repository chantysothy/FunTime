'use strict';

import React, {
  StyleSheet,
  View,
  Text,
  WebView,
  Dimensions,
  Platform
} from 'react-native';

export default class Detail extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.data) {
      return (
        <View style = {{flex:1}}>
        <View style = {styles.content}>
        <WebView
        source = {{uri : this.props.data.url}}
        automaticallyAdjustContentInset = {false}
        startInLoadingState = {true}
        bounces = {false}
        allowsInlineMediaPlayback = {true}
        scrollEnabled = {true}
        decelerationRate = "normal"
        />
        </View>
        </View>
        );
    }
    return null;
  }
};

var styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
  },

  content : {
    marginTop : (Platform.OS === 'ios') ? 63 : 47,
    backgroundColor : '#fff',
    width : Dimensions.get('window').width,
    flex : 1,
    borderColor : '#e6e6e6',
    borderWidth : 1,
  },
});
