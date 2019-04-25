import React from "react";
import {
  View,
  StatusBar,
  ImageBackground,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { LinearGradient } from "expo";
import { QRCode, Send, EmptyTransaction } from "../../components/svg";
import Button from "../../components/Button";
import client from "../../plugins/apollo";
import User from "../../graphql/queries/user";
import Banks from "../../graphql/queries/banks";
import { connect } from "react-redux";
import { updateBalance } from "../../redux/actions";

function mapStateToProps(state) {
  return state.balance;
}

function compare(a, b) {
  if (a.Name < b.Name) {
    return -1;
  }
  if (a.Name > b.Name) {
    return 1;
  }
  return 0;
}

class HomeScreen extends React.Component {
  // this removes the default header reactnavigation brings
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      name: "### ###",
      banks: [],
      screenHeight: Dimensions.get("window").height
    };
  }

  async componentDidMount() {
    const { data } = await client.query({
      query: User
    });
    const BanksData = await client.query({
      query: Banks
    });
    const banks = BanksData.data.banks.data;

    const sortedBanks = banks.sort(compare);
    const user = data.user;
    this.props.updateBalance(user.wallet.amount);

    this.setState({ name: user.fullname, banks: sortedBanks, user });
  }
  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <StatusBar backgroundColor="#FF9E00" barStyle="light-content" />
        <LinearGradient colors={["#F8F9FE", "#F9F9F9"]} style={{ flex: 1 }}>
          <ImageBackground
            source={
              this.state.screenHeight > 580
                ? require("../../assets/img/bg-top2.png")
                : require("../../assets/img/bg-top.png")
            }
            style={{
              width: "100%",
              height: this.state.screenHeight > 580 ? 300 : 200,
              paddingVertical: this.state.screenHeight > 580 ? 40 : 15,
              backgroundPosition: "bottom"
            }}
            imageStyle={{
              // resizeMode: "cover",
              alignSelf: "flex-end"
            }}
          >
            <View
              style={{
                padding: 20
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    color: "white"
                  }}
                >
                  {this.state.name}
                </Text>
                <Text
                  style={{
                    fontSize: 30,
                    color: "white"
                  }}
                >
                  Wallet
                </Text>
              </View>
            </View>
          </ImageBackground>

          <TouchableOpacity
            style={{ position: "absolute", bottom: 20, right: 20, zIndex: 99 }}
            onPress={async () => {
              if (this.state.banks.length > 0) {
                this.props.navigation.push("Transfer", {
                  banks: this.state.banks,
                  user: this.state.user
                });
              }
            }}
          >
            <LinearGradient
              colors={["#212C67", "#27347D"]}
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Send />
            </LinearGradient>
          </TouchableOpacity>

          <View
            style={{
              width: "88%",
              alignSelf: "center",
              backgroundColor: "rgba(255,255,255,.89)",
              padding: this.state.screenHeight > 580 ? 26 : 16,
              position: "absolute",
              top: this.state.screenHeight > 580 ? 120 : 100,
              borderRadius: 12,
              shadowColor: "#27347D",
              shadowOffset: {
                height: 2,
                width: 0
              },
              shadowOpacity: 0.25,
              shadowRadius: 34
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "#212C68" }}>Balance</Text>
              <TouchableOpacity>
                <View>
                  <QRCode />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: this.state.screenHeight > 580 ? 15 : 8,
                marginBottom: this.state.screenHeight > 580 ? 10 : 20
              }}
            >
              <View
                style={{
                  backgroundColor: "#FBA703",
                  borderRadius: 8,
                  height: 26,
                  width: 39,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ color: "white", fontSize: 12 }}>NGN</Text>
              </View>
              <Text style={{ marginLeft: 10, fontSize: 36, color: "#212C68" }}>
                {String(this.props.balance)}
              </Text>
            </View>
            <Button
              text="+ Fund Wallet"
              onPress={() => this.props.navigation.push("Fund")}
            />
          </View>
          <View
            style={{
              marginTop: this.state.screenHeight > 580 ? 20 : 60,
              flex: 1
            }}
          >
            <View style={{ padding: 10, flexDirection: "row" }}>
              <TouchableOpacity onPress={() => this.setState({ tab: 1 })}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    padding: 10,
                    marginLeft: 19,
                    color: this.state.tab === 1 ? "#212C67" : "#9A9FBB"
                  }}
                >
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ tab: 2 })}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    padding: 10,
                    marginLeft: 19,
                    color: this.state.tab === 2 ? "#212C67" : "#9A9FBB"
                  }}
                >
                  Received
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ tab: 3 })}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    padding: 10,
                    marginLeft: 19,
                    color: this.state.tab === 3 ? "#212C67" : "#9A9FBB"
                  }}
                >
                  Sent
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <EmptyTransaction />
              <Text
                style={{
                  color: "#212C67",
                  fontWeight: "500",
                  fontSize: 17,
                  marginTop: 20
                }}
              >
                You have no any transaction yet
              </Text>
              {/* <Text style={{color: '#A0A4B8', fontSize: 12, fontWeight: '500'}}>Add new card and start sending money</Text> */}
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  { updateBalance }
)(HomeScreen);
