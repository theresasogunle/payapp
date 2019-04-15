import React from "react";
import { Button, View } from "react-native";
import Rave from "./library/RavePayment";
import Pin from "./components/Pin";

class CardPayment extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      cardno: "5531886652142950",
      cvv: "564",
      expirymonth: "09",
      expiryyear: "22",
      pin: "",
      chargedAmount: 0,
      status: "",
      chargeResponseMessage: "",
      suggested_auth: "",
      vbvModal: false,
      vbvurl: "",
      cardnoErr: "none",
      dateErr: "none",
      cvvErr: "none",
      firstname: "Oluwole",
      lastname: "Adebiyi",
      email: "flamekeed@gmail.com",
      pinModal: false,
      otp: "",
      flwRef: "",
      otpModal: false,
      intlModal: false,
      loading: false,
      otp: "",
      intl: {}
    };
    this.rave = new Rave({
      publicKey: "FLWPUBK-8ba286388b24dbd6c20706def0b4ea23-X",
      encryptionKey: "c45e0f704619bdfe4a4324f9",
      production: false,
      currency: "NGN",
      country: "NG",
      amount: 500,
      email: "flamekeed@gmail.com",
      firstname: "Oluwole",
      lastname: "Adebiyi"
    });
    this.initiatecharge = this.initiatecharge.bind(this);
    this.handleSuggestedAuth = this.handleSuggestedAuth.bind(this);
    this.handleData = this.handleData.bind(this);
    this.confirmPin = this.confirmPin.bind(this);
  }

  componentDidMount() {
    this.initiatecharge();
  }

  // this initiates the charge
  async initiatecharge() {
    try {
      const response = await this.rave.initiatecharge({
        cardno: this.state.cardno.replace(/\s/g, ""),
        cvv: this.state.cvv.replace(/\s/g, ""),
        expirymonth: this.state.expirymonth.replace(/\s/g, ""),
        expiryyear: this.state.expiryyear.replace(/\s/g, ""),
        loading: true
      });
      // if suggested auth handle it
      if (response.data.suggested_auth) {
        const auth = response.data.suggested_auth;
        const suggested_auth = response.data.authSuggested;

        this.handleSuggestedAuth(auth.toUpperCase(), suggested_auth);
      } else {
        const data = response;
      }
    } catch (error) {
      this.props.onFailure(e);
    }
  }

  //This closes the pin modal and adds the pin to the payload
  async confirmPin() {
    this.setState({
      pinModal: false
    });
    
    try {
      const response = await this.rave.pinCharge({
        cardno: this.state.cardno.replace(/\s/g, ""),
        cvv: this.state.cvv.replace(/\s/g, ""),
        expirymonth: this.state.expirymonth.replace(/\s/g, ""),
        expiryyear: this.state.expiryyear.replace(/\s/g, ""),
        pin: this.state.pin.replace(/\s/g, "")
      });
      console.log(response.data);
      
      if (response.data.chargeResponseCode === "02") {
        //validate with otp

        this.setState({
          chargeResponseMessage: response.data.chargeResponseMessage,
          otpModal: true,
          loading: true,
          flwRef: response.data.flwRef
        });
      } else if (response.data.status.toUpperCase() === "SUCCESSFUL") {
        this.setState({
          loading: false
        });
        this.props.onSuccess(response);
      } else {
        this.setState({
          loading: false
        });
        this.props.onFailure(response);
      }
    } catch (error) {
      this.setState({
        loading: false
      });
      console.log(error);
      
      // this.props.onFailure(e);
    }
  }

  handleSuggestedAuth(auth, suggested_auth) {
    if (auth === "PIN") {
      this.setState({
        pinModal: true,
        loading: false,
        suggested_auth: suggested_auth
      });
    } else if (
      auth === "NOAUTH_INTERNATIONAL" ||
      auth === "AVS_VBVSECURECODE"
    ) {
      this.setState({
        intlModal: true,
        loading: false,
        suggested_auth: suggested_auth
      });
    }
  }

  handleData(response) {
    const {
      status,
      chargeResponseCode,
      flwRef,
      authModelUsed,
      chargeResponseMessage,
      authSuggested,
      authurl
    } = response.data;
    if (status.toUpperCase() === "SUCCESSFUL") {
      this.setState({
        loading: false,
        flwRef,
        cardno: "",
        cvv: "",
        expirymonth: "",
        expiryyear: ""
      });
      this.props.onSuccess(response);
    } else if (chargeResponseCode === "02") {
      if (
        authModelUsed.toUpperCase() === "ACCESS_OTP" ||
        authModelUsed.toUpperCase() === "GTB_OTP"
      ) {
        this.setState({
          otpModal: true,
          loading: true,
          flwRef,
          chargeResponseMessage
        });
      } else if (authModelUsed.toUpperCase() === "PIN") {
        this.setState({
          pinModal: true,
          suggested_auth: authSuggested
        });
      } else if (authModelUsed.toUpperCase() === "VBVSECURECODE") {
        this.setState({ vbvModal: true, vbvurl: authurl });
      }
    } else {
      this.setState({
        loading: false
      });
      this.props.onFailure(response);
    }
  }

  render() {
    let pn = null;
    if (this.state.pinModal) {
      pn = (
        <Pin
          confirm={this.confirmPin}
          pin={this.state.pin}
          pinEdit={pin => this.setState({ pin })}
        />
      );
    }
    return pn;
  }
}

export default CardPayment;
