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
import { Dial } from "../../components/svg";
import Button from "../../components/Button";
import client from "../../plugins/apollo";
import authenticateUser from "../../graphql/queries/authenticateUser";
import Toast, { DURATION } from "react-native-easy-toast";

// this is the first screen. It prompts the user to enter their phone number. On this it decides which screen it goes to next
class Landing extends React.Component {
  // this removes the default header reactnavigation brings
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = { phonenumber: "", loading: false };
    this.authenticateNumber = this.authenticateNumber.bind(this);
  }
  // this is the function that calls to the api and checks the status of a phone number ['register', 'login' or 'verify']
  async authenticateNumber() {
    try {
      this.setState({ loading: true });
      const auth = await client.query({
        query: authenticateUser,
        variables: {
          phonenumber: this.state.phonenumber
        },
        fetchPolicy: "network-only"
      });
      // if its register, push to the register screen
      if (auth.data.authenticateUser.status.toLowerCase() === "register") {
        this.props.navigation.push("Register", {
          phonenumber: auth.data.authenticateUser.phonenumber
        });
      } else if (auth.data.authenticateUser.status.toLowerCase() === "verify") {
        // if its verify, push to the verify screen
        this.props.navigation.push("VerifyAccount", {
          phonenumber: auth.data.authenticateUser.phonenumber
        });
      } else {
        // else, push to the login screen
        this.props.navigation.push("Login", {
          phonenumber: auth.data.authenticateUser.phonenumber
        });
      }
      this.setState({ loading: false });
    } catch (error) {
      // notify users of error
      if (error.message) {
        if (error.message == "Network error: Network request failed") {
          this.refs.toast.show("No Internet Connection", 1500);
        } else {
          this.refs.toast.show("An Error Occured", 1500);
        }
      }
      this.refs.toast.show("An Error Occured", 1500);
      this.setState({ loading: false });
    }
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={{
            flex: 1
          }}
        >
          {/* this is a rn library use to show a toast notification to a user */}
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
          {/* change the status bar to white */}
          <StatusBar backgroundColor="blue" barStyle="light-content" />
          <LinearGradient colors={["#F8F9FE", "#F9F9F9"]} style={{ flex: 1 }}>
            <ImageBackground
              source={require("../../assets/img/bg-top.png")}
              // resizeMethod={"auto"}
              style={{
                width: "100%",
                height: 180,
                paddingVertical: 40
              }}
              imageStyle={{}}
            >
              <Text style={{ color: "#D8D8D8", fontSize: 16, marginLeft: 20 }}>
                Login
              </Text>
            </ImageBackground>

            <KeyboardAvoidingView
              behavior="padding"
              enabled
              style={{ padding: 20, alignContent: "center" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                  marginTop: 20
                }}
              >
                <Dial />
                <Text
                  style={{
                    marginLeft: 10,
                    textAlign: "center",
                    color: "#212C67",
                    fontSize: 14
                  }}
                >
                  Please Enter Your Phone Number
                </Text>
              </View>
              <View
                style={{
                  maxWidth: 190,
                  width: "100%",
                  alignSelf: "center",
                  marginBottom: 17
                }}
              >
                <TextInput
                  onChangeText={phonenumber => this.setState({ phonenumber })}
                  value={this.state.phonenumber}
                  textAlign="center"
                  selectionColor="#FF9900"
                  // clearButtonMode="while-editing"
                  textContentType="telephoneNumber"
                  style={{
                    marginTop: 10,
                    fontSize: 16,
                    color: "#212C67",
                    padding: 5
                  }}
                  keyboardType="phone-pad"
                />
                <View
                  style={{ borderBottomColor: "#212C67", borderBottomWidth: 1 }}
                />
              </View>
              <Button
                text="Register"
                disabled={(this.state.phonenumber.length<11)?true:false}
                onPress={() => this.authenticateNumber()}
                loading={this.state.loading}
              />
            </KeyboardAvoidingView>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Landing;
