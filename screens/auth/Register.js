import React from "react";
import {
  View,
  StatusBar,
  Text,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo";
import { Dial, FullName, Email, Lock, Calendar } from "../../components/svg";
import Button from "../../components/Button";
import client from "../../plugins/apollo";
import Top from "../../components/Top";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomText from "../../components/Text";
import Toast, { DURATION } from "react-native-easy-toast";
import signUp from "../../graphql/mutations/signUp";

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

// this is the screen that shows when the user is to register
class Register extends React.Component {
  // this removes the default header reactnavigation brings
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      // get the phone number passed from the previous screen
      phonenumber: props.navigation.getParam("phonenumber"),
      fullname: "",
      email: "",
      dob: "",
      gender: "Male",
      password: "",
      error_fullname: "",
      error_email: "",
      error_dob: "",
      error_gender: "",
      error_password: ""
    };
    this.register = this.register.bind(this);
    this.validate = this.validate.bind(this);
  }
  // this checks for error in the form
  async validate() {
    // set all the errors to empty
    this.setState({ error_fullname: "" });
    this.setState({ error_email: "" });
    this.setState({ error_dob: "" });
    this.setState({ error_gender: "" });
    this.setState({ error_password: "" });
    
    // validate full name
    const pattern1 = /^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/;
    const pattern2 = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (
      this.state.fullname.match(pattern1) ||
      this.state.fullname.match(pattern2)
    ) {
    } else {
      this.setState({
        error_fullname: "Supply your full name"
      });
    }
    // validate email
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!this.state.email.match(pattern)) {
      this.setState({
        error_email: "Your email is not correct"
      });
    }

    // validate password
    if (this.state.password.length < 8) {
      this.setState({
        error_password: "Your password is too short"
      });
    }

    // validate dob
    if (this.state.dob.length < 2) {
      this.setState({
        error_dob: "Please choose your date of birth"
      });
    }

    // i put the sleep function so as for the function can take time to validate before returning a response
    await sleep(1200);
    // check if all errors are empty
    if (
      this.state.error_fullname == "" &&
      this.state.error_dob == "" &&
      this.state.error_email == "" &&
      this.state.error_gender == "" &&
      this.state.error_password == ""
    ) {
      return true;
    }
    return false;
  }
  // this function reaches out to the api and register the user
  async register() {
    this.setState({ loading: true });
    if (await this.validate()) {
      const {
        phonenumber,
        fullname,
        email,
        dob,
        gender,
        password
      } = this.state;
      try {
        const register = await client.mutate({
          mutation: signUp,
          variables: { phonenumber, fullname, email, dob, gender, password }
        });
        if (register.data.signUp.status === "successful") {
          this.props.navigation.push('VerifyAccount', {phonenumber});
        }
        this.setState({ loading: false });
      } catch (error) {
        console.log(error);
        this.setState({ loading: false });
      }
    }
    this.setState({ loading: false });
  }
  render() {
    return (
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
        <StatusBar backgroundColor="#FF9E00" barStyle="light-content" />
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
              <Text style={{ color: "#212C68", fontSize: 14 }}>
                {this.props.navigation.getParam("phonenumber")}
              </Text>
            </LinearGradient>
            <LinearGradient colors={["#F8F9FE", "#F9F9F9"]} style={{ flex: 1 }}>
              <ScrollView>
                <KeyboardAwareScrollView
                  style={{
                    padding: 20,
                    alignContent: "center"
                  }}
                  // extraScrollHeight={30}
                  extraHeight={220}
                  enableOnAndroid={true}
                >
                  <CustomText
                    side={<FullName />}
                    label="Your Full Name"
                    autoCorrect={false}
                    value={this.state.fullname}
                    error={this.state.error_fullname}
                    onChangeText={fullname => this.setState({ fullname })}
                  />
                  <View style={{ marginBottom: 13 }} />
                  <CustomText
                    side={<Email />}
                    label="Your Email Address"
                    keyboardType="email-address"
                    value={this.state.email}
                    error={this.state.error_email}
                    onChangeText={email => this.setState({ email })}
                  />
                  <View style={{ marginBottom: 13 }} />
                  <CustomText
                    side={<Lock />}
                    label="Your Secure Password"
                    password={true}
                    value={this.state.password}
                    error={this.state.error_password}
                    onChangeText={password => this.setState({ password })}
                  />
                  <View style={{ marginBottom: 13 }} />
                  <CustomText
                    side={<Calendar />}
                    label="Your Date Of Birth"
                    keyboardType="date-picker"
                    value={this.state.dob}
                    error={this.state.error_dob}
                    onChangeText={dob => this.setState({ dob })}
                  />
                  <View style={{ marginBottom: 13 }} />
                  <Button text="NEXT" onPress={() => this.register()} loading={this.state.loading} />
                  <View style={{ marginBottom: 13 }} />
                </KeyboardAwareScrollView>
              </ScrollView>
            </LinearGradient>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default Register;
