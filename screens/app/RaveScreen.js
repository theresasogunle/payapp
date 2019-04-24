import Rave from "../../rave";
import React from "react";

class RaveScreen extends React.Component {
  // this removes the default header reactnavigation brings
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onSuccess(data) {
    console.log("success", data);
    // You can get the transaction reference from successful transaction charge response returned and handle your transaction verification here
  }

  onFailure(data) {
    console.log("error", data);
  }

  onClose() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <Rave
        amount={this.props.navigation.getParam("amount")}
        country="NG"
        currency="NGN"
        email={this.props.navigation.getParam("user").email}
        firstname={this.props.navigation.getParam("user").fullname.split(' ')[0]}
        lastname={this.props.navigation.getParam("user").fullname.split(' ')[1]}
        publickey="FLWPUBK_TEST-1ba65cd2109b117eba7acc5d9dc79533-X"
        encryptionkey="FLWSECK_TEST91579052f76f"
        production={true}
        onSuccess={res => this.onSuccess(res)}
        onFailure={e => this.onFailure(e)}
        onClose={e => this.onClose(e)}
      />
    );
  }
}

export default RaveScreen;
