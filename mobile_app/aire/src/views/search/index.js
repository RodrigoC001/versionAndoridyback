import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, TextInput} from 'react-native';
import ConfigOption from '../../components/ConfigOption.js'
import Autocomplete from 'react-native-autocomplete-input';

const API = 'https://swapi.co/api';
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as destinationActions from "../../redux/actions/destinations";
import * as originActions from "../../redux/actions/origins";


const mapStateToProps = state => ({
  destinations: state.destinations.destinations,
  origins: state.origins.origins
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, destinationActions, originActions), dispatch)
}

class Search extends React.Component {
  state = {
    origins: [],
    query: ''
  }
  componentDidMount() {

    this.props.getOriginsRequest()
      .then(origins => {
        this.setState({origins: this.props.origins.data}, ()=> console.log('origins state', this.state))
      })

    /*fetch(`${API}/origins/`).then(res => res.json()).then((json) => {
      const { results: origins } = json;
      this.setState({ origins }, ()=> console.log('this.state', this.state));
    });*/
  }
  findOrigin(query) {
    if (query === '') {
      return [];
    }

    const { origins } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return origins.filter(origin => origin.address.search(regex) >= 0);
  }
  render() {
    const { query } = this.state;
    const origins = this.findOrigin(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    // const { points, cardImg, dateUsed, alreadyUsed } = this.props
    return (
      <View style={s.containerBig}>
        <ImageBackground source={require('../../assets/aire_1242x2436.jpg')} style={{width: '100%', height: '100%'}}>

        <View style={s.titleContainer}>
          <Text style={s.titleExploreText}>
            Explorá la tierra mientras volás
          </Text>
        </View>

        <View style={s.originContainer}>
          <View style={s.originTextContainer}>
            <Text style={s.originText}>
              ORIGEN
            </Text>
          </View>
        </View>

        <View style={s.destinationContainer}>
          <View style={s.originTextContainer}>
            <Text style={s.originText}>
              DESTINO
            </Text>
          </View>
        </View>

        <View style={s.autocompleteContainer}>
          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            // listContainerStyle={{backgroundColor: 'orange'}}
            containerStyle={{}}
            listStyle={{backgroundColor: 'transparent', borderWidth: 0}}
            inputContainerStyle={{borderWidth: 0}}
            data={origins.length === 1 && comp(query, origins[0].address) ? [] : origins}
            defaultValue={query}
            onChangeText={text => this.setState({ query: text })}
            placeholder="Ingresa tu origen acá"
            renderItem={({ address, release_date }) => (
              <TouchableOpacity style={s.listOptionStyle} onPress={() => this.setState({ query: address })}>
                <Text style={s.itemText}>
                  {address}
                </Text>
              </TouchableOpacity>
            )}
            renderTextInput={() => (
              <View style={s.textInputContainerStyle}>
              <TextInput
                style={s.textInputStyle}
                onChangeText={text => this.setState({ query: text })}
                defaultValue={query}
                placeholder="Ingresa tu origen acá"
                placeholderTextColor="rgb(64,76,155)"
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                autoCorrect={false}
                // onChangeText={(text) => this.setState({text})}
                // value={this.state.text}
              />
              <TouchableOpacity onPress={()=> console.log('test')} style={{flex: 0.15, justifyContent: "center", paddingRight: 10}}>
                <Image style={{width: 16, height: 16, resizeMode: 'contain', flex: 1  }} tintColor={"#9B9B9B"} source={{uri: 'http://simpleicon.com/wp-content/uploads/magnifier-2.png'}} />
              </TouchableOpacity>
              </View>
            )}
            />
        </View>



        </ImageBackground>
      </View>
    );
  }
}

const s = StyleSheet.create({
  containerBig: {
    flex: 1,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 51,
    marginBottom: 66
  },
  inputContainerAutocomplete: {
    height: 48,
    backgroundColor: 'red',
    borderRadius: 200
  },
  titleExploreText: {
    fontSize: 20,
    fontFamily: 'HouschkaRoundedAltMedium',
    color: 'rgb(255,255,255)'
  },
  originTextContainer: {
    marginLeft: 24,
    marginBottom: 16
  },
  textInputContainerStyle: {
    backgroundColor: 'white',
    borderRadius: 24,
    marginHorizontal: 18,
    flexDirection: 'row'
  },
  listOptionStyle: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 16,
    height: 48,
    marginHorizontal: 8,
    marginTop: 4
    // color: 'rgb(64,76,155)',
  },
  textInputStyle: {
    // backgroundColor: 'red', 
    // borderRadius: 24,
    // marginHorizontal: 18,
    padding: 16,
    fontFamily: 'HouschkaRoundedAltMedium',
    fontSize: 14,
    height: 48,
    color: 'rgb(64,76,155)',
    flex: 0.85
  },
  destinationContainer: {
    marginTop: 70
  },
  originText: {
    fontSize: 17,
    color: 'rgb(188,224,253)',
    fontFamily: 'HouschkaRoundedAltDemiBold',
  },
  container: {
    backgroundColor: 'blue',
    // flex: 1,
    height: 200,
    paddingTop: 25
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 180,
    zIndex: 1
  },
  itemText: {
    fontFamily: 'HouschkaRoundedAltMedium',
    fontSize: 14,
    color: 'rgb(64,76,155)'
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 25
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
