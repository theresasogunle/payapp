import React from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import { ShowPassword, HidePassword } from "./svg";

class CustomText extends React.Component {
  constructor(props) {
    super(props);
    let showPassword = false
    if (props.password) {
      showPassword = true
    }
    this.state = {showPassword}
  }
  render() {
    let side = null;
    let togglePassword = null;
    if (this.props.side) {
      side = <View style={{ marginRight: 15 }}>{this.props.side}</View>;
    }
    if (this.props.password) {
      togglePassword = <TouchableOpacity onPress={()=> this.setState({showPassword: !this.state.showPassword})}><ShowPassword /></TouchableOpacity>
      if (!this.state.showPassword) {
        togglePassword = <TouchableOpacity onPress={()=> this.setState({showPassword: !this.state.showPassword})}><HidePassword /></TouchableOpacity>
      }
    }
    return (
      <View>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "500",
            color: "#9696A5",
            marginBottom: 13
          }}
        >
          {this.props.label}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",

            borderBottomColor: "#D7DBE5",
            paddingBottom: 9,
            borderBottomWidth: 1
          }}
        >
          {side}
          <TextInput
            selectionColor="#27347D"
            autoCorrect={(this.props.autoCorrect)?this.props.autoCorrect: true}
            secureTextEntry={(this.state.showPassword)? true: false}
            keyboardType={(this.props.keyboardType)?this.props.keyboardType:'default'}
            autoCapitalize={(this.props.keyboardType == 'email-address')?'none': 'words'}
            style={{
              fontSize: 14,
              width: "100%",
              color: "#27347D",
              flex: 1,
              ...this.props.textStyle
            }}
          />
          
          {togglePassword}
        </View>
      </View>
    );
  }
}

export default CustomText;
