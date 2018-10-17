import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView, Animated, StatusBar, AsyncStorage} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import HTMLView from 'react-native-htmlview';
import axios from "axios";
import RNFetchBlob from 'rn-fetch-blob'

const { width } = Dimensions.get('window');

const SLIDER_1_FIRST_ITEM = 0;

const TAB_BAR_HEIGHT = 55

const slideWidth = wp(75);
const deviceHeight = Dimensions.get('window').height
const itemHorizontalMargin = wp(2);

const sliderWidth = width;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

function wp (percentage) {
    const value = (percentage * width) / 100;
    return Math.round(value);
}


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
        style={null}
        resizeMode='contain'
        source={ null } />
    );
  }
}

// const MODAL_HEIGHT = 429

const MODAL_HEIGHT = Dimensions.get('window').height / 2
const FULL_SCREEN = Dimensions.get('window').height 

class ModalWordpress extends React.Component {
  state = {
    fetching: true,
    content: null,
    title: null,
    showX: false,
    imageSrcArray: [],
    slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    localImagesArray: []
    // testUri: null
  }
  componentWillMount() {
    this.animatedValue = new Animated.Value(0)
  }
  // volver a rehacer esta parte del component did update
/*  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataLink === this.props.dataLink) return

    this.setState({
      fetching: true,
      imageSrcArray: [],
      slider1ActiveSlide: 0
    }, ()=> {
      console.log('this.state.fetching', this.state.fetching)
      this.getWordPressApi()
    })
  }*/
  findOrCreateImageStorageFolder = () => {
    // lo busco y si no existe lo creo.
    // async storage solo toma strings, asi que voy parseando de array a string y viceversa
    return AsyncStorage.getItem(`${this.props.dataLink}_imageArray`)
         .then(req => JSON.parse(req))
         .then(json => {
          if(json) {
            console.log('the data already exists and is', json)
          }
          if(!json) {
            const emptyArray = [];
            return AsyncStorage.setItem(`${this.props.dataLink}_imageArray`, emptyString)
                  .then(json => {
                    AsyncStorage.getItem(`${this.props.dataLink}_imageArray`)
                    .then(data => console.log('data is created and is', data))
                  })
                  .catch(error => console.log('error!', error));
          }
         })
         .catch(error => console.log('error!', error));
  }
  findOrCreateHtmlStorageFolder = () => {
    // lo busco y si no existe lo creo.
    // async storage solo toma strings, asi que voy parseando de array a string y viceversa
    return AsyncStorage.getItem(`${this.props.dataLink}_htmlFolder`)
         .then(req => JSON.parse(req))
         .then(json => {
          if(json) {
            console.log('the data already exists and is', json)
            return json
          }
          if(!json) {
            const emptyString = '';
            return AsyncStorage.setItem(`${this.props.dataLink}_htmlFolder`, emptyString)
                  .then(json => {
                    return AsyncStorage.getItem(`${this.props.dataLink}_htmlFolder`)
                    .then(data => {
                      console.log('data is created and is', data)
                      return data
                    })
                  })
                  .catch(error => console.log('error!', error));
          }
         })
         .catch(error => console.log('error!', error));
  }
  findOrCreateTitleStorageFolder = () => {
    // lo busco y si no existe lo creo.
    // async storage solo toma strings, asi que voy parseando de array a string y viceversa
    return AsyncStorage.getItem(`${this.props.dataLink}_title`)
         .then(req => JSON.parse(req))
         .then(json => {
          if(json) {
            console.log('the data already exists and is', json)
            return json
          }
          if(!json) {
            const emptyString = '';
            return AsyncStorage.setItem(`${this.props.dataLink}_title`, emptyString)
                  .then(json => {
                    return AsyncStorage.getItem(`${this.props.dataLink}_title`)
                    .then(data => {
                      console.log('data is created and is', data)
                      return data
                    })
                  })
                  .catch(error => console.log('error!', error));
          }
         })
         .catch(error => console.log('error!', error));
  }
  downloadImageLocally = (imageSource) => {
    RNFetchBlob
      .config({
        fileCache : true,
        // by adding this option, the temp files will have a file extension
        // appendExt : 'png'
      })
      .fetch('GET', imageSource, {
        //some headers ..
      })
      .then((res) => {
        // the temp file path with file extension `png`
        console.log('The file saved to ', res.path())
        // Beware that when using a file path as Image source on Android,
        // you must prepend "file://"" before the file path
        // imageView = <Image source={{ uri :  }}/>
        this.pushImageToAsyncStorageArray(Platform.OS === 'android' ? 'file://' + res.path() : '' + res.path())

        this.setState((previousState) => {
        return {localImagesArray: [...previousState.localImagesArray, Platform.OS === 'android' ? 'file://' + res.path() : '' + res.path()]};
      }, ()=> console.log('this.state.localImagesArray', this.state.localImagesArray));
      })
  }
  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 1500
    }).start()

   /* const findOrCreateArray = [this.findOrCreateImageStorageFolder(), this.findOrCreateHtmlStorageFolder(), this.findOrCreateTitleStorageFolder()]
   */
    const findOrCreateArray = [this.findOrCreateHtmlStorageFolder(), this.findOrCreateTitleStorageFolder()]


    // primero encuentro o creo los async storage folders y despues hago el fetch
    Promise.all(findOrCreateArray)
      .then(data => {
        const compareArray = [null, null]
        console.log('data que llega del promise all de find or create es', data)
        // stringify feo el arreglo que me llega con el que tengo aca para compararlos, sino no puedo compararlos. en este caso si es [null, null] === [null, null] es que tengo vacio eso en el storage, y necesito hacer el fetch a wordpress
        if(JSON.stringify(data) === JSON.stringify(compareArray)) {
          console.log('pide el fetch a wordpress')
          return this.getWordPressApi()
        };
        // si ya tengo la info en el storage, la levanto y la pongo en el store
        let content = data[0]
        let title = data[1]

        this.setState({
          fetching: false,
          content,
          title
        }, ()=> console.log('setea el estado con lo que levanto de async storage'));
      })
      .catch(error => console.log('error find or create array promise all',error))
    
    
  }
  saveHtmlToAsyncStorage = (htmlContent) => {
    return AsyncStorage.setItem(`${this.props.dataLink}_htmlFolder`, JSON.stringify(htmlContent))
                  .then(json => {
                    AsyncStorage.getItem(`${this.props.dataLink}_htmlFolder`)
                    .then(data => console.log('data saved is', data))
                  })
                  .catch(error => console.log('error!', error));
  }
  saveTitleToAsyncStorage = (title) => {
    return AsyncStorage.setItem(`${this.props.dataLink}_title`, JSON.stringify(title))
                  .then(json => {
                    AsyncStorage.getItem(`${this.props.dataLink}_title`)
                    .then(data => console.log('data saved is', data))
                  })
                  .catch(error => console.log('error!', error));    
  }
  pushImageToAsyncStorageArray = (imgPath) => {
     return AsyncStorage.getItem(`${this.props.dataLink}_imageArray`)
      .then(req => JSON.parse(req))
      .then(array => {
        let newArray = array.slice()
        console.log('newArray before push is', newArray)
        newArray.push(imgPath)
        console.log('newArray after push is', newArray)
        return AsyncStorage.setItem(`${this.props.dataLink}_imageArray`, JSON.stringify(newArray))
              .then(json => console.log('success!'))
              .catch(error => console.log('error en el ste item del imagearray!', error));
      })
      .catch(error => console.log('error! en el get item de image array', error));
  }
  getWordPressApi = () => {
    axios
      .get(`https://public-api.wordpress.com/rest/v1.1/sites/aireapp.wordpress.com/posts/${this.props.dataLink}`)
      .then(response => {

        let content = response.data.content
        let title = response.data.title        

        this.saveHtmlToAsyncStorage(content)
        this.saveTitleToAsyncStorage(title)

        this.setState({
          title: response.data.title,
          fetching: false,
          content
        })
      })
  }
  renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name == 'img') {
      const { src, height } = node.attribs;

      // console.log('node', node, 'index', index, 'siblings,', siblings, 'parent', parent)

      // this.downloadImageLocally(src)

      this.setState((previousState) => {
        return {imageSrcArray: [...previousState.imageSrcArray, src ]};
      }, ()=> console.log('this.state.imageSrcArray', this.state.imageSrcArray));

      // retorno null para no renderear estas imagenes y guardarlas en un arreglo aparte;
      return null
    }
  }
  _renderItem = ({item, index}) => {
      return (
          <View style={{flex: 1}}>
            <Image
              key={index}
              style={{ width: width, height: 300, resizeMode: 'contain'}}
              resizeMode='contain'
              source={{uri: item}} 
            />
          </View>
      );
  }
  get pagination () {
      const { imageSrcArray, slider1ActiveSlide } = this.state;
      return (
          <Pagination
            dotsLength={imageSrcArray.length}
            activeDotIndex={slider1ActiveSlide}
            containerStyle={{ width: '100%'}}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 10,
                marginHorizontal: 4,
                // backgroundColor: 'rgb(64,76,155)',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                borderWidth: 2,
                borderColor: 'rgb(64,76,155)'  
            }}
            inactiveDotStyle={{
                // Define styles for inactive dots here
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
      );
  }
  navigateItem = (index) => {
   
    this.setState({
      // markerPressed: false,
      slider1ActiveSlide: index
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
      // hago este ternario raro para que la pantalla de atras de todo, ocupe o toda la pantalla o solo la mitad, asi permito que se pueda seguri moviendo el mapa (que sino, queda abajo de esa view y no se como propagar el evento a la view que queda abajo de la containerBig que es absoluto), lo mismo en el estilo inline de containerBig
      outputRange: !this.state.showX ? [-FULL_SCREEN +TAB_BAR_HEIGHT, -75, -20] : [-FULL_SCREEN +TAB_BAR_HEIGHT, -MODAL_HEIGHT +TAB_BAR_HEIGHT, -20]
      // outputRange: [-FULL_SCREEN, -MODAL_HEIGHT, -StatusBar.currentHeight]
      // aca el 75 es 55 del tab bar y 20 de la status bar creo, corregir calculo
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
            <ActivityIndicator size="large" color='rgb(188,224,253)' />
          </View>
        </View>
      )
    }
    return (

      <Animated.View style={[s.containerBig, {top: !this.state.showX ? MODAL_HEIGHT - TAB_BAR_HEIGHT : null}]}>
        <Animated.View
          style={{
            zIndex: 10,
            position: 'absolute',
            // width: '100%',
            height: !this.state.showX ? FULL_SCREEN  : FULL_SCREEN - TAB_BAR_HEIGHT,
            backgroundColor: 'white',
            bottom: interpolateDistance,
            // paddingHorizontal: 12.5,
            // paddingTop: 16.6,
            // paddingBottom: -30 + 55,
            // alignItems: 'center'
          }}
        >

      <View style={s.bigContainer}>

        <TouchableOpacity onPress={!this.state.showX ? this.scrollToTop : this.props.close} style={{flex: 1, flexDirection: 'row'}}>  
          
          <View style={[s.titleContainer, {flex: 0.8}]}>
            <Text style={s.titleText}>
              {this.state.title && this.state.title.toUpperCase()}
            </Text>
          </View>

          <View style={[s.imgContainer, {flex: 0.2}]}>

            <Image source={!this.state.showX ? require('../assets/arriba/arriba.png') : require('../assets/cerrar/cerrar.png') } />
          </View>
          
        </TouchableOpacity>

        <View style={s.line} />

      </View>

        <ScrollView contentContainerStyle={{paddingBottom: !this.state.showX ? 300 : 35 }}>

        <View style={s.igCounterContainer}>
          <Text style={s.igCounterText}>{`${this.state.slider1ActiveSlide + 1}/${this.state.imageSrcArray.length}`}</Text>
        </View>

           <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.imageSrcArray}
            renderItem={this._renderItem}
            sliderWidth={width}
            itemWidth={width}
            onSnapToItem={(index) => this.navigateItem(index) }  
           />
           {/* { this.pagination }*/}

          <HTMLView
            renderNode={this.renderNode}
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
    // flex: 1,
    // height: FULL_SCREEN,
    backgroundColor: 'rgba(0,0,0,0)',
    width: '100%',
    height: '100%',
    position: 'absolute'
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
  igCounterContainer: {
    height: 30, 
    backgroundColor: 'rgba(0, 0, 0, 0.75)', 
    width: 50, 
    borderRadius: 20, 
    justifyContent: 'center',
    alignItems: 'center', 
    position: 'absolute', 
    top: 50, 
    right: 20, 
    zIndex: 20
  },
  igCounterText: {
    color: 'white', 
    fontSize: 12, 
    fontFamily: 'HouschkaRoundedAltMedium'
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalWordpress);
