import React from "react";
import { View, Text, Alert } from "react-native";
import { Permissions, Contacts } from "expo";
import Button from "../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomText from "../../components/Text";
import client from "../../plugins/apollo";
import GetEasPayDetails from "../../graphql/queries/getEasPayDetails";
import WalletToWalletTransfer from "../../graphql/mutations/walletToWalletTransfer";
import User from "../../graphql/queries/user";
import { connect } from "react-redux";
import { updateBalance } from "../../redux/actions";

function mapStateToProps(state) {
  return state.balance;
}

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

// this is the screen that shows when the user wants to send money
class WalletToWallet extends React.Component {
  // this removes the default header reactnavigation brings
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      amount: "",
      phonenumber: "",
      bank: "",
      receiverName: "",
      error: "",
      error_phonenumber: ""
    };
    this.transfer = this.transfer.bind(this);
    this.showFirstContactAsync = this.showFirstContactAsync.bind(this);
    this.checkInput = this.checkInput.bind(this);
  }

  async transfer() {
    this.setState({ error: "", loading: true });

    if (this.state.receiverName) {
      const { data } = await client.mutate({
        mutation: WalletToWalletTransfer,
        variables: {
          amount: parseFloat(this.state.amount),
          receiverPhone: this.state.phonenumber
        }
      });
      if (data.walletToWalletTransfer.status === "success") {
        const userData = await client.query({
          query: User,
          fetchPolicy: 'network-only'
        });
        
        const user = userData.data.user;
        this.props.updateBalance(user.wallet.amount);
        this.props.navigation.push('FundSuccess', {
          transactionReference: data.walletToWalletTransfer.transactionReference
        })
      }
      this.setState({ error: "", loading: false });

      // if (data.getBankDetails.status === ) {

      // }
    }
    this.setState({ error: "Invalid Details", loading: false });
  }

  componentDidMount() {
    // this.showFirstContactAsync()
  }

  async showFirstContactAsync() {
    // Ask for permission to query contacts.
    const permission = await Permissions.askAsync(Permissions.CONTACTS);

    if (permission.status !== "granted") {
      // Permission was denied...
      return;
    }
    Contacts.get;
    const contacts = await Contacts.getContactsAsync({
      fields: [Contacts.PHONE_NUMBERS, Contacts.EMAILS],
      pageSize: 10,
      pageOffset: 0
    });
    if (contacts.total > 0) {
      console.log(contacts);

      // Alert.alert(
      //   'Your first contact is...',
      //   `Name: ${contacts.data[0].name}\n` +
      //   `Phone numbers: ${contacts.data[0].phoneNumbers[0].number}\n` +
      //   `Emails: ${contacts.data[0].emails[0].email}`
      // );
    }
  }

  async checkInput() {
    await sleep(1000);
    const self = this;
    if (this.state.phonenumber.startsWith("0")) {
      if (this.state.phonenumber.length === 11) {
        await getDetails();
      }
    } else if (this.state.phonenumber.startsWith("+")) {
      if (this.state.phonenumber.length === 14) {
        await getDetails();
      }
    } else {
      this.setState({ receiverName: "", loading: false });
    }
    async function getDetails() {
      self.setState({ loading: true });
      try {
        const easPayDetails = await client.query({
          query: GetEasPayDetails,
          variables: {
            phonenumber: self.state.phonenumber
          }
        });
        const receiverName = easPayDetails.data.getEasPayUserDetails.fullname;
        const receivePhone =
          easPayDetails.data.getEasPayUserDetails.phonenumber;

        if (
          receiverName !== null &&
          receivePhone !== self.props.userPhoneNumber
        ) {
          self.setState({ receiverName, loading: false });
        } else {
          self.setState({ receiverName: "", loading: false });
        }
      } catch (error) {
        self.setState({ receiverName: "", loading: false });
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
        <View
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row"
          }}
        />
        <View style={{ marginBottom: 13 }} />
        <CustomText
          label="Phone Number"
          keyboardType="phone-pad"
          maxLength={15}
          size={18}
          value={this.state.phonenumber}
          error={this.state.error_phonenumber}
          onChangeText={phonenumber => {
            this.setState({ phonenumber });
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
)(WalletToWallet);
