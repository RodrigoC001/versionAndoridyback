import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { BottomTabs } from "./navigation/index";
import { Provider } from "react-redux";
import store from "./redux/store";

export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <View style={s.container}>
          <StatusBar
            backgroundColor="rgb(64,76,155)"
            barStyle="default" 
            hidden={false}
          />
          <BottomTabs />
        </View>
      </Provider>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  }
});