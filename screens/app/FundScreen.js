import React from "react";
import { View, StatusBar, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo";
import { Lock, Card, Calendar } from "../../components/svg";
import Button from "../../components/Button";
import Top from "../../components/Top";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomText from "../../components/Text";
import client from "../../plugins/apollo";
import User from "../../graphql/queries/user";
import InitiateTransaction from "../../graphql/mutations/initiateTransaction";

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
      amount: "1000",
      amount_error: ""
    };
    this.validate = this.validate.bind(this);
    this.fund = this.fund.bind(this);
  }

  // this checks for error in the form
  validate() {
    this.setState({ amount_error: "" });
    if (parseInt(this.state.amount) < 100) {
      this.setState({ amount_error: "You can only fund above ₦100" });
      return false;
    }
    return true;
  }

  async fund() {
    if (this.validate()) {
      try {
        this.setState({loading: true})
      const { data } = await client.query({
        query: User
      });
      const user = data.user;

      const initiateTransactionData = await client.mutate({
        mutation: InitiateTransaction,
        variables: {
          amount: parseFloat(this.state.amount)
        }
      })      

      const txref = initiateTransactionData.data.initiateTransaction.transactionReference;

      this.setState({loading: false})
      return this.props.navigation.push("Rave", {
        amount: this.state.amount,
        user,
        txref
      });
      } catch (error) {
        console.log(error);
        
        this.setState({loading: false, amount_error: 'An Error Occured'})
      }
    }
    this.setState({loading: false})
  }

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        {/* change the status bar to white */}
        <StatusBar backgroundColor="#FF9E00" barStyle="light-content" />
        <LinearGradient colors={["#F8F9FE", "#F9F9F9"]} style={{ flex: 1 }}>
          <Top mainText="Fund Wallet" navigation={this.props.navigation} />
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
                  label="Amount"
                  keyboardType="money"
                  value={String(this.state.amount)}
                  error={this.state.amount_error}
                  onChangeText={amount => this.setState({ amount })}
                />
                <View style={{ marginBottom: 13 }} />

                <Button
                  text="Fund"
                  onPress={() => this.fund()}
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
