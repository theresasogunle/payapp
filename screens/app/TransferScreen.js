import React from "react";
import { View, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo";
import Top from "../../components/Top";
import SegmentedControlTab from "react-native-segmented-control-tab";
import WalletToBank from "./WalletToBank";
import WalletToWallet from "./WalletToWallet";

// this is the screen that shows when the user wants to send money
class TransferScreen extends React.Component {
  // this removes the default header reactnavigation brings
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  render() {
    let transfer = <WalletToBank navigation={this.props.navigation} />;
    if (this.state.selectedIndex === 0) {
      transfer = <WalletToWallet navigation={this.props.navigation} userPhoneNumber={this.props.navigation.getParam('user').phonenumber} />;
    }
    return (
      <View
        style={{
          flex: 1
        }}
      >
        {/* change the status bar to white */}
        <StatusBar backgroundColor="#FF9E00" barStyle="light-content" />
        <LinearGradient colors={["#F8F9FE", "#F9F9F9"]} style={{ flex: 1 }}>
          <Top mainText="Send Money" navigation={this.props.navigation} />
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
            <LinearGradient colors={["#F8F9FE", "#F9F9F9"]} style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  padding: 20,
                  alignContent: "center"
                }}
                extraScrollHeight={30}
                extraHeight={220}
                enableOnAndroid={true}
              >
                <SegmentedControlTab
                  tabsContainerStyle={styles.tabsContainerStyle}
                  tabStyle={styles.tabStyle}
                  tabTextStyle={styles.tabTextStyle}
                  activeTabStyle={styles.activeTabStyle}
                  activeTabTextStyle={styles.activeTabTextStyle}
                  values={["Send To Wallet", "Send To Bank"]}
                  selectedIndex={this.state.selectedIndex}
                  onTabPress={selectedIndex => this.setState({ selectedIndex })}
                />
                <View style={{ marginBottom: 20 }} />
                {transfer}
              </View>
            </LinearGradient>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default TransferScreen;

const styles = StyleSheet.create({
  tabsContainerStyle: {
    borderColor: "#212C68"
  },
  tabStyle: {
    //custom styles
    borderColor: "#212C68"
  },
  tabTextStyle: {
    color: "#212C68"
    //custom styles
  },
  activeTabStyle: {
    //custom styles
    backgroundColor: "#212C68"
  },
  activeTabTextStyle: {
    //custom styles
    color: "#FF9900"
  },
  tabBadgeContainerStyle: {
    //custom styles
    borderColor: "#212C68"
  },
  activeTabBadgeContainerStyle: {
    //custom styles
  },
  tabBadgeStyle: {
    //custom styles
  },
  activeTabBadgeStyle: {
    //custom styles
  }
});
