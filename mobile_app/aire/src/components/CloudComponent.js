import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground} from 'react-native';

export default ({title, icon, textColor, tintColor}) => (
  <View style={s.container}>
    <ImageBackground source={icon} style={s.cloudComponent}>
      <Text style={[s.cloudCardText, {color: textColor }]}>
        {title}
      </Text>
      <View style={[s.opacityView, {backgroundColor: tintColor}]} />
    </ImageBackground>
  </View>
);


const s = StyleSheet.create({
  cloudComponent: {
    zIndex: 1,
    height: 163,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cloudCardText: {
    fontSize: 20,
    // color: 'rgb(212,220,241)',
    fontFamily: 'HouschkaRoundedAltDemiBold',
    zIndex: 3,
  },
  opacityView: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    // backgroundColor: 'rgb(64,76,155)',
    opacity: 0.58
  }
});
