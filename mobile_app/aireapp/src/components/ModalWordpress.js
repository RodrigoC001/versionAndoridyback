import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView, Animated, StatusBar} from 'react-native';

import HTMLView from 'react-native-htmlview';
import axios from "axios";


const { width } = Dimensions.get('window');



// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as destinationActions from "../redux/actions/destinations";
import * as originActions from "../redux/actions/origins";
import * as tripActions from "../redux/actions/trips";

const mapStateToProps = state => ({
  destinations: state.destinations.destinations,
  origins: state.origins.origins,
  possibleDestinations: state.trips.possibleDestinations,
  originsFetching: state.origins.fetching,
  tripsFetching: state.trips.fetching,
  selectedTrip: state.trips.selectedTrip
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, destinationActions, originActions, tripActions), dispatch)
}

function renderNode(node, index, siblings, parent, defaultRenderer) {
  if (node.name == 'img') {
    const { src, height } = node.attribs;
    // const imageHeight = height || 300;
    return (
      <Image
        key={index}
        style={{ width: width, height: 300}}
        resizeMode='contain'
        source={{ uri: src }} />
    );
  }
}

// const MODAL_HEIGHT = 429

const MODAL_HEIGHT = Dimensions.get('window').height / 2
const FULL_SCREEN = Dimensions.get('window').height 


class Search extends React.Component {
  state = {
    fetching: true,
    content: null,
    title: null,
    showX: false
  }
  componentWillMount() {
    this.animatedValue = new Animated.Value(0)
  }
  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 1500
    }).start()
    axios
      .get(`https://public-api.wordpress.com/rest/v1.1/sites/aireapp.wordpress.com/posts/${this.props.dataLink}`)
      .then(response => {
        let content = response.data.content.replace(/<p style=\"text-align:justify;\"><img/g, "<img").replace(/\n/g, '')
        this.setState({
          title: response.data.title,
          fetching: false,
          content
        })
      })
  }
  scrollToTop = () => {
    this.setState({
      showX: true
    })
    Animated.timing(this.animatedValue, {
      toValue: 2,
      duration: 300
    }).start()
  }
  render() {
    const interpolateDistance = this.animatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [-FULL_SCREEN +55, -MODAL_HEIGHT +55, -20]
      // outputRange: [-FULL_SCREEN, -MODAL_HEIGHT, -StatusBar.currentHeight]
      // aca necesito sacar el height de la status bar en ios & en Android, porque lo de arriba solo funciona en Android 
      // https://stackoverflow.com/questions/35436643/how-to-find-height-of-status-bar-in-android-through-react-native
      // window y screen? https://facebook.github.io/react-native/docs/dimensions
    })
    const animatedStyle = {
      position: 'absolute',
      // backgroundColor: interpolateColor,
      width: '100%',
      height: '100%'
    }

    if(this.state.fetching) {
      return (
        <View style={s.containerBig}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color='red' />
          </View>
        </View>
      )
    }
    return (
      <Animated.View style={s.containerBig}>
        <Animated.View
          style={{
            zIndex: 10,
            position: 'absolute',
            // width: '100%',
            height: FULL_SCREEN -55,
            backgroundColor: 'white',
            bottom: interpolateDistance,
            // paddingHorizontal: 12.5,
            // paddingTop: 16.6,
            // paddingBottom: -30 + 55,
            // alignItems: 'center'
          }}
        >

      <View style={s.bigContainer}>

        <View style={{flex: 1, flexDirection: 'row'}}>  
          
          <View style={[s.titleContainer, {flex: 0.8}]}>
            <Text style={s.titleText}>
              {this.state.title && this.state.title.toUpperCase()}
            </Text>
          </View>

          <TouchableOpacity onPress={!this.state.showX ? this.scrollToTop : this.props.close} style={[s.imgContainer, {flex: 0.2}]}>
            <Image source={!this.state.showX ? require('../assets/arriba/arriba.png') : require('../assets/cerrar/cerrar.png') } />
          </TouchableOpacity>
          
        </View>

        <View style={s.line} />

      </View>

        <ScrollView contentContainerStyle={{paddingBottom: !this.state.showX ? 300 : 35 }}>
          <HTMLView
            renderNode={renderNode}
            value={this.state.content && `${this.state.content}`}
            stylesheet={s}
          />
       </ScrollView>
       </Animated.View>
      </Animated.View>
    );
  }
}

const s = StyleSheet.create({
  containerBig: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  bigContainer: {
    height: 53,
  },
  titleContainer: {
    paddingLeft: 33,
    flex: 1,
    justifyContent: 'center'
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    backgroundColor: 'rgb(64,76,155)',
    height: 1,
    opacity: 0.23
  },
  titleText: {
    color: 'rgb(64,76,155)',
    fontFamily: 'HouschkaRoundedAltExtraBold',
    fontSize: 14
  },
  p: {
    color: 'rgb(64,76,155)',
    paddingHorizontal: 33,
    fontFamily: 'HouschkaRoundedAltMedium',
    lineHeight: 19,
    fontSize: 13
  },
  i: {
    color: 'rgb(64,76,155)',
    paddingHorizontal: 33,
    fontFamily: 'HouschkaRoundedAltMedium',
    lineHeight: 19,
    fontSize: 13,
    fontStyle: 'italic'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
