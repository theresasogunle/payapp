import React from "react";
import {
  View,
  ActivityIndicator
} from "react-native";

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{
        backgroundColor: '#212C68',
        position:'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
      }}>
        <ActivityIndicator size="large" color="#FF9900" />
      </View>
    );
  }
}

export default Loading;
