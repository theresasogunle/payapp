import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { LinearGradient } from "expo";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: Dimensions.get('window').height
    }
  }
  render() {
    let body = (
      <TouchableOpacity
      style={{width: '100%'}}
        onPress={this.props.onPress ? this.props.onPress : () => {}}
      >
        <LinearGradient
          colors={["#FFB82A", "#FF9900"]}
          style={{ padding: (this.state.screenHeight> 580)?18: 10, borderRadius: 8, width: '100%' }}
        >
          <Text style={{ color: "#FFF", textAlign: "center", fontSize: 14 }}>
            {this.props.text ? this.props.text : ""}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
    if (this.props.disabled) {
      body = (
        <View style={{ padding: 18, borderRadius: 8, backgroundColor: "#CCC" }}>
          <Text style={{ color: "#FFF", textAlign: "center", fontSize: 14 }}>
            {this.props.text ? this.props.text : ""}
          </Text>
        </View>
      );
    }
    if (this.props.loading) {
      body = <ActivityIndicator color="#FFB82A" />;
    }
    return body;
  }
}

export default Button;
