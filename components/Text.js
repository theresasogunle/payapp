import React from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import { Picker } from "native-base";
import { ShowPassword, HidePassword } from "./svg";
import DatePicker from "react-native-datepicker";
import dayjs from "dayjs";

class CustomText extends React.Component {
  constructor(props) {
    super(props);
    let showPassword = false;
    if (props.password) {
      showPassword = true;
    }
    this.state = { showPassword };
  }
  render() {
    const maxDate = dayjs()
      .subtract(18, "year")
      .format("DD MMMM, YYYY");
    let side = null;
    let togglePassword = null;
    let input = null;
    if (this.props.side) {
      side = <View style={{ marginRight: 15 }}>{this.props.side}</View>;
    }
    if (this.props.keyboardType == "money") {
      side = (
        <View
          style={{
            marginRight: 15,
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
      );
    }
    if (this.props.textSize) {
    }
    if (this.props.password) {
      togglePassword = (
        <TouchableOpacity
          onPress={() =>
            this.setState({ showPassword: !this.state.showPassword })
          }
        >
          <ShowPassword />
        </TouchableOpacity>
      );
      if (!this.state.showPassword) {
        togglePassword = (
          <TouchableOpacity
            onPress={() =>
              this.setState({ showPassword: !this.state.showPassword })
            }
          >
            <HidePassword />
          </TouchableOpacity>
        );
      }
    }
    if (this.props.keyboardType == "date-picker") {
      input = (
        <DatePicker
          style={{
            borderWidth: 0,
            flex: 1,
            padding: 0,
            margin: 0,
            height: "auto"
          }}
          date={this.props.value}
          mode="date"
          showIcon={false}
          placeholder="select DOB"
          format="DD MMMM, YYYY"
          minDate="01 January, 1955"
          maxDate={maxDate}
          confirmBtnText="Confirm"
          color="#ddd"
          cancelBtnText="Cancel"
          // showIcon={false}
          customStyles={{
            dateInput: {
              padding: 0,
              height: "auto",
              borderWidth: 0,
              margin: 0
            },
            dateTouchBody: {
              height: "auto",
              alignItems: "flex-start",
              justifyContent: "flex-start"
            },
            btnTextConfirm: {
              color: "#FFB400"
            },
            dateText: {
              color: "#27347D",
              padding: 0,
              height: "auto",
              margin: 0,
              alignItems: "flex-start",
              justifyContent: "flex-start"
            }

            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            this.props.onChangeText(date);
          }}
        />
      );
    } else if (this.props.keyboardType == "cardnum") {
      input = (
        <TextInput
          selectionColor="#27347D"
          autoCorrect={this.props.autoCorrect ? this.props.autoCorrect : true}
          secureTextEntry={this.state.showPassword ? true : false}
          value={this.props.value}
          keyboardType="number-pad"
          textContentType="creditCardNumber"
          placeholder="4242 4242 4242 4242"
          autoCapitalize={
            this.props.keyboardType == "email-address" ? "none" : "words"
          }
          maxLength={this.props.maxLength ? this.props.maxLength : 300}
          onChangeText={text => this.props.onChangeText(text)}
          style={{
            fontSize: 14,
            width: "100%",
            color: "#27347D",
            flex: 1,
            ...this.props.textStyle
          }}
        />
      );
    } else if (this.props.keyboardType == "card_date") {
      input = (
        <TextInput
          selectionColor="#27347D"
          ref={this.props.refs}
          autoCorrect={this.props.autoCorrect ? this.props.autoCorrect : true}
          secureTextEntry={this.state.showPassword ? true : false}
          value={this.props.value}
          keyboardType="number-pad"
          placeholder="09/23"
          autoCapitalize={
            this.props.keyboardType == "email-address" ? "none" : "words"
          }
          maxLength={this.props.maxLength ? this.props.maxLength : 300}
          onChangeText={text => this.props.onChangeText(text)}
          style={{
            fontSize: 14,
            width: "100%",
            color: "#27347D",
            flex: 1,
            ...this.props.textStyle
          }}
        />
      );
    } else if (this.props.keyboardType == "dropdown") {
      let pickers = [];
      this.props.data.map(dt => {
        pickers.push(
          <Picker.Item key={dt.Code} label={dt.Name} value={dt.Code} />
        );
      });
      input = (
        <Picker
          note
          mode="dropdown"
          style={{ flex: 1, margin: 0, padding: 0 }}
          itemTextStyle={{
            fontSize: 14,
            color: "#27347D",
            margin: 0,
            padding: 0
          }}
          selectedValue={this.props.value}
          onValueChange={value => this.props.onChangeText(value)}
        >
          <Picker.Item label="Choose a bank" value="" />
          {pickers}
        </Picker>
      );
    } else if (this.props.keyboardType == "money") {
      input = (
        <TextInput
          selectionColor="#27347D"
          autoCorrect={this.props.autoCorrect ? this.props.autoCorrect : true}
          secureTextEntry={this.state.showPassword ? true : false}
          value={this.props.value}
          keyboardType="numeric"
          autoCapitalize={
            this.props.keyboardType == "email-address" ? "none" : "words"
          }
          maxLength={this.props.maxLength ? this.props.maxLength : 300}
          onChangeText={text => this.props.onChangeText(text)}
          style={{
            fontSize: 32,
            fontWeight: "bold",
            width: "100%",
            color: "#27347D",
            flex: 1,
            ...this.props.textStyle
          }}
        />
      );
    } else {
      input = (
        <TextInput
          selectionColor="#27347D"
          autoCorrect={this.props.autoCorrect ? this.props.autoCorrect : true}
          secureTextEntry={this.state.showPassword ? true : false}
          value={this.props.value}
          keyboardType={
            this.props.keyboardType ? this.props.keyboardType : "default"
          }
          autoCapitalize={
            this.props.keyboardType == "email-address" ? "none" : "words"
          }
          maxLength={this.props.maxLength ? this.props.maxLength : 300}
          onChangeText={text => this.props.onChangeText(text)}
          style={{
            fontSize: this.props.size ? this.props.size : 14,
            fontWeight: this.props.textWeight
              ? this.props.textWeight
              : "normal",
            width: "100%",
            color: "#27347D",
            flex: 1,
            ...this.props.textStyle
          }}
        />
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "500",
            color: "#9696A5",
            marginBottom: 13
          }}
        >
          {this.props.label}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",

            borderBottomColor: "#D7DBE5",
            paddingBottom: 9,
            borderBottomWidth: 1
          }}
        >
          {side}
          {input}

          {togglePassword}
        </View>
        <Text style={{ fontSize: 12, color: "red", marginTop: 2 }}>
          {this.props.error}
        </Text>
      </View>
    );
  }
}

export default CustomText;
