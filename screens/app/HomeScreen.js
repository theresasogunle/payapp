import React from "react";
import { AsyncStorage, Button, View } from "react-native";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Welcome to the app!"
  };

  render() {
    return (
      <View>
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

export default HomeScreen;