import React from "react";
import {
  View,
  ImageBackground,
  StatusBar,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo";
import { Dial, FullName, Email, Lock } from "../components/svg";
import Button from "../components/Button";
import client from "../plugins/apollo";
import Top from "../components/Top";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import CustomText from "../components/Text";
import Toast, { DURATION } from "react-native-easy-toast";

class Register extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = { phonenumber: "", loading: false };
    this.authenticateNumber = this.authenticateNumber.bind(this);
  }
  async authenticateNumber() {
    console.log("I am in register");

    // try {
    //   this.setState({loading: true});
    //   const auth = await client.query({
    //     query: authenticateUser,
    //     variables: this.state.phonenumber
    //   });

    //   if (auth.authenticateUser.status.toLowerCase() === "register") {
    //     console.log("yo");
    //   }
    //   this.setState({loading: false});
    // } catch (error) {
    //   console.log(error.message);
    //   if (error.message) {
    //     if (error.message == "Network error: Network request failed") {
    //       this.refs.toast.show("No Internet Connection", 1500);
    //     } else {
    //       this.refs.toast.show("An Error Occured", 1500);
    //     }
    //   }
    //   this.setState({loading: false});
    // }
  }
  render() {
    let btn = (
      <Button text="Get Started" onPress={() => this.authenticateNumber()} />
    );
    if (this.state.loading) {
      btn = <ActivityIndicator color="#FFB82A" />;
    }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={{
            flex: 1
          }}
        >
          <Toast
            ref="toast"
            style={{
              backgroundColor: "#27347D",
              width: "100%",
              borderRadius: 0,
              height: 40,
              paddingHorizontal: 20,
              paddingVertical: 0,
              justifyContent: "center"
            }}
            // position="top"
            positionValue={40}
            fadeInDuration={300}
            fadeOutDuration={400}
            opacity={1}
            textStyle={{ color: "white" }}
          />
          <StatusBar backgroundColor="blue" barStyle="light-content" />
          <LinearGradient colors={["#F8F9FE", "#F9F9F9"]} style={{ flex: 1 }}>
            <Top mainText="Register" navigation={this.props.navigation} />
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
              <LinearGradient
                colors={["#F8F9FE", "#F9F9F9"]}
                style={{
                  padding: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  opacity: 0.9
                }}
              >
                <Dial />
                <Text style={{color: '#212C68', fontSize: 14}}>{this.props.navigation.getParam('phonenumber')}</Text>
              </LinearGradient>
              <LinearGradient
                colors={["#F8F9FE", "#F9F9F9"]}
                style={{ flex: 1 }}
              >
                <KeyboardAwareScrollView
                  style={{ padding: 20, alignContent: "center", paddingBottom: 70 }}
                >
                   <CustomText side={<FullName />} label="Your Full Name"  autoCorrect={false}></CustomText>
                   <View style={{marginBottom:13}}></View>
                   <CustomText side={<Email />} label="Your Email Address" keyboardType="email-address"></CustomText>
                   <View style={{marginBottom:13}}></View>
                   <CustomText side={<Lock />} label="Your Secure Password" keyboardType="email-address" password={true}></CustomText>
                </KeyboardAwareScrollView>
              </LinearGradient>
            </View>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Register;
