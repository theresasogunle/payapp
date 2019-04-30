import React from "react";
import {
  View,
  StatusBar,
  ImageBackground,
  Text,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo";
import { QRCode, Send, EmptyTransaction } from "../../components/svg";
import Button from "../../components/Button";
import client from "../../plugins/apollo";
import User from "../../graphql/queries/user";
import Banks from "../../graphql/queries/banks";
import WalletTransactionHistory from "../../graphql/queries/walletTransactionHistory";
import { connect } from "react-redux";
import { updateBalance } from "../../redux/actions";
import Loading from "../../components/Loading";

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
      loading: "false",
      transactions: [],
      screenHeight: Dimensions.get("window").height
    };
    this.formatMoney = this.formatMoney.bind(this);
    this.excerpt = this.excerpt.bind(this);
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  excerpt(text) {
    const length = 22;
    if (text.length <= length) {
      return text;
    }
    return text.substring(0, length)+'...';
  }

  formatMoney(n, c, d, t) {
    var c = isNaN((c = Math.abs(c))) ? 2 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
      j = (j = i.length) > 3 ? j % 3 : 0;

    return (
      s +
      (j ? i.substr(0, j) + t : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
      (c
        ? d +
          Math.abs(n - i)
            .toFixed(c)
            .slice(2)
        : "")
    );
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { data } = await client.query({
      query: User
    });
    const BanksData = await client.query({
      query: Banks
    });
    const Transactions = await client.query({
      query: WalletTransactionHistory
    });
    const banks = BanksData.data.banks.data;
    const transactions = Transactions.data.walletTransactionHistory;

    const sortedBanks = banks.sort(compare);
    const user = data.user;
    this.props.updateBalance(user.wallet.amount);

    this.setState({
      name: user.fullname,
      banks: sortedBanks,
      user,
      transactions,
      loading: false
    });
  }
  render() {
    let loading = <Loading />;
    let transactions = [];

    this.state.transactions.map(transaction => {
      const BGcolor = transaction.type == "Debit" ? "#D0021B" : "#7ED321";
      const Textcolor = transaction.type == "Debit" ? "#D0021B" : "#414141";
      transactions.push(
        <View
          key={transaction.transactionReference}
          style={{
            backgroundColor: "#FFF",
            shadowOffset: { x: 0, y: 2 },
            shadowRadius: 14,
            shadowColor: "rgba(39, 52, 125, .5)",
            paddingVertical: 9,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 5
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 38,
                width: 5,
                backgroundColor: BGcolor,
                borderBottomRightRadius: 5,
                borderTopRightRadius: 5,
                marginRight: 10
              }}
            />
            <Text>{this.excerpt(transaction.description)}</Text>
          </View>
          <Text style={{ marginRight: 20, color: Textcolor }}>
            {transaction.type == "Debit" ? "-" : null}
            {String(this.formatMoney(transaction.amount))}
          </Text>
        </View>
      );
    });

    if (!this.state.loading) {
      loading = null;
    }
    return (
      <View
        style={{
          flex: 1
        }}
      >
        {loading}
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
                padding: 20,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row"
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
              <TouchableOpacity onPress={this._signOutAsync}>
                <Text
                  style={{
                    fontSize: 12,
                    paddingVertical: 10,
                    paddingLeft: 10,
                    color: "white"
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
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
          <Text
            style={{
              marginTop: this.state.screenHeight > 580 ? 30 : 70,
              paddingHorizontal: 20,
              paddingVertical: 10,
              color: "#212C67",
              fontWeight: "bold"
            }}
          >
            Transactions
          </Text>
          <ScrollView
            style={{
              flex: 1
            }}
          >
            {transactions}
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  { updateBalance }
)(HomeScreen);
