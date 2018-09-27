import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import Config from '../views/config/'
import AboutUs from '../components/AboutUs/AboutUs.js'
import TabBar from '../navigation/TabBar.js'
import TestMap from '../components/TestMap.js'
import Nubes from '../views/nubes/'
import Hills from '../views/hills/'
import Search from '../views/search/'


const BottomTabs = createBottomTabNavigator(
  { 
    AboutUs: AboutUs,
    Hills: Hills,
    Map: TestMap,
    Nubes: Nubes,
    Config: Config,
  },
  {
    initialRouteName: 'Map',
    tabBarComponent: (props) => <TabBar {...props}/>
  }
);

export const StackNavigation = createStackNavigator(
  {
    Search: {
      screen: Search,
    },
    BottomTabs: {
      screen: BottomTabs
    }
  },
  {
    initialRouteName: 'Search',
    headerMode: 'none'
  }
)
