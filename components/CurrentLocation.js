import React, { Component } from 'react';
import {View, Dimensions, StyleSheet, Text, Image, Platform} from 'react-native';
import {BarChart } from 'react-native-animated-charts';
import API from './api.js';
import Axis from "./Axis";
import Constants from 'expo-constants';
import * as Location from 'expo-location';

let WIDTH = Dimensions.get('window').width;
let HEIGHT = Dimensions.get('window').height;

export default class Test extends Component {
    
    constructor() {
    super();
    this.loadWeather = this.loadWeather.bind(this);
    this.state = {
      lat: 13.0,
      long: 37.0,
      hour : [],
      weather : [],
      temperature : [],
      errorMessage: null,
    };
    this.loadWeather([this.state.lat, this.state.long], "latlong");
  }

  loadWeather([lat, long], src){
    API([lat, long], src).then((data) => {
      hour = []
      weather = []
      temperature = []
      data.forEach((day) => {
        hour.push(day["hour"]);
        weather.push(day["weather"]);
        temperature.push(day["temperature"].toFixed(1));
      })
      console.log(hour, weather, temperature)
      this.setState({
        hour : hour,
        weather : weather,
        temperature : temperature
      });
    });
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      lat: location.coords.latitude.toFixed(2),
      long: location.coords.longitude.toFixed(2),
    });
    this.loadWeather([this.state.lat, this.state.long], "latlong");
  };

    
    render() {
        return (
          
              <View>
                <View style={{alignItems:"center", backgroundColor:'#3B6978'}}>
                  <Text style={[styles.buttonText,{fontSize:20, marginTop: 10, marginBottom: 10}]}> Lat = {this.state.lat}, Long = {this.state.long} </Text>
                </View>
                <View style={{alignItems:"center"}}>
                  <Text style={{fontSize:15, marginTop: 20}}>Temperatures in °C During a Day </Text>
                </View>
                <BarChart 
                    labels={this.state.temperature} 
                    dataY={this.state.temperature} 
                    color={'#84A9AC'} 
                    height={HEIGHT * .6}
                    containerStyles={styles.barChart}
                />
                <View style = {{flexDirection:"row", justifyContent:"space-evenly"}}>
                  <Axis ymd={this.state.hour[0]} img={this.state.weather[0]} src={"latlong"}/>
                  <Axis ymd={this.state.hour[1]} img={this.state.weather[1]} src={"latlong"}/>
                  <Axis ymd={this.state.hour[2]} img={this.state.weather[2]} src={"latlong"}/>
                  <Axis ymd={this.state.hour[3]} img={this.state.weather[3]} src={"latlong"}/>
                  <Axis ymd={this.state.hour[4]} img={this.state.weather[4]} src={"latlong"}/>
                  <Axis ymd={this.state.hour[5]} img={this.state.weather[5]} src={"latlong"}/>
                  <Axis ymd={this.state.hour[6]} img={this.state.weather[6]} src={"latlong"}/>
                  <Axis ymd={this.state.hour[7]} img={this.state.weather[7]} src={"latlong"}/>
                </View>
            </View>
        )
      }
}


const styles = StyleSheet.create({
    buttonText: {
        color:"white",
        fontSize:12
    },
    barChart: {
        backgroundColor:"transparent",
        height:HEIGHT*.6,
        width:WIDTH,
        marginTop:20
    },
     tinyLogo: {
        height:30,
        width:30,
  },
  logo: {
    width: 66,
    height: 58,
  },
});




