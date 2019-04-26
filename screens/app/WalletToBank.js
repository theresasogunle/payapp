import React from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomText from "../../components/Text";
import { BankIcon } from "../../components/svg";
import client from "../../plugins/apollo";
import GetBankDetails from "../../graphql/queries/getBankDetails";
import WalletToBankTransfer from "../../graphql/mutations/walletToBankTransfer";
import { connect } from "react-redux";
import { updateBalance } from "../../redux/actions";

function mapStateToProps(state) {
  return state.balance;
}

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

// this is the screen that shows when the user wants to send money
class WalletToBank extends React.Component {
  // this removes the default header reactnavigation brings
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      amount: "",
      accountNumber: "",
      bank: "",
      receiverName: "",
      error: ""
    };
    this.transfer = this.transfer.bind(this);
  }

  async transfer() {
    this.setState({ error: "", loading: true });
    if (this.state.receiverName) {
      const { data } = await client.mutate({
        mutation: WalletToBankTransfer,
        variables: {
          amount: parseFloat(this.state.amount),
          accountNumber: this.state.accountNumber,
          bankCode: this.state.bank
        }
      });
      this.setState({ error: "", loading: false });
      // const userData = await client.query({
      //   query: User,
      //   fetchPolicy: 'network-only'
      // });
      // const user = userData.data.user;
      // this.props.updateBalance(user.wallet.amount);

      // if (data.getBankDetails.status === ) {

      // }
    }
    this.setState({ error: "Invalid Details", loading: false });
  }

  async checkInput() {
    await sleep(1000);
    if (
      this.state.accountNumber.length === 10 &&
      this.state.bank.length === 3
    ) {
      this.setState({ loading: true });
      const bankDetailsData = await client.query({
        query: GetBankDetails,
        variables: {
          accountNumber: this.state.accountNumber,
          bankCode: this.state.bank
        }
      });
      const receiverName =
        bankDetailsData.data.getBankDetails.data.data.accountname;
      if (receiverName !== null) {
        this.setState({ receiverName, loading: false });
      } else {
        if (this.state.receiverName !== "") {
          this.setState({ receiverName: "", loading: false });
        }
      }
    } else {
      if (this.state.receiverName !== "") {
        this.setState({ receiverName: "", loading: false });
      }
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        extraScrollHeight={30}
        extraHeight={220}
        enableOnAndroid={true}
      >
        <CustomText
          label="Amount"
          keyboardType="money"
          value={String(this.state.amount)}
          error={this.state.error_amount}
          onChangeText={amount => {
            if (amount.startsWith("0")) {
              return this.setState({ amount: amount.slice(1) });
            }
            if (
              parseFloat(this.props.balance.replace(/[^\d.-]/g, "")) <
              parseFloat(amount)
            ) {
              return this.setState({
                amount: String(
                  parseFloat(this.props.balance.replace(/[^\d.-]/g, ""))
                )
              });
            }
            this.setState({ amount });
          }}
        />
        <View style={{ marginBottom: 13 }} />
        <CustomText
          side={<BankIcon />}
          keyboardType="dropdown"
          label="Choose the bank"
          value={this.state.bank}
          data={this.props.navigation.getParam("banks")}
          onChangeText={bank => {
            this.setState({ bank });
            this.checkInput();
          }}
        />
        <View style={{ marginBottom: 13 }} />
        <CustomText
          label="Account Number"
          keyboardType="phone-pad"
          maxLength={10}
          size={18}
          value={this.state.accountNumber}
          error={this.state.error_accountNumber}
          onChangeText={accountNumber => {
            this.setState({ accountNumber });
            this.checkInput();
          }}
        />
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: "#212C68"
          }}
        >
          Receiver:{" "}
          <Text
            style={{
              opacity: 0.65,
              fontSize: 12
            }}
          >
            {this.state.receiverName}
          </Text>
        </Text>
        <View style={{ marginBottom: 13 }} />
        <View
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row"
          }}
        />

        <View style={{ marginBottom: 13 }} />
        <Button
          text="Send Money"
          onPress={() => this.transfer()}
          loading={this.state.loading}
          disabled={this.state.receiverName ? false : true}
        />
        <View style={{ marginBottom: 13 }} />
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(
  mapStateToProps,
  { updateBalance }
)(WalletToBank);
