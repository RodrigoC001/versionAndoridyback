import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

let imageAndIconHeight = 24

export default class TabBarElement extends React.Component {
  render() {
    const { noFocusedIcon, focusedIcon, focused } = this.props
    return (
      <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigate()} style={[s.container, {borderBottomColor: focused ? 'rgb(93,191,189)' : 'transparent' }]}>
          <View style={s.iconContainer}>
            <Image  
              source={focused ? focusedIcon : noFocusedIcon }
            />
          </View>
      </TouchableOpacity>
    );
  }
}

const s = StyleSheet.create({
  container: {
    borderBottomWidth: 6,
    flex: 1,
    // backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    // backgroundColor: 'blue'
    // height: imageAndIconHeight
  }
});