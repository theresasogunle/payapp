import React from "react";
import { View, StatusBar, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo";
import { Lock, Card, Calendar, SuccessIcon } from "../../components/svg";
import Button from "../../components/Button";
import Top from "../../components/Top";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomText from "../../components/Text";

// this is the screen that shows when the user wants to make payment
class SuccessScreen extends React.Component {
  // this removes the default header reactnavigation brings
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
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
          <Top
            mainText="Complete"
            navigation={this.props.navigation}
            cancelText="Done"
          />
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
            <Text style={{ color: "#212C68", fontSize: 14 }}>Funded</Text>
          </LinearGradient>
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
            <View
              style={{
                backgroundColor: "#E3E6F4",
                paddingHorizontal: 20,
                paddingTop: 30
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#212C67" }}
                >
                  Amount Funded
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "500",
                      marginRight: 10,
                      color: "#212C67"
                    }}
                  >
                    ₦
                  </Text>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "400",
                      color: "#212C67"
                    }}
                  >
                    1000.00
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "#D0D4E8",
                  height: 1,
                  marginVertical: 10
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 15
                }}
              >
                <Text
                  style={{ fontSize: 13, fontWeight: "400", color: "#212C68" }}
                >
                  You Sent
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "500",
                    color: "#27347D",
                    opacity: 0.49
                  }}
                >
                  ₦ 990.00
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 15
                }}
              >
                <Text
                  style={{ fontSize: 13, fontWeight: "400", color: "#212C68" }}
                >
                  Fee
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "500",
                    color: "#27347D",
                    opacity: 0.49
                  }}
                >
                  ₦ 10.00
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 15
                }}
              >
                <Text
                  style={{ fontSize: 13, fontWeight: "400", color: "#212C68" }}
                >
                  Tax
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "500",
                    color: "#27347D",
                    opacity: 0.49
                  }}
                >
                  ₦ 0.00
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 15
                }}
              >
                <Text
                  style={{ fontSize: 13, fontWeight: "400", color: "#212C68" }}
                >
                  Total
                </Text>
                <Text
                  style={{ fontSize: 13, fontWeight: "500", color: "#27347D" }}
                >
                  ₦ 410.00
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#F1F3FA",
                paddingHorizontal: 20,
                paddingVertical: 30,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "400", color: "#212C67" }}
              >
                Funding Method
              </Text>
              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "#212C67" }}
                >
                  Credit Card
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    color: "#212C67",
                    marginTop: 10
                  }}
                >
                  **** **** **** 4567
                </Text>
              </View>
            </View>
            <View style={{
              padding: 30, justifyContent: 'center', alignItems:'center', flex:1
            }}>
            <SuccessIcon />
            <Text style={{textAlign: 'center', color: '#212C67', marginTop: 10, marginBottom: 25}}>Successful Funding</Text>
              <Button text="Fund More" onPress={() => this.props.navigation.push("Fund")} />
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default SuccessScreen;
