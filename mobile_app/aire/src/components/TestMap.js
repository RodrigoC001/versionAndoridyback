/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';

Mapbox.setAccessToken('pk.eyJ1IjoibGF1dGFyb2dyYW5kZSIsImEiOiJjamtrNjFqMW8xbnVhM3BwYjdmZjczcXkyIn0._Gz0SnZDQIGeosDSbwFwMA');

const icono = {
  selected: require('../assets/skyspotseleccionado/skyspotseleccionado.png'),
  deselected: require('../assets/mapa/mapa.png')
}

export default class TestMap extends Component<{}> {
  constructor (props) {
    super(props);

    this.state = {
      coordinates: [[-67.6205063,-45.8204256],[-61.7483139, -38.3944152]]
    };
  }
  componentDidMount() {
    console.log('component did mount')
  }
  renderAnnotation (counter) {
    const id = `pointAnnotation${counter}`;
    const coordinate = this.state.coordinates[counter];
    
    return (
      <Mapbox.PointAnnotation
        key={id}
        id={id}
        anchor={{ x: 0.9, y: 0.9 }}
        coordinate={coordinate}
        onSelected={()=> {
          let newObj = {}
          newObj[id] = true
          this.setState(newObj, ()=> console.log('selected state', this.state))
        }}
        onDeselected ={()=> {
          let newObj = {}
          newObj[id] = false
          this.setState(newObj, ()=> console.log('deselected state', this.state))
        }}
        >
          <Image source={!this.state[id] ? icono.deselected : icono.selected} />
        <Mapbox.Callout title='Test!' />
      </Mapbox.PointAnnotation>
    )
  }
  renderAnnotations () {
    const items = [];

    for (let i = 0; i < this.state.coordinates.length; i++) {
      items.push(this.renderAnnotation(i));
    }

    return items;
  }
  render() {
    return (
      <View style={styles.container}>
        <Mapbox.MapView
          styleURL={'mapbox://styles/lautarogrande/cjixz2j6c7dj72so4doacsfu6'}
          // zoomLevel={15}
          // centerCoordinate={[11.256, 43.770]}
          style={styles.container}>
          {this.renderAnnotations()}
        </Mapbox.MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  }
});
