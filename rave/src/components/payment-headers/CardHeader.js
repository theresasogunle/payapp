import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements'

export default class CardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.switchToCard = this.switchToCard.bind(this);

  }

  switchToCard() {
    this.setState({
      show: !this.state.show
    }, function () {
      if (this.state.show) {
        this.props.page("home")
      } else {
        this.props.page("card")
      }
    })
  }

  render() {
    if (this.props.colorTwo === '#F5A623') {
      icon = <Icon name='keyboard-arrow-down' color='#27347D' />;

    } else {
      icon = <Icon name='keyboard-arrow-up' color='#27347D' />;

    }

    const styles = StyleSheet.create({
      container: {
        width: '100%',
        bottom: this.props.bottomTwo,
        top: this.props.topTwo,
        display: this.props.displayTwo,
        position: 'absolute'
      },
      nav: {
        backgroundColor: '#FFA000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 87,
        width: '100%'
      },
      text: {
        fontSize: 16,
        textAlign: 'center',
        color: '#FFF'
      }
    });

    return (
      <View >
        <View style={styles.container}>
          <View style={styles.nav}>
            <TouchableOpacity style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} onPress={this.switchToCard}>
              <Text style={styles.text}>Fund with <Text style={{ fontWeight: 'bold' }}>Debit Card</Text></Text>
              {icon}
            </TouchableOpacity>

          </View>
        </View>

      </View>
    )
  }
}