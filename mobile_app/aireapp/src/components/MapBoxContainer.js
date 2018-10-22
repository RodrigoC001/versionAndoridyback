import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Dimensions,
  ActivityIndicator,
  AsyncStorage,
  Alert
} from 'react-native';

import Mapbox from '@mapbox/react-native-mapbox-gl';
import geoViewport from '@mapbox/geo-viewport';

import Bubble from './Bubble';
import ModalWordpress from './ModalWordpress';

import axios from "axios";
import DomSelector from 'react-native-dom-parser';
import RNFetchBlob from 'rn-fetch-blob'

// import smileyFaceGeoJSON from './smiley_face.json';

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

const IS_ANDROID = Platform.OS === 'android';
const MAPBOX_VECTOR_TILE_SIZE = 512;
const CENTER_COORD = [-58.3861497, -34.6111362];


async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Ubicación',
        'message': 'Necesitamos poder acceder a tu ubicación para continuar con la aplicación'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the geolocation")
    } else {
      console.log("geolocation permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

// MAPBOX CONFIG
Mapbox.setAccessToken('pk.eyJ1IjoibGF1dGFyb2dyYW5kZSIsImEiOiJjamtrNjFqMW8xbnVhM3BwYjdmZjczcXkyIn0._Gz0SnZDQIGeosDSbwFwMA');

const layerStyles = Mapbox.StyleSheet.create({
  background: {
    // backgroundPattern: gridPattern,
  },
/*  smileyFace: {
    fillAntialias: true,
    fillColor: 'white',
    fillOutlineColor: 'rgba(255, 255, 255, 0.84)',
  },*/
});


const icono = {
  selected: require('../assets/skyspotseleccionado/skyspotseleccionado.png'),
  deselected: require('../assets/mapa/mapa.png')
}

class MapBoxContainer extends Component<{}> {
  state = {
    isFetchingAndroidPermission: IS_ANDROID,
    isAndroidPermissionGranted: false,
    latitude: null,
    longitude: null,
    error: null,
    name: this.props.selectedTrip && `${this.props.selectedTrip.data.name}-${Date.now()}`,
    offlineRegion: null,
    offlineRegionStatus: null,
    downloadingSkyspotsData: true,   
    dataLink: null,
    downloadedSkyspotsArray: []
  }
  async componentWillMount() {
    if (IS_ANDROID) {
      const isGranted = await Mapbox.requestAndroidLocationPermissions();
      this.setState({
        isAndroidPermissionGranted: isGranted,
        isFetchingAndroidPermission: false,
      });
    }
  }
  componentWillUnmount() {
    console.log('entra al will unmount')
    // avoid setState warnings if we back out before we finishing downloading
    Mapbox.offlineManager.deletePack(this.state.name);
    Mapbox.offlineManager.unsubscribe(this.props.selectedTrip && this.props.selectedTrip.data.name);
  }
  componentDidMount() {
    requestLocationPermission()
      .then(()=> this.getCurrentLocation())

    const skyspotsArrayForMap = this.props.skyspotsArrayForMap
    // con el array de skyspots, checkeo en cada uno si el contenido esta bajado o no, o sea guardado en el async storage
    const promisesArray = skyspotsArrayForMap.map(skyspot => this.checkIfContentIsDownloadedOrNot(skyspot.id, skyspot.coords, skyspot.data));

    // una vez estan todas
    Promise.all(promisesArray)
      .then((data) => {
        // ya cargue todo y cambio el fetching
        console.log('cambiar el fetching y mostrar', data)
        this.setState({
          downloadingSkyspotsData: false
        })
      });

    console.log('this.props.skyspotsArrayForMap', this.props.skyspotsArrayForMap)
  }
  getImgNodesAndTheirSrcFromHtml = (title, htmlContent, dataLink) => {
    let rootNode = DomSelector(htmlContent);

    let imgNodes = rootNode.getElementsByTagName('img');

    console.log('imgNodes', imgNodes)

    // hago un map de ese arreglo de nodos y voy bajando cada src de img
    const promisesImgArray = imgNodes.map(imgNode => {

      let imgSrc = imgNode.attributes.src

      return this.downloadImageLocally(title, imgSrc, dataLink)
    })

    // una vez estan todas, loggeo done
    return Promise.all(promisesImgArray)
      .then((data) => {
        console.log('DONE promise all final img src', data)
        return data
      });

  }
  downloadImageLocally = (title, imageSource, dataLink) => {
    return RNFetchBlob
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
        
        this.pushImageToAsyncStorageArray(title, Platform.OS === 'android' ? 'file://' + res.path() : '' + res.path(), dataLink)

        return Platform.OS === 'android' ? 'file://' + res.path() : '' + res.path()

        /*this.setState((previousState) => {
        return {localImagesArray: [...previousState.localImagesArray, Platform.OS === 'android' ? 'file://' + res.path() : '' + res.path()]};
      }, ()=> console.log('this.state.localImagesArray', this.state.localImagesArray));
        */
      })
  }
  pushImageToAsyncStorageArray = (title, imgPath, dataLink) => {
     return AsyncStorage.getItem(`${dataLink}_imageArray`)
      .then(req => JSON.parse(req))
      .then(array => {
        // console.log('array de push image to asnyc storage', array)
        let newArray = array.slice()
        // console.log('newArray before push is', newArray)
        newArray.push(imgPath)
        // console.log('newArray after push is', newArray)
        AsyncStorage.setItem(`${dataLink}_imageArray`, JSON.stringify(newArray))
              .then(json => {
                AsyncStorage.getItem(`${dataLink}_imageArray`)
                    .then(data => {
                      console.log('img array is created, finded and is', data)
                      // return data
                    })
              })
              .catch(error => console.log('error en el push item del imagearray!', error));
      })
      .catch(error => console.log('error! en el get item de image array', error));
  }
  findOrCreateHtmlStorageFolder = (dataLink) => {
    // lo busco y si no existe lo creo.
    // async storage solo toma strings, asi que voy parseando de array a string y viceversa
    return AsyncStorage.getItem(`${dataLink}_htmlFolder`)
         .then(req => JSON.parse(req))
         .then(json => {
          if(json) {
            console.log('the data already exists and is', json)
            return json
          }
          if(!json) {
            const emptyString = '';
            return AsyncStorage.setItem(`${dataLink}_htmlFolder`, emptyString)
                  .then(json => {
                    return AsyncStorage.getItem(`${dataLink}_htmlFolder`)
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
  findOrCreateImageStorageFolder = (dataLink) => {
    // lo busco y si no existe lo creo.
    // async storage solo toma strings, asi que voy parseando de array a string y viceversa
    return AsyncStorage.getItem(`${dataLink}_imageArray`)
         .then(req => JSON.parse(req))
         .then(json => {
          if(json) {
            console.log('the image storage folder already exists and is', json)
            return json
          }
          if(!json) {
            const emptyArray = [];
            return AsyncStorage.setItem(`${dataLink}_imageArray`, JSON.stringify(emptyArray))
                  .then(json => {
                    return AsyncStorage.getItem(`${dataLink}_imageArray`)
                    .then(data => {
                      console.log('image storage folder is created and is', data)
                      return data
                    })
                  })
                  .catch(error => console.log('error!', error));
          }
         })
         .catch(error => console.log('error!', error));
  }
  findOrCreateTitleStorageFolder = (dataLink) => {
    // lo busco y si no existe lo creo.
    // async storage solo toma strings, asi que voy parseando de array a string y viceversa
    return AsyncStorage.getItem(`${dataLink}_title`)
         .then(req => JSON.parse(req))
         .then(json => {
          if(json) {
            console.log('the data already exists and is', json)
            return json
          }
          if(!json) {
            const emptyString = '';
            return AsyncStorage.setItem(`${dataLink}_title`, emptyString)
                  .then(json => {
                    return AsyncStorage.getItem(`${dataLink}_title`)
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
  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('position', position)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => {
        console.log('error', error)
        this.setState({ error: error.message })
      },
      // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  checkIfContentIsDownloadedOrNot = (id, coords, dataLink) => {
    /* const findOrCreateArray = [this.findOrCreateImageStorageFolder(), this.findOrCreateHtmlStorageFolder(), this.findOrCreateTitleStorageFolder()]
   */
    const findOrCreateArray = [this.findOrCreateHtmlStorageFolder(dataLink), this.findOrCreateTitleStorageFolder(dataLink), this.findOrCreateImageStorageFolder(dataLink)]


    // primero encuentro o creo los async storage folders y despues hago el fetch
    return Promise.all(findOrCreateArray)
      .then(data => {
        const compareArray = [null, null, '[]']
        console.log('data que llega del promise all de find or create es', data)
        // stringify feo el arreglo que me llega con el que tengo aca para compararlos, sino no puedo compararlos. en este caso si es [null, null] === [null, null] es que tengo vacio eso en el storage, y necesito hacer el fetch a wordpress
        if(JSON.stringify(data) === JSON.stringify(compareArray)) {
          console.log('pide el fetch a wordpress')
          return this.getWordPressApi(id, coords, dataLink)
        };
        // si ya tengo la info en el storage, la levanto y la pongo en el store
        let content = data[0]
        let title = data[1]
        let imgArray = data[2]


        let downloadedSkyspotObj = {}

        downloadedSkyspotObj.id = id
        downloadedSkyspotObj.coords = coords
        downloadedSkyspotObj.content = content
        downloadedSkyspotObj.title = title
        downloadedSkyspotObj.imgArray = imgArray

      this.setState((previousState) => {
        return {
          fetching: false,
          downloadedSkyspotsArray: [...previousState.downloadedSkyspotsArray, downloadedSkyspotObj]
        };
      }, ()=> console.log('setea el estado con lo que levanto de async storage y this.state.downloadedSkyspotsArray es', this.state.downloadedSkyspotsArray));
      return downloadedSkyspotObj
      })
      .catch(error => {
        console.log('error find or create array promise all', error)
        return error
      })
    }
  getWordPressApi = async (id, coords, dataLink) => {
    console.log('get wordpress api id coords dataLink', id, coords, dataLink)
    axios
      .get(`https://public-api.wordpress.com/rest/v1.1/sites/aireapp.wordpress.com/posts/${dataLink}`)
      .then(response => {

        let content = response.data.content
        let title = response.data.title        

        this.saveHtmlToAsyncStorage(content, dataLink)
        this.saveTitleToAsyncStorage(title, dataLink)

        return this.getImgNodesAndTheirSrcFromHtml(title, content, dataLink)
          .then(imgArray=> {
            console.log('imgArray de getImgNodesAndTheirSrcFromHtml', imgArray)

            let downloadedSkyspotObj = {}

            downloadedSkyspotObj.id = id
            downloadedSkyspotObj.coords = coords
            downloadedSkyspotObj.content = content
            downloadedSkyspotObj.title = title
            downloadedSkyspotObj.imgArray = imgArray            

            this.setState((previousState) => {
              return {
                fetching: false,
                downloadedSkyspotsArray: [...previousState.downloadedSkyspotsArray, downloadedSkyspotObj]
              };
            }, ()=> {
              console.log('setea el estado con lo que bajo de wordpress con internet y this.state.downloadedSkyspotsArray es', this.state.downloadedSkyspotsArray)
            });

            return downloadedSkyspotObj

          })

      })
      .catch(error => {
        if (!error.status) {
           console.log('network error', error)
           this.setState({
            networkError: true,
            fetching: false
           })
           Alert.alert(
             'Error',
             'Ocurrio un error, no estas conectado a Internet o no tenes descargado este contenido.',
             [
               {text: 'OK', onPress: () => console.log('ok, manejar error')},
             ],
             { cancelable: false }
           )
         }
         console.log('error', error)
         return error
      })
  }
  saveHtmlToAsyncStorage = (htmlContent, dataLink) => {
    return AsyncStorage.setItem(`${dataLink}_htmlFolder`, JSON.stringify(htmlContent))
                  .then(json => {
                    AsyncStorage.getItem(`${dataLink}_htmlFolder`)
                    .then(data => console.log('data saved is', data))
                  })
                  .catch(error => console.log('error!', error));
  }
  saveTitleToAsyncStorage = (title, dataLink) => {
    return AsyncStorage.setItem(`${dataLink}_title`, JSON.stringify(title))
                  .then(json => {
                    AsyncStorage.getItem(`${dataLink}_title`)
                    .then(data => console.log('data saved is', data))
                  })
                  .catch(error => console.log('error!', error));    
  }
  selectAndDeselect = (id) => {
    let skyspotsArrayForMap = this.props.skyspotsArrayForMap

    var that = this
    
    for (var i = 0; i < skyspotsArrayForMap.length; i++) {
      that[skyspotsArrayForMap[i].id.toString()].props.onDeselected()
    }

    return this[id].props.onSelected()

  }
  onDidFinishLoadingStyle = async () => {
    console.log('entra al onDidFinishLoadingStyle')

    const { width, height } = Dimensions.get('window');
    const bounds = geoViewport.bounds(
      CENTER_COORD,
      12,
      [width, height],
      MAPBOX_VECTOR_TILE_SIZE,
    );

   /* const options = {
      name: this.state.name,
      styleURL: 'mapbox://styles/lautarogrande/cjl4qetsg5t072snrwgh08jaa',
      bounds: [[bounds[0], bounds[1]], [bounds[2], bounds[3]]],
      minZoom: 4,
      maxZoom: 20,
    };*/

    const options = {
      name: this.state.name,
      // styleURL: Mapbox.StyleURL.Street,
      styleURL: 'mapbox://styles/lautarogrande/cjl4qetsg5t072snrwgh08jaa',
      bounds: [[bounds[0], bounds[1]], [bounds[2], bounds[3]]],
      minZoom: 3,
      maxZoom: 10,
      // maxZoom: 8,
    };

    // start download
    Mapbox.offlineManager.createPack(options, this.onDownloadProgress);
  }

  onDownloadProgress = (offlineRegion, offlineRegionStatus) => {
    this.setState({
      name: offlineRegion.name,
      offlineRegion: offlineRegion,
      offlineRegionStatus: offlineRegionStatus,
    }, ()=> console.log('percentage: ', this.state.offlineRegionStatus.percentage));
  }
  onResume = () => {
    if (this.state.offlineRegion) {
      this.state.offlineRegion.resume();
    }
  }
  onPause = () => {
    if (this.state.offlineRegion) {
      this.state.offlineRegion.pause();
    }
  }

  onStatusRequest = async () => {
    if (this.state.offlineRegion) {
      const offlineRegionStatus = await this.state.offlineRegion.status();
      Alert.alert('Estado del pedido: ', JSON.stringify(offlineRegionStatus, null, 2));
    }
  }
  _formatPercent = () => {
    if (!this.state.offlineRegionStatus) {
      return '0%';
    }
    return Math.round(this.state.offlineRegionStatus.percentage / 10) / 10;
  }
  _getRegionDownloadState = (downloadState) => {
    console.log('this.state.offlineRegionStatus.percentage', this.state.offlineRegionStatus.percentage)
    switch (downloadState) {
      case Mapbox.OfflinePackDownloadState.Active:
        return 'Activo';
      case Mapbox.OfflinePackDownloadState.Complete:
        return 'Completo';
      default:
        return 'Inactivo';
    }
  }
  renderAnnotation (id, coords, dataLink) {    
    return (
      <Mapbox.PointAnnotation
        ref={(point) => {this[id] = point}}
        key={id}
        id={id}
        anchor={{ x: 0.9, y: 0.9 }}
        coordinate={coords}
        onSelected={()=> {
          this.setState({
            renderModal: true,
            dataLink: dataLink,
            id: id
          }, ()=> console.log('this.state.renderModal', this.state.renderModal))
          let newObj = {}
          newObj[id] = true
          this.setState(newObj)
        }}
        onDeselected ={()=> {
          this.setState({
            id: null
          })
          let newObj = {}
          newObj[id] = false
          this.setState(newObj)
        }}
        >
          <Image source={!this.state[id] ? icono.deselected : icono.selected} />
      </Mapbox.PointAnnotation>
    )
  }
  renderAnnotations () {
    let skyspotsArrayForMap = this.props.skyspotsArrayForMap

    const items = skyspotsArrayForMap.map(skyspot => {
      return this.renderAnnotation(skyspot.id.toString(), skyspot.coords, skyspot.data)
    })

    return items
  }
  closeModal = () => {

    // deselecciono programaticamente el punto seleccionado
    // this[this.state.id.toString()].props.onDeselected()

    this.setState({
      renderModal: false
    }, ()=> console.log('this.state.renderModal', this.state.renderModal))
  }
  render() {

    const { offlineRegionStatus, downloadingSkyspotsData } = this.state;

    if (IS_ANDROID && !this.state.isAndroidPermissionGranted) {
      if (this.state.isFetchingAndroidPermission) {
        return null;
      }
      return (
        <View style={{backgroundColor: 'rgb(64,76,155)', flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20}}>
          <Text style={[styles.downloadTitleText, {textAlign: 'center'}]}>
            Necesitamos poder acceder a tu ubicación para continuar con la aplicación
          </Text>
        </View>
      );
    }

 /*   if(!this.state.longitude) return (<View style={{}}><Text>You need to accept location permissions in order to use this example
            applications</Text></View>)*/

    return (
      <View style={styles.container}>
        <Mapbox.MapView
          styleURL={'mapbox://styles/lautarogrande/cjl4qetsg5t072snrwgh08jaa'}
          zoomLevel={3}
          centerCoordinate={CENTER_COORD}
          style={styles.container}
          showUserLocation={true}
          onDidFinishLoadingMap={this.onDidFinishLoadingStyle}
        >
          {/*<Mapbox.VectorSource>
            <Mapbox.BackgroundLayer
              id="background"
              style={layerStyles.background}
            />
          </Mapbox.VectorSource>
*/}
{/*          <Mapbox.ShapeSource id="smileyFaceSource" shape={smileyFaceGeoJSON}>
            <Mapbox.FillLayer
              id="smileyFaceFill"
              style={layerStyles.smileyFace}
            />
          </Mapbox.ShapeSource>*/}
          {this.renderAnnotations()}
        </Mapbox.MapView>

        {(offlineRegionStatus !== null) ? (
                  <Bubble style={this.state.offlineRegionStatus.percentage === 100 && {opacity: 0}}>
                    <View style={[styles.bubleContainer]}>
                    <View style={styles.downloadTitleContainer}>
                      <Text style={styles.downloadTitleText}>
                        Descargando mapa
                      </Text>
                    </View>
                    <View>
                      <ActivityIndicator size="large" color='rgb(188,224,253)' />
                    </View>
{/*
                    <View>
                      <Text style={styles.downloadTitleText}>Porcentaje de la Descarga: {offlineRegionStatus.percentage}</Text>
                    </View>

                    
                      <View style={styles.buttonCnt}>
                        <TouchableOpacity onPress={this.onResume}>
                          <View style={styles.button}>
                            <Text style={styles.buttonTxt}>Resume</Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.onStatusRequest}>
                          <View style={styles.button}>
                            <Text style={styles.buttonTxt}>Status</Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.onPause}>
                          <View style={styles.button}>
                            <Text style={styles.buttonTxt}>Pause</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    */}

                    </View>
                  </Bubble>
                ) : null}

                {(downloadingSkyspotsData) ? (
                  <Bubble style={!downloadingSkyspotsData ? {opacity: 0} : null}>
                    <View style={[styles.bubleContainer]}>
                    <View style={styles.downloadTitleContainer}>
                      <Text style={styles.downloadTitleText}>
                        Descargando imagenes
                      </Text>
                    </View>
                    <View>
                      <ActivityIndicator size="large" color='rgb(188,224,253)' />
                    </View>
                    </View>
                  </Bubble>
                ) : null}

        <View style={styles.goBackContainer}>
          <TouchableOpacity style={{backgroundColor: 'transparent', flex: 0.2}} onPress={()=> this.props.navigation.pop()}>
              <Image source={require('../assets/atras/atras.png')} />
          </TouchableOpacity>
          <View style={{flex: 0.8}} />
        </View>

        {this.state.renderModal && <ModalWordpress close={this.closeModal} dataLink={this.state.dataLink && this.state.dataLink} id={this.state.id && this.state.id} downloadedSkyspotsArray={JSON.stringify(this.state.downloadedSkyspotsArray) !== JSON.stringify([]) ? this.state.downloadedSkyspotsArray : null} />}
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
    zIndex: 2,
    flexDirection: 'row',
  },
  buttonCnt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: 'blue',
    padding: 8,
  },
  buttonTxt: {
    color: 'white',
  },
  bubleContainer: {
    backgroundColor: 'rgb(64,76,155)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  downloadTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  downloadTitleText: {
    fontSize: 19,
    fontFamily: 'HouschkaRoundedAltDemiBold',
    color: 'rgb(255,255,255)',
    letterSpacing: 1.9
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapBoxContainer);


// info

// https://github.com/mapbox/react-native-mapbox-gl/blob/master/docs/ShapeSource.md

// https://github.com/mapbox/react-native-mapbox-gl/tree/master/example/src/components