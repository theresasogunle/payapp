import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo";

class Button extends React.Component {
  constructor(props) {
    super(props);    
  }
  render() {
    let body = (
      <TouchableOpacity
        onPress={this.props.onPress ? this.props.onPress : () => {}}
      >
        <LinearGradient
          colors={["#FFB82A", "#FF9900"]}
          style={{ padding: 18, borderRadius: 8 }}
        >
          <Text style={{ color: "#FFF", textAlign: "center", fontSize: 14 }}>
            {this.props.text ? this.props.text : ""}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
    if (this.props.disabled) {
      body = (<View style={{ padding: 18, borderRadius: 8, backgroundColor: "#CCC" }}>
        <Text style={{ color: "#FFF", textAlign: "center", fontSize: 14 }}>
          {this.props.text ? this.props.text : ""}
        </Text>
      </View>);
    }
    return body;
  }
}

export default Button;
