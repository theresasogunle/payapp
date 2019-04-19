import React from "react";
import { Text, ImageBackground, View, TouchableOpacity } from "react-native";
import { StackActions } from 'react-navigation';

class Top extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ImageBackground
        source={require("../assets/img/bg-top.png")}
        style={{
          width: "100%",
          height: 180,
          paddingVertical: 40,
          backgroundPosition: "bottom"
        }}
        imageStyle={{
          // resizeMode: "cover",
          alignSelf: "flex-end"
        }}
      >
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={{ color: "#FFFFFF", fontSize: 30, marginLeft: 20, fontWeight: '500' }}>
            {(this.props.mainText)?this.props.mainText:''}
          </Text>
          <TouchableOpacity onPress={()=>this.props.navigation.dispatch(StackActions.popToTop())}>
            <Text style={{ color: "#FFFFFF", fontSize: 16, marginRight: 20, fontSize: 12, paddingVertical: 15 }}>
              {(this.props.cancelText)?this.props.cancelText:'Cancel'}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

export default Top;