import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import Config from './views/config/'
import AboutUs from './components/AboutUs/AboutUs.js'

/*export default class App extends Component{
  render() {
    return (
      <View style={s.container}>
        <Text style={s.welcome}>Welcome!</Text>
        <Image
          style={{width: 300, height: 300}}
          source={{uri: 'https://scontent.faep8-2.fna.fbcdn.net/v/t1.0-9/20882552_511468385856826_2094245809844683982_n.jpg?_nc_cat=0&oh=744c77094d7f8e2f361c1b8d78ddfdad&oe=5BD78E7B'}}
        />
      </View>
    );
  }
}
*/
const s = StyleSheet.create({
  container: {
    flex: 1,
  }
});

/*export default createBottomTabNavigator({
  AboutUs: AboutUs,
  Config: Config,
});
*/

const icon = {
  AboutUs: require('./assets/aire_blanco/aire.png'),
  Config: require('./assets/configuracion_blanco/configuracion.png')
}

export default createBottomTabNavigator(
  {
    AboutUs: AboutUs,
    Config: Config,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'AboutUs') {
          // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          iconName = icon.AboutUs
        } else if (routeName === 'Config') {
          // iconName = `ios-options${focused ? '' : '-outline'}`;
          iconName = icon.Config
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <View style={{flex: 1}}><Image source={iconName} /></View>;
      },
    }),
    tabBarOptions: {
      // activeTintColor: 'tomato',
      // inactiveTintColor: 'gray',
    },
  }
);