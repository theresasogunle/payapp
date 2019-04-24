import React from "react";
import Dialog from "react-native-dialog";
import { View } from "react-native";

class   extends React.Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.initiateCharge = this.initiateCharge.bind(this);
    this.handleInitiateChargeRespone = this.handleInitiateChargeRespone.bind(
      this
    );
  }
  handleContinue() {
    this.props.onContinue()
  }
  render() {
    return (
      <View>
        <Dialog.Container visible={this.props.visible}>
          <Dialog.Title>{this.props.title}</Dialog.Title>
          <Dialog.Description>
            {this.props.description}
          </Dialog.Description>
          <Dialog.Input value={this.props.value} style={{borderRadius: 0}} clearButtonMode="while-editing" placeholder="••••" keyboardType="number-pad" secureTextEntry={true}  />
          <Dialog.Button label="Continue" onPress={this.handleContinue} />
        </Dialog.Container>
      </View>
    );
  }
}

export default DialogModal;
