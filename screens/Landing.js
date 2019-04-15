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
import { Dial } from "../components/svg";
import Button from "../components/Button";
import client from "../plugins/apollo";
import authenticateUser from "../graphql/queries/authenticateUser";
import Toast, { DURATION } from "react-native-easy-toast";

class Landing extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = { phonenumber: "", loading: false };
    this.authenticateNumber = this.authenticateNumber.bind(this);
  }
  async authenticateNumber() {
    try {
      this.setState({loading: true});
      const auth = await client.query({
        query: authenticateUser,
        variables: {
          phonenumber: this.state.phonenumber
        },
        fetchPolicy: 'network-only'
      });

      console.log(auth.data);
      
      this.props.navigation.push('Register', {phonenumber: auth.data.authenticateUser.phonenumber});
      // if (auth.data.authenticateUser.status.toLowerCase() === "register") {
      //   this.props.navigation.push('Register', {phonenumber: auth.data.authenticateUser.phonenumber});
      // }
      this.setState({loading: false});
    } catch (error) {
      console.log(error);
      if (error.message) {
        if (error.message == "Network error: Network request failed") {
          this.refs.toast.show("No Internet Connection", 1500);
        } else {
          this.refs.toast.show("An Error Occured", 1500);
        }
      }
      this.setState({loading: false});
    }
  }
  render() {
    let btn = (
      <Button text="Get Started" onPress={() => this.authenticateNumber()} disabled={(this.state.phonenumber.length<11)?true:false} />
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
              justifyContent: 'center'
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
            <ImageBackground
              source={require("../assets/img/bg-top.png")}
              // resizeMethod={"auto"}
              style={{
                width: "100%",
                height: 180,
                paddingVertical: 40,
                backgroundPosition: "bottom"
              }}
              imageStyle={{
                // resizeMode: "cover",
                alignSelf: "flex-end"
              }}
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
              {btn}
            </KeyboardAvoidingView>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Landing;
