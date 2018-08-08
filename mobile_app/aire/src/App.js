import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

export default class App extends Component{
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

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    margin: 10,
    fontFamily: 'HouschkaRoundedAltExtraBold'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});