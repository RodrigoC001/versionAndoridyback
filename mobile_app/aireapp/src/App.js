import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { BottomTabs } from "./navigation/index";
import { StackNavigation } from "./navigation/index";
import { Provider } from "react-redux";
import store from "./redux/store";

import SplashScreen from 'react-native-splash-screen'


export default class App extends Component{
  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      console.log('entra algo aca?')
      SplashScreen.hide();
  }
  render() {
    return (
      <Provider store={store}>
        <View style={s.container}>
          <StatusBar
            backgroundColor="rgb(64,76,155)"
            barStyle="default" 
            hidden={false}
          />
          <StackNavigation />
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