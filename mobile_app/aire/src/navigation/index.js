import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import Config from '../views/config/'
import AboutUs from '../components/AboutUs/AboutUs.js'
import TabBar from '../navigation/TabBar.js'
import TestMap from '../components/TestMap.js'
import Nubes from '../views/nubes/'
import Hills from '../views/hills/'
import Search from '../views/search/'


export const BottomTabs = createBottomTabNavigator(
  { 
    AboutUs: AboutUs,
    Hills: Hills,
    Map: Search,
    Nubes: Nubes,
    Config: Config,
  },
  {
    initialRouteName: 'Map',
    tabBarComponent: (props) => <TabBar {...props}/>
  }
);
