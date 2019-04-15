import React, { Component } from 'react';
import { StyleSheet, Modal, Text, Image, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Password} from './Icons';

export default class PinModal extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
        <View style={{ position: 'absolute',flex: 1, height: '100%', alignItems: "center", paddingTop: 90, backgroundColor: "rgba(0,0,0,.6)", paddingHorizontal: 30 }}>
          <View style={{ backgroundColor: "white", borderRadius: 5, maxWidth: 400}}>
            <TouchableOpacity>

            </TouchableOpacity>
            <View style={{paddingVertical: 40, paddingHorizontal:50}}>
              <Text style={{ textAlign: "center" }}>Please enter card pin to continue transaction</Text>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Pin</Text>
              <View style={{
                borderBottomWidth: 2}}>
                  <View style={{ paddingVertical: 5, paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'center' }}>
                    <View>
                      <Password />
                    </View>
                    <View style={{flex: 1}}>
                      <TextInput
                        autoCorrect={false}
                        keyboardType="numeric"
                        secureTextEntry={true}
                        style={{ fontSize: 20, paddingHorizontal: 10, width: '100%'}}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        onChangeText={(pin) => this.props.pinEdit(pin)}
                        value={this.props.pin}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity onPress={this.props.confirm} style={{ width: "100%" }}>
                <View style={{ backgroundColor: this.props.primarycolor, paddingVertical: 15, borderRadius: 5 }}>
                  <Text style={{ fontSize: 13, textAlign: "center", fontWeight: "bold" }}>ENTER</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  formGroup: {
    marginVertical: 20
  },
  label: {
    color: "#ACACAC"
  }
});