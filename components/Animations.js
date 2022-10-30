import { Component } from 'react';

import Lottie from 'lottie-react-native';

export default class Animations extends Component {
    renderSwitch(animation) {
    switch (animation) {
                    case "./animations/cloudy.json": return <Lottie source={require("./animations/cloudy.json")} autoPlay loop/>;
                    case "./animations/rainy.json": return <Lottie source={require("./animations/rainy.json")} autoPlay loop/>;
                    case "./animations/sunny.json": return <Lottie source={require("./animations/sunny.json")} autoPlay loop/>;
                    case "./animations/windy.json": return <Lottie source={require("./animations/windy.json")} autoPlay loop/>;
                  }
    }
   render() {
     let animation = this.props.weather || '';
      return (
        <>
        {this.renderSwitch(animation)}
        </>
      );
    }
} 

