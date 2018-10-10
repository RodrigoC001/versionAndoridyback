import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import Config from '../views/config/'
import AboutUs from '../components/AboutUs/AboutUs.js'
import TabBar from '../navigation/TabBar.js'
import MapBoxContainer from '../components/MapBoxContainer.js'
import Nubes from '../views/nubes/'
import CarouselNublado from '../views/nubes/CarouselNublado.js'
import Hills from '../views/hills/'
import Search from '../views/search/'
import Faq from '../components/Faq.js'
import Terms from '../components/Terms.js'



const ConfigStack = createStackNavigator(
  {
    Config: {
      screen: Config
    },
    Faq: {
      screen: Faq
    },
    PrivacyTerms: {
      screen: Faq
    },
    Terms: {
      screen: Terms
    }
  },
  {
    initialRouteName: 'Config',
    headerMode: 'none'
  }
)

const NubesStack = createStackNavigator(
  {
    Nubes: {
      screen: Nubes
    },
    CarouselNublado: {
      screen: CarouselNublado
    }
  },
  {
    initialRouteName: 'Nubes',
    headerMode: 'none'
  }
)

const BottomTabs = createBottomTabNavigator(
  { 
    AboutUs: AboutUs,
    Hills: Hills,
    Map: MapBoxContainer,
    Nubes: NubesStack,
    Config: ConfigStack,
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
