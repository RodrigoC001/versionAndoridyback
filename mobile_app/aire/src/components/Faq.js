import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground, ScrollView} from 'react-native';
import HTMLView from 'react-native-htmlview';

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as termsActions from "../redux/actions/terms";

import LinearGradient from 'react-native-linear-gradient';


const mapStateToProps = state => ({
  fetching: state.terms.fetching,
  faq: state.terms.faq,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, termsActions), dispatch)
}


class Faq extends Component {
  componentDidMount() {
    this.props.getFaqRequest()
      .then(()=> console.log('this.props.faq', this.props.faq))
  }
  render() {
    return (
      <View style={s.container}>
          <LinearGradient colors={['rgb(64,76,155)', 'rgb(63,74,152)', 'rgb(32,38,78)']} style={{flex: 1}}>
        <ScrollView>
            
            <View style={s.titleContainer}>
              <Text style={s.titleText}>
                Preguntas Frecuentes
              </Text>
            </View>

            <View style={s.paragraphContainer}>
              <Text style={s.textContainer}>
                Queremos enriquecer tu experiencia de vuelo con contenidos adaptados a tu ruta. Con <Text style={[s.textContainer, s.boldText]}>AI.RE</Text> app podés identificar los paisajes visibles desde la ventanilla de tu avión, conectar con sus historias y apoyar nuestro propósito: aumentar la biocapacidad del planeta.
              </Text>
            </View>

        </ScrollView>
          </LinearGradient>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 41,
    marginBottom: 44
  },
  titleText: {
    fontSize: 19,
    fontFamily: 'HouschkaRoundedAltExtraBold',
    color: 'rgb(255,255,255)',
    letterSpacing: 1.9
  },
  boldText: {
    fontFamily: 'HouschkaRoundedAltExtraBold'
  },
  paragraphContainer: {
    marginBottom: 20,
    paddingHorizontal: 27
  },
  textContainer: {
    color: 'rgb(255,255,255)',
    fontFamily: 'HouschkaRoundedAltLight',
    fontSize: 15,
    lineHeight: 19
  },
  buttonPosition: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonShape: {
    borderRadius: 26,
    backgroundColor: 'rgb(255,255,255)',
    borderWidth: 2,
    borderColor: 'rgb(212,220,241)',
    height: 52,
    width: 187
  },
  buttonTextContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  buttonText: {
    fontSize: 17,
    fontFamily: 'HouschkaRoundedAltDemiBold',
    color: 'rgb(64,76,155)'
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Faq);
