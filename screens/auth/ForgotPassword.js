import React from "react";
import {
  View,
  StatusBar,
  Text
} from "react-native";
import { LinearGradient } from "expo";
import { Dial, Lock} from "../../components/svg";
import Button from "../../components/Button";
import client from "../../plugins/apollo";
import Top from "../../components/Top";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomText from "../../components/Text";
import resetPassword from "../../graphql/mutations/resetPassword";


class ForgotPassword extends React.Component{
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      // get the phone number passed from the previous screen
      phonenumber: props.navigation.getParam("phonenumber"),
     
    };
    this.updatePassword = this.updatePassword.bind(this);
    

  }
   // this checks for error in the form
   async validate() {
    this.setState({ error_password: "" });
    if (this.state.password.length < 8) {
      this.setState({ error_password: "Incorrect Password" });
      return false;
    }
    if (this.state.code.length !== 6) {
      this.setState({ error_code: "Invalid Verification Code" });
      return false;
    }
    return true;
  }

   // this reaches to the api and logs in the user which returns a token.
   async updatePassword() {
    this.setState({ loading: true });
    if (await this.validate()) {
      const { password, code } = this.state; 
      try {
        const passwordUpdate = await client.mutate({
          mutation: resetPassword,
          variables: { code:parseInt(code), password:password, phonenumber:this.state.phonenumber}
        });
        console.log(passwordUpdate.data.resetPassword);
        if(passwordUpdate.data.resetPassword.user.phonenumber === this.state.phonenumber ){
          console.log("success");
          this.setState({ loading: false });
        }
      
      } catch (error) {
       console.log(error);
       this.setState({ loading: false });
      }
      this.setState({ loading: false });
    }
  
  }
    render() {
        return(
          <View
        style={{
          flex: 1
        }}
      >
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <LinearGradient colors={["#F8F9FE", "#F9F9F9"]} style={{ flex: 1 }}>
          <Top mainText="Forgot Password" navigation={this.props.navigation} />
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
               <Text style={{ color: "#212C68", fontSize: 14 , marginBottom: 20 }}>
              A password reset code has been sent to your email address
              </Text>
              
                <CustomText
                  label="Your 6 digit Password Reset Code" 
                  keyboardType="number-pad"
                  maxLength={6}
                  onChangeText={code => this.setState({ code })}
                />
                  <CustomText
                    side={<Lock />}
                    label="Your New Password"
                    password={true}
                    onChangeText={password => this.setState({ password })}
                  />
                <View style={{ marginBottom: 13 }} />
                  <Button text="Submit" onPress={() => this.updatePassword()} />
                <View style={{ marginBottom: 13 }} />
              </KeyboardAwareScrollView>
            </LinearGradient>
          </View>
        </LinearGradient>
      </View>
        
    
        );
    }
}

export default ForgotPassword;
