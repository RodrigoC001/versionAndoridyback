import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import smileyFaceGeoJSON from './smiley_face.json';

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as tripActions from "../redux/actions/trips";

const mapStateToProps = state => ({
  fetching: state.trips.fetching,
  selectedTrip: state.trips.selectedTrip,
  skyspotsArrayForMap: state.trips.skyspotsArrayForMap
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, tripActions), dispatch)
}


// MAPBOX CONFIG
Mapbox.setAccessToken('pk.eyJ1IjoibGF1dGFyb2dyYW5kZSIsImEiOiJjamtrNjFqMW8xbnVhM3BwYjdmZjczcXkyIn0._Gz0SnZDQIGeosDSbwFwMA');

const layerStyles = Mapbox.StyleSheet.create({
  background: {
    // backgroundPattern: gridPattern,
  },
  smileyFace: {
    fillAntialias: true,
    fillColor: 'white',
    fillOutlineColor: 'rgba(255, 255, 255, 0.84)',
  },
});


const icono = {
  selected: require('../assets/skyspotseleccionado/skyspotseleccionado.png'),
  deselected: require('../assets/mapa/mapa.png')
}

class MapBoxContainer extends Component<{}> {
  constructor (props) {
    super(props);

    this.state = {
      // estan al reves de lo normal. el primero es longitud, y el segundo latitud.
      coordinates: [[-67.6205063,-45.8204256],[-61.7483139, -38.3944152]]
    };
  }
  componentDidMount() {
    console.log('props del mapa', this.props)
  }
  test = (id) => {
    let skyspotsArrayForMap = this.props.skyspotsArrayForMap

    var that = this
    
    for (var i = 0; i < skyspotsArrayForMap.length; i++) {
      that[skyspotsArrayForMap[i].id.toString()].props.onDeselected()
    }

    return this[id].props.onSelected()

  }
  renderAnnotation (id, coords) {    
    return (
      <Mapbox.PointAnnotation
        ref={(point) => {this[id] = point}}
        key={id}
        id={id}
        anchor={{ x: 0.9, y: 0.9 }}
        coordinate={coords}
        onSelected={()=> {
          // console.log('entra al selected')
          let newObj = {}
          newObj[id] = true
          this.setState(newObj)
        }}
        onDeselected ={()=> {
          // console.log('entra al deselected')
          let newObj = {}
          newObj[id] = false
          this.setState(newObj)
        }}
        >
        <TouchableOpacity onPress={() => this.test(id)}>
          <Image source={!this.state[id] ? icono.deselected : icono.selected} />
        </TouchableOpacity>
        <Mapbox.Callout title='Test!' />
      </Mapbox.PointAnnotation>
    )
  }
  renderAnnotations () {
    let skyspotsArrayForMap = this.props.skyspotsArrayForMap

    const items = skyspotsArrayForMap.map(skyspot => {
      return this.renderAnnotation(skyspot.id.toString(), skyspot.coords)
    })

    return items
  }
  render() {
    return (
      <View style={styles.container}>
        <Mapbox.MapView
          styleURL={'mapbox://styles/lautarogrande/cjixz2j6c7dj72so4doacsfu6'}
          // zoomLevel={15}
          // centerCoordinate={[11.256, 43.770]}
          style={styles.container}
          showUserLocation={true}
        >
          {/*<Mapbox.VectorSource>
            <Mapbox.BackgroundLayer
              id="background"
              style={layerStyles.background}
            />
          </Mapbox.VectorSource>
*/}
          <Mapbox.ShapeSource id="smileyFaceSource" shape={smileyFaceGeoJSON}>
            <Mapbox.FillLayer
              id="smileyFaceFill"
              style={layerStyles.smileyFace}
            />
          </Mapbox.ShapeSource>
          {this.renderAnnotations()}
        </Mapbox.MapView>

        <View style={styles.goBackContainer}>
          <TouchableOpacity onPress={()=> this.props.navigation.pop()}>
              <Image source={require('../assets/atras/atras.png')} />
          </TouchableOpacity>
        </View>
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
  },
  goBackContainer: {
    flex: 1,
    left: 22,
    position: 'absolute',
    right: 0,
    top: 27,
    zIndex: 2
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MapBoxContainer);


// info

// https://github.com/mapbox/react-native-mapbox-gl/blob/master/docs/ShapeSource.md

// https://github.com/mapbox/react-native-mapbox-gl/tree/master/example/src/components