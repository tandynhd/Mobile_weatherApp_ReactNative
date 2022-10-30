import * as React from 'react';
import { View, Dimensions, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import API from './api.js';
import Axis from "./Axis";
import {BarChart } from 'react-native-animated-charts';

let WIDTH = Dimensions.get('window').width;
let HEIGHT = Dimensions.get('window').height;

export default class CityMode extends React.Component {
  constructor() {
    super();
    this.loadWeather = this.loadWeather.bind(this);
    this.state = {
      location: 'BKK',
      date : [],
      weather : [],
      temperature : [],
    };
    this.loadWeather('BKK', "city");
  }

  loadWeather(city, src){
    API(city, src).then((data) => {
      date = []
      weather = []
      temperature = []
      data.forEach((day) => {
        date.push(day["date"]);
        weather.push(day["weather"]);
        temperature.push(day["temperature"].toFixed(1));
      })
      console.log(date, weather, temperature)
      this.setState({
        date : date,
        weather : weather,
        temperature : temperature
      });
    });
  };

  render (){ 
    return(
      <>
        <View style={{alignItems:"center", backgroundColor:'#3D84A8'}}>
          <Text style={[styles.buttonText,{fontSize:20, marginTop: 10, marginBottom: 10}]}> {this.state.location} </Text>
        </View>
        <View style={{alignItems:"center", justifyContent:"flex-start"}}>
          <Text style={{fontSize:15, marginTop: 20}}>Temperatures in °C During a Week </Text>
        </View>
        <BarChart 
            labels={this.state.temperature} 
            dataY={this.state.temperature} 
            color={'#46CDCF'} 
            height={HEIGHT * .6}
            containerStyles={styles.barChart}
        />
        <View style = {{flexDirection:"row", justifyContent:"space-evenly"}}>
          <Axis ymd={this.state.date[0]} img={this.state.weather[0]} src={"city"}/>
          <Axis ymd={this.state.date[1]} img={this.state.weather[1]} src={"city"}/>
          <Axis ymd={this.state.date[2]} img={this.state.weather[2]} src={"city"}/>
          <Axis ymd={this.state.date[3]} img={this.state.weather[3]} src={"city"}/>
          <Axis ymd={this.state.date[4]} img={this.state.weather[4]} src={"city"}/>
          <Axis ymd={this.state.date[5]} img={this.state.weather[5]} src={"city"}/>
          <Axis ymd={this.state.date[6]} img={this.state.weather[6]} src={"city"}/>
        </View>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-around', padding: 10}}>
            <TouchableHighlight style={styles.button}
              onPress={() => {
                this.setState({location:'BKK'});
                this.loadWeather('BKK', "city");
              }}>
                  <Text style={styles.buttonText}> BKK </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button}
              onPress={() => {
                this.setState({location:'CNX'});
                this.loadWeather('CNX', "city");
              }}>
                  <Text style={styles.buttonText}> CNX </Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.button}
              onPress={() => {
                this.setState({location:'HKT'});
                this.loadWeather('HKT', "city");
              }}>
                  <Text style={styles.buttonText}> HKT </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button}
              onPress={() => {
                this.setState({location:'KKC'});
                this.loadWeather('KKC', "city");
              }}>
                  <Text style={styles.buttonText}> KKC </Text>
              </TouchableHighlight>
        </View>
      </>
    )
  }
}


const styles = StyleSheet.create({
    button: {
        backgroundColor:"#3D84A8",
        width:WIDTH*.2,
        height:25, 
        borderRadius:25,
        alignItems:"center",
        justifyContent:"center",
        
    },
    buttonText: {
        color:"white",
        fontSize:12
    },
    barChart: {
        backgroundColor:"transparent",
        height:HEIGHT*.6,
        width:WIDTH,
        marginTop:20
    }
});

