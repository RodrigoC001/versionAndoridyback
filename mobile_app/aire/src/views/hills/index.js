import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground, ScrollView} from 'react-native';

export default (props) => (
  <View style={s.container}>
    <ImageBackground source={require('../../assets/fondotrivia/fondotrivia.png')} style={{width: '100%', height: '100%'}}>
  <ScrollView>
    <View style={s.titleContainer}>
      <Text style={s.titleText}>
        ¿SOS UN EXPLORADOR DEL AIRE?
      </Text>
    </View>
    <View style={s.windowContainer}>
      <Image source={require('../../assets/ventana_avion/ventana_avion.png')} style={{width: 263, height: 338}} />
    </View>
    <View style={s.buttonsContainer}>

    <View style={s.buttonPosition}>
      <View style={s.buttonContainer}>
        <Text style={s.textButton}>
          Bañado la Estrella
        </Text>
      </View>
    </View>

    </View>
    </ScrollView>
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
  buttonsContainer: {
    marginTop: 20,
  },
  buttonPosition: {
    // backgroundColor: 'orange',
    paddingHorizontal: 69,
    height: 40,
    justifyContent: 'center',
    // alignItems: 'center'
  },
  buttonContainer: {
    borderRadius: 16,
    height: 32,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    fontSize: 12,
    color: 'rgb(64,76,155)',
    fontFamily: 'HouschkaRoundedAltMedium'
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