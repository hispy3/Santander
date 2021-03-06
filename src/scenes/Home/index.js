import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import homeStyle from './homeStyle';
var homeConstants = require('./homeConstants')

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={homeStyle.container}>
        <Header title={homeConstants.HOME_SCREEN} />
        <View style={homeStyle.viewContainer}>
          <Text style={homeStyle.welcome}>{homeConstants.HOME_SCREEN}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
});

