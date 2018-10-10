import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, TextInput, Keyboard, Dimensions, ActivityIndicator} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Carousel from 'react-native-snap-carousel';

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as destinationActions from "../../redux/actions/destinations";
import * as originActions from "../../redux/actions/origins";
import * as tripActions from "../../redux/actions/trips";

const mapStateToProps = state => ({
  destinations: state.destinations.destinations,
  origins: state.origins.origins,
  possibleDestinations: state.trips.possibleDestinations,
  originsFetching: state.origins.fetching,
  tripsFetching: state.trips.fetching,
  selectedTrip: state.trips.selectedTrip
});

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height


function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, destinationActions, originActions, tripActions), dispatch)
}

const nubladoImages = [{
  id: 1,
  image: require('../../assets/nublado/1.png'),
}, {
  id: 2,
  image: require('../../assets/nublado/2.png'),
}, {
  id: 3,
  image: require('../../assets/nublado/3.png'),
}, {
  id: 4,
  image: require('../../assets/nublado/4.png'),
}, {
  id: 5,
  image: require('../../assets/nublado/5.png'),
}]

class CarouselNublado extends React.Component {
  state = {
    nubladoImages: nubladoImages,
  }
  _renderItem = ({item, index}) => {
      return (
          <View style={s.slide}>
              <Image 
                source={item.image} 
                style={{width: deviceWidth, height: deviceHeight, 'resizeMode': 'contain'}}
              />
          </View>
      );
  }
  render() {
    return (
            <View style={s.container}>
              <Carousel
               ref={(c) => { this._carousel = c; }}
               data={this.state.nubladoImages}
               renderItem={this._renderItem}
               sliderWidth={deviceWidth}
               itemWidth={deviceWidth}
              />
            </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'rgb(64,76,155)'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CarouselNublado);
