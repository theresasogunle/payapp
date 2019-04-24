import React from "react";
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { LinearGradient } from "expo";
import { Dial, FullName, Email, Lock, Calendar } from "../../components/svg";
import Button from "../../components/Button";
import client from "../../plugins/apollo";
import Top from "../../components/Top";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomText from "../../components/Text";
import Toast, { DURATION } from "react-native-easy-toast";
import verifyUser from "../../graphql/mutations/verifyUser";
import resendVerificationCode from "../../graphql/mutations/resendVerificationCode";

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

class VerifyAccount extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      phonenumber: props.navigation.getParam("phonenumber"),
      code: "",
      error_code: ""
    };
    this.verifyAccount = this.verifyAccount.bind(this);
    this.validate = this.validate.bind(this);
    this.resendVerification = this.resendVerification.bind(this);
  }
  async validate() {
    this.setState({ error_code: "" });
    const pattern = /^[0-9]*$/gm;
    if (this.state.code.length !== 6) {
      this.setState({ error_code: "Invalid Verification Code" });
      return false;
    }
    return true;
  }
  async resendVerification() {
    await client.mutate({
      mutation: resendVerificationCode,
      variables: {
        phonenumber: this.state.phonenumber
      }
    });
  }
  async verifyAccount() {
    this.setState({ loading: true });
    if (await this.validate()) {
      const { code, signUp } = this.state;
      try {
        const verify = await client.mutate({
          mutation: verifyUser,
          variables: { code: parseInt(code), phonenumber: this.state.phonenumber }
        });
        await AsyncStorage.setItem('userToken', verify.data.verifyUser.token);
        this.props.navigation.navigate('App');
      } catch (error) {
        console.log(error);
        this.setState({ loading: false });
      }
    }
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
          <Top mainText="Verify Account" navigation={this.props.navigation} />
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
              <KeyboardAwareScrollView
                style={{
                  padding: 20,
                  alignContent: "center"
                }}
                // extraScrollHeight={30}
                // extraHeight={220}
                enableOnAndroid={true}
              >
                <CustomText
                  side={<Lock />}
                  label="Your 6 digit Verification Code"
                  password={true}
                  keyboardType="number-pad"
                  value={this.state.code}
                  error={this.state.error_code}
                  onChangeText={code => this.setState({ code })}
                  maxLength={6}
                />
                <TouchableOpacity onPress={() => this.resendVerification()}>
                  <Text style={{ color: "#212C68", fontSize: 14 }}>
                    Resend Verification Code
                  </Text>
                </TouchableOpacity>
                <View style={{ marginBottom: 13 }} />
                  <Button text="Register" onPress={() => this.verifyAccount()} loading={this.state.loading} />
                <View style={{ marginBottom: 13 }} />
              </KeyboardAwareScrollView>
            </LinearGradient>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default VerifyAccount;
