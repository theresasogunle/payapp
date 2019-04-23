import React from "react";
import { View, StatusBar, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo";
import Button from "../../components/Button";
import Top from "../../components/Top";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomText from "../../components/Text";

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

// this is the screen that shows when the user wants to send money
class TransferScreen extends React.Component {
  // this removes the default header reactnavigation brings
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      amount: "",
      accountNumber:""
    };
  }
  // this checks for error in the form
  async validate() {
    // set all the errors to empty
    this.setState({ error_amount: "" });
    this.setState({ error_accountNumber: "" });
    
    
    // validate amount
    
    if (this.state.amount < 100) {
      this.setState({
        error_amount: "The lowest amount is 100 NGN"
      });
    }
    if (this.state.amount > 100000) {
      this.setState({
        error_amount: "The highest amount is 100,000 NGN"
      });
    }
    // validate accountNumber
    if (this.state.accountNumber.length < 10) {
      this.setState({
        error_accountNumber: "Invalid account number"
      });
    }
  // i put the sleep function so as for the function can take time to validate before returning a response
  await sleep(1200);
  // check if all errors are empty
  if (
    this.state.error_amount == "" &&
    this.state.error_accountNumber == ""
   
  ) {
    return true;
  }
  return false;
  
  }

  async sendMoney(){
   
    if( await this.validate()){
      console.log("Working");
      
    }else{
      console.log("Error");
      
    }
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
          <Top mainText="Send Money" navigation={this.props.navigation} />
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
                  size={18}
                  textWeight={"400"}
                  side={
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#27347D",
                        fontWeight: "bold"
                      }}
                    >
                      {"\u20A6"}
                    </Text>
                  }
                  label="Amount"
                  keyboardType="phone-pad"
                  value={this.state.amount}
                  error={this.state.error_amount}
                  onChangeText={amount => this.setState({ amount })}
                />
                <View style={{ marginBottom: 13 }} />
                <CustomText keyboardType="dropdown" label="Choose the bank"  />
                <View style={{ marginBottom: 13 }} />
                <CustomText
                label= "Account Number"
                keyboardType="phone-pad"
                maxLength={10}
                size={18}
                value={this.state.accountNumber}
                error={this.state.error_accountNumber}
                onChangeText={accountNumber => this.setState({ accountNumber })}
                />
                <View style={{ marginBottom: 13 }} />
                <View
                  style={{
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row"
                  }}
                />
                <View style={{ marginBottom: 13 }} />
                <Button
                  text="Send Money"
                    onPress={() => this.sendMoney()}
                    // loading={this.state.loading}
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

export default TransferScreen;
