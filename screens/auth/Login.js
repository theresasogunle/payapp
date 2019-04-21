import React from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo";
import { Dial, Lock, } from "../../components/svg";
import Button from "../../components/Button";
import client from "../../plugins/apollo";
import Top from "../../components/Top";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomText from "../../components/Text";
import loginUser from "../../graphql/mutations/loginUser";
import resetCode from '../../graphql/mutations/sendResetCode';

// this is the screen that shows when the user is to login
class Login extends React.Component {
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
      password: "",
      error_password: ""
    };
    this.login = this.login.bind(this);
    this.validate = this.validate.bind(this);
    this.sendResetCode = this.sendResetCode.bind(this);
  }
  // this checks for error in the form
  async validate() {
    this.setState({ error_password: "" });
    if (this.state.password.length < 8) {
      this.setState({ error_password: "Incorrect Password" });
      return false;
    }
    return true;
  }
  // this reaches to the api and logs in the user which returns a token.
  async login() {
    this.setState({ loading: true });
    if (await this.validate()) {
      const { password, phonenumber } = this.state;
      try {
        const login = await client.mutate({
          mutation: loginUser,
          variables: { password, phonenumber }
        });
        console.log(login.data.loginUser);
        this.setState({ loading: false });
      } catch (error) {
        if (error.graphQLErrors) {
          const error2 = error.graphQLErrors[0].message;
          if (error2 === "Invalid Details") {
            this.setState({ error_password: "Incorrect Password" });
          }
        }
        this.setState({ loading: false });
      }
    }
    this.setState({ loading: false });
  }
  // this reaches to the api and sends a verification code to the user.
  async sendResetCode() {
      try {
        const code = await client.mutate({
          mutation: resetCode,
          variables: { phonenumber:this.state.phonenumber}
        });

        if (code.data.forgotPassword.status === "successful") {
          this.props.navigation.push('ForgotPassword',{phonenumber:this.state.phonenumber});
        }
        this.setState({ loading: false });
       
      } catch (error) {
        console.log(error);
        this.setState({ loading: false });
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
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <LinearGradient colors={["#F8F9FE", "#F9F9F9"]} style={{ flex: 1 }}>
          <Top mainText="Login" navigation={this.props.navigation} />
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
                  label="Your password"
                  password={true}
                  value={this.state.password}
                  error={this.state.error_password}
                  onChangeText={password => this.setState({ password })}
                />
                <View style={{ marginBottom: 13 }} />
                <Button
                  text="Log In"
                  onPress={() => this.login()}
                  loading={this.state.loading}
                />
                <TouchableOpacity  loading={this.state.loading}  onPress={() => this.sendResetCode()}>
                <Text  style={{  textAlign:"center", marginTop:10 , color:"#27347D", textDecorationLine:"underline" }}>Forgot Password ?</Text>
                </TouchableOpacity>
                <View style={{ marginBottom: 13 }} />
              </KeyboardAwareScrollView>
            </LinearGradient>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default Login;
