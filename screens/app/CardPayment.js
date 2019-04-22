import React from "react";
import { View, StatusBar, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo";
import { Dial, Lock, Card, Calendar } from "../../components/svg";
import Button from "../../components/Button";
import client from "../../plugins/apollo";
import Top from "../../components/Top";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomText from "../../components/Text";
import cardValidator from "card-validator";

// this is the screen that shows when the user wants to make payment
class CardPayment extends React.Component {
  // this removes the default header reactnavigation brings
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      cardno: "",
      carddate: "",
      cvv: "",
      error_password: ""
    };
    this.validate = this.validate.bind(this);
    this.cc_format = this.cc_format.bind(this);
  }
  // this checks for error in the form
  async validate() {
    // this.setState({ error_password: "" });
    // if (this.state.password.length < 8) {
    //   this.setState({ error_password: "Incorrect Password" });
    //   return false;
    // }
    // return true;
  }
  date_format(carddate) {
    if (carddate.length <= 2) {
      if (parseInt(carddate) > 12) {
        return this.setState({ carddate: "12" });
      }
      this.setState({ carddate });
    }
    if (carddate.length === 3) {
      if (!isNaN(carddate[carddate.length - 1])) {
        String.prototype.splice = function(idx, rem, str) {
          return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
        };
        this.setState({ carddate: carddate.splice(2, 0, "/") });
      } else {
        this.setState({ carddate: carddate.slice(0, carddate.length - 1) });
      }
    }
    if (carddate.length === 5) {
      if (carddate.includes("/")) {
        this.setState({ carddate });
      }
    }
  }
  // Makes the card input appear in 4-digit interval apart from VERVE cards eg 4242 4242 4242 4242 instead of 4242424242424242
  cc_format(value) {
    var v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    var matches = v.match(/\d{4,16}/g);
    var match = (matches && matches[0]) || "";
    var parts = [];
    if (value.replace(/\s/g, "").replace(/[^0-9]/gi, "").length > 16) {
      this.setState({
        cardno: value.replace(/\s/g, "").replace(/[^0-9]/gi, "")
      });
    } else {
      for (i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }
      if (parts.length) {
        let newValue = parts.join(" ");

        this.setState({
          cardno: newValue
        });
      } else {
        this.setState({
          cardno: value
        });
      }
    }
  }

  render() {
    let card = <Card />;

    let numberValidation = cardValidator.number(this.state.cardno);
    if (!numberValidation.isPotentiallyValid) {
      card = <Card />;
    }
    if (numberValidation.card) {
      if (numberValidation.card.type == "visa") {
        card = <Image source={require("../../assets/icons/cardvisa.png")} />;
      } else if (numberValidation.card.type == "mastercard") {
        card = <Image source={require("../../assets/icons/cardmaster.png")} />;
      } else if (
        numberValidation.card.type == "maestro" ||
        numberValidation.card.type == "discover"
      ) {
        card = <Image source={require("../../assets/icons/cardverve.png")} />;
      }
    } else {
      card = <Card />;
    }
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
                  side={card}
                  label="Card Number"
                  keyboardType="cardnum"
                  value={this.state.cardno}
                  error={this.state.error_password}
                  onChangeText={cardno => this.cc_format(cardno)}
                />
                <View style={{ marginBottom: 13 }} />
                <View
                  style={{
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row"
                  }}
                >
                  <CustomText
                    side={<Calendar />}
                    label="Expiry Date"
                    refs={2}
                    keyboardType="card_date"
                    value={this.state.carddate}
                    error={this.state.error_password}
                    onChangeText={carddate => this.date_format(carddate)}
                  />
                  <View style={{ width: 20 }} />
                  <CustomText
                    side={<Calendar />}
                    label="CVV"
                    keyboardType= "number-pad"
                    password={true}
                    value={this.state.cvv}
                    error={this.state.error_password}
                    onChangeText={cvv => this.setState({ cvv })}
                  />
                </View>
                <View style={{ marginBottom: 13 }} />
                <Button
                  text="Confirm"
                  onPress={() => {}}
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

export default CardPayment;
