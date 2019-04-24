import React from "react";
import { View, StatusBar, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo";
import { Lock, Card, Calendar } from "../../components/svg";
import Button from "../../components/Button";
import Top from "../../components/Top";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomText from "../../components/Text";
import cardValidator from "card-validator";
import CardRave from "../../rave/Card";
import client from "../../plugins/apollo";
import User from "../../graphql/queries/user";

// this is the screen that shows when the user wants to make payment
class Pin extends React.Component {
  // this removes the default header reactnavigation brings
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pin: "",
      pin_error: ""
    };
    this.validate = this.validate.bind(this);
    this.initiateCharge = this.initiateCharge.bind(this);
    this.handleInitiateChargeRespone = this.handleInitiateChargeRespone.bind(
      this
    );
  }

  // charges the card
  async pinCharge() {
    this.setState({ loading: true });
    if (await this.validate()) {
      const { data } = await client.query({
        query: User
      });
      const user = data.user;

      const { pin } = this.state;
      console.log(pin);

      const card = this.props.navigation.getParam("card");
      try {
        const charge = await card.pinCharge(pin);
        this.handleInitiateChargeRespone(charge);
        this.setState({ loading: false });
      } catch (error) {
        this.setState({ pin_error: error.message, loading: false });
        return false;
      }
      // Check for suggested auth
    }
    this.setState({ loading: false });
  }

  handleInitiateChargeRespone(charge) {
    console.log(charge);
    
    if (charge.data.chargeResponseCode === "02") {
      //validate with otp
    } else if (charge.data.chargeResponseCode === "00") {
      // go to success page
    } else {
      // failure
    }
  }

  // this checks for error in the form
  async validate() {
    this.setState({ pin_error: "" });
    if (this.state.pin.length < 4) {
      this.setState({ pin_error: "Incorrect Pin" });
      return false;
    }

    return true;
  }

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        {/* change the status bar to white */}
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <LinearGradient colors={["#F8F9FE", "#F9F9F9"]} style={{ flex: 1 }}>
          <Top mainText="Add Card" navigation={this.props.navigation} />
          <View
            style={{
              position: "absolute",
              top: 100,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999
            }}
          >
            <LinearGradient colors={["#F8F9FE", "#F9F9F9"]} style={{ flex: 1 }}>
              <KeyboardAwareScrollView
                style={{
                  padding: 20,
                  alignContent: "center"
                }}
                extraScrollHeight={30}
                extraHeight={220}
                enableOnAndroid={true}
              >
                <CustomText
                  side={<Lock />}
                  label="Enter your Pin"
                  keyboardType="number-pad"
                  password={true}
                  value={this.state.pin}
                  error={this.state.pin_error}
                  onChangeText={pin => this.setState({ pin })}
                />
                <View style={{ marginBottom: 13 }} />
                <Button
                  text="Confirm"
                  onPress={() => this.initiateCharge()}
                  loading={this.state.loading}
                />
                <View style={{ marginBottom: 13 }} />
              </KeyboardAwareScrollView>
            </LinearGradient>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default Pin;
