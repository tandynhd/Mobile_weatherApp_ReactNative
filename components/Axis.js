import { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import Animations from "./Animations";

export default class Axis extends Component {
   render() {
     
    let md = this.props.ymd
    let anim = this.props.img || '';
    let animation = "./animations/sunny.json";
    if (anim != undefined && anim != null && anim != ""){
      animation = "./animations/" + anim + ".json" || '';
    }
    if(this.props.src == "city"){
      md = this.props.ymd || ''
      md = md.substring(5,10)
    } else {
      md = this.props.ymd
    }
      return (
        <View style = {{flexDirection:"row", justifyContent:"space-evenly"}} >
          <View>
            <Text style={{height: 20}}>{md}</Text>
            <Text style={{height: 50}}> </Text>
            <Animations weather={animation} />
          </View>
        </View>
      );
    }
}
