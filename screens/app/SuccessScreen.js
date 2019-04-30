import React from "react";
import { View, StatusBar, Text } from "react-native";
import { LinearGradient } from "expo";
import { SuccessIcon } from "../../components/svg";
import Button from "../../components/Button";
import Top from "../../components/Top";
import Loading from "../../components/Loading";
import client from "../../plugins/apollo";
import GetTransactionDetails from "../../graphql/queries/getTransactionDetails";

function formatMoney(n, c, d, t) {
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
class SuccessScreen extends React.Component {
  // this removes the default header reactnavigation brings
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      transactionDetails: {
        amount: "#####",
        fee: 0,
        medium: "###",
        mediumName: "### ####",
        mediumNumber: "**** ****",
        status: "success",
        total: "####"
      }
    };
  }

  async componentDidMount() {
    const { data } = await client.query({
      query: GetTransactionDetails,
      variables: {
        transactionReference: this.props.navigation.getParam(
          "transactionReference"
        )
      }
    });
    const transactionDetails = data.getTransactionDetails;
    console.log(transactionDetails);
    
    this.setState({
      loading: false,
      transactionDetails
    });
  }

  render() {
    let medium;
    let loading = (
      <View
        style={{
          flex: 1
        }}
      >
        {/* change the status bar to white */}
        <StatusBar backgroundColor="#FF9E00" barStyle="light-content" />
        <LinearGradient colors={["#F8F9FE", "#F9F9F9"]} style={{ flex: 1 }}>
          <Top
            mainText="Transaction"
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
            <Text style={{ color: "#212C68", fontSize: 14 }}>{(this.state.transactionDetails.type == "Debit")? 'Debited': 'Credited'}</Text>
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
                  Amount {(this.state.transactionDetails.type == "Debit")? 'Debited': 'Credited'}
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
                    {formatMoney(this.state.transactionDetails.total)}
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
                  You {(this.state.transactionDetails.type == "Debit")? 'sent': 'received'}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "500",
                    color: "#27347D",
                    opacity: 0.49
                  }}
                >
                  ₦ {formatMoney(this.state.transactionDetails.amount)}
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
                  ₦ {formatMoney(this.state.transactionDetails.fee)}
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
                  ₦ {formatMoney(this.state.transactionDetails.total)}
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
                {(this.state.transactionDetails.type == "Debit")? 'Debit': 'Credit'} Method
              </Text>
              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "#212C67" }}
                >
                  {this.state.transactionDetails.mediumName}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    color: "#212C67",
                    marginTop: 10
                  }}
                >
                  {this.state.transactionDetails.medium.toLowerCase() === "card"
                    ? `**** **** **** ${
                        this.state.transactionDetails.mediumNumber
                      }`
                    : this.state.transactionDetails.mediumNumber}
                </Text>
              </View>
            </View>
            <View
              style={{
                padding: 30,
                justifyContent: "center",
                alignItems: "center",
                flex: 1
              }}
            >
              <SuccessIcon />
              <Text
                style={{
                  textAlign: "center",
                  color: "#212C67",
                  marginTop: 10,
                  marginBottom: 25
                }}
              >
                Successful
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
    if (this.state.loading) {
      loading = <Loading />;
    }
    return loading;
  }
}

export default SuccessScreen;
