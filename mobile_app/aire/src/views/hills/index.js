import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground, ScrollView} from 'react-native';

export default (props) => (
  <View style={s.container}>
    <ImageBackground source={require('../../assets/fondotrivia/fondotrivia.png')} style={{width: '100%', height: '100%'}}>
    <View style={s.titleContainer}>
      <Text style={s.titleText}>
        ¿SOS UN EXPLORADOR DEL AIRE?
      </Text>
    </View>
    <View style={s.windowContainer}>
      <Image source={require('../../assets/ventana_avion/ventana_avion.png')} />
    </View>
    </ImageBackground>
  </View>
)

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    // flex: 1,
    paddingHorizontal: 70,
    marginTop: 45
  },
  windowContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  titleText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'HouschkaRoundedAltExtraBold',
  }
});