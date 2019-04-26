import Rave from "../../rave";
import React from "react";
import client from "../../plugins/apollo";
import User from "../../graphql/queries/user";
import FundWallet from "../../graphql/mutations/fundWallet";
import { connect } from "react-redux";
import { updateBalance } from "../../redux/actions";
import Loading from "../../components/Loading";
import { View, BackHandler } from "react-native";

function mapStateToProps(state) {
  return state.balance;
}

class RaveScreen extends React.Component {
  // this removes the default header reactnavigation brings
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleBackPress = this.handleBackPress.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  async handleBackPress() {
    this.goBack();
    return this.onClose();
  }

  async onSuccess(data) {
    try {
      this.setState({ loading: true });
      const fundWallet = await client.mutate({
        mutation: FundWallet,
        variables: {
          reference: this.props.navigation.getParam("txref")
        }
      });
      const status = fundWallet.data.fundWallet.status;

      if (status === "success") {
        const userData = await client.query({
          query: User,
          fetchPolicy: "network-only"
        });
        const user = userData.data.user;
        this.props.updateBalance(user.wallet.amount);
        this.setState({ loading: false });
        return this.props.navigation.push("FundSuccess", {
          transactionReference: this.props.navigation.getParam("txref")
        });
      }
      this.setState({ loading: false });
    } catch (error) {
      alert("An error occured");
      this.setState({ loading: false });
    }
  }

  async onFailure(data) {
    try {
      this.setState({ loading: true });
      const fundWallet = await client.mutate({
        mutation: FundWallet,
        variables: {
          reference: this.props.navigation.getParam("txref")
        }
      });
      const status = fundWallet.data.fundWallet.status;
      if (status === "success") {
        const userData = await client.query({
          query: User,
          fetchPolicy: "network-only"
        });
        const user = userData.data.user;
        this.props.updateBalance(user.wallet.amount);
        this.setState({ loading: false });
        return this.props.navigation.push("FundSuccess", {
          transactionReference: this.props.navigation.getParam("txref")
        });
      }
      this.setState({ loading: false });
    } catch (error) {
      alert("An error occured");
      this.setState({ loading: false });
    }
    console.log("error", data);
  }

  async onClose() {
    try {
      this.setState({ loading: true });
      const fundWallet = await client.mutate({
        mutation: FundWallet,
        variables: {
          reference: this.props.navigation.getParam("txref")
        }
      });
      const status = fundWallet.data.fundWallet.status;
      if (status === "success") {
        const userData = await client.query({
          query: User,
          fetchPolicy: "network-only"
        });
        const user = userData.data.user;
        this.props.updateBalance(user.wallet.amount);
        this.setState({ loading: false });
        return this.props.navigation.push("FundSuccess", {
          transactionReference: this.props.navigation.getParam("txref")
        });
      }
      this.setState({ loading: false });
      this.props.navigation.goBack();
    } catch (error) {
      alert("An error occured");
      this.setState({ loading: false });
    }
  }
  render() {
    let loading = null;
    if (this.state.loading) {
      loading = <Loading />;
    }
    return (
      <View style={{ flex: 1 }}>
        {loading}
        <Rave
          amount={this.props.navigation.getParam("amount")}
          country="NG"
          currency="NGN"
          email={this.props.navigation.getParam("user").email}
          firstname={
            this.props.navigation.getParam("user").fullname.split(" ")[0]
          }
          lastname={
            this.props.navigation.getParam("user").fullname.split(" ")[1]
          }
          publickey="FLWPUBK_TEST-1ba65cd2109b117eba7acc5d9dc79533-X"
          encryptionkey="FLWSECK_TEST91579052f76f"
          production={true}
          txref={this.props.navigation.getParam("txref")}
          onSuccess={res => this.onSuccess(res)}
          onFailure={e => this.onFailure(e)}
          onClose={e => this.onClose(e)}
        />
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  { updateBalance }
)(RaveScreen);
