import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Keyboard, Image } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';

class Banner extends React.Component {
  render() {
    return (
      <View style={styles.banner}>
        <Text style={styles.bannerText}>WeatherApp</Text>
      </View>
    );
  }
}

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
        latitude: 0,
        longitude: 0,
        forecast: [],
        error:'',
        temperature: 0,
        api: '4d550e19e4b48cf4c90bc7a819dd6aec'
    };
  } 

  componentDidMount(){
		// Get the user's location
    this.getLocation();
    this.getWeather()
  }

  getLocation(){
    Geolocation.getCurrentPosition(
    (position) => {
        this.setState(
        (prevState) => ({
            latitude: position.coords.latitude, 
            longitude: position.coords.longitude
            }), () => { this.getWeather(); }
        );
    },
        (error) => this.setState({ forecast: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  getWeather(){
    let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&units=metric&appid=' + this.state.api;
    //console.log(this.state.latitude)
    //console.log(this.state.longitude)
    //console.log("test")
    fetch(url)
    .then(response => response.json())
    .then(data => {
        this.setState((prevState, props) => ({
            forecast: data
            //temperature: temp
    }));
    })
  }


  render(){
    //console.log("hello")
    //console.log(this.state.longitude)
    
    return (
      <View style={styles.container}>
        <Banner />
        
        <Text h1>{this.state.latitude}</Text>
        <Text h1>{this.state.longitude}</Text>
        <Text h1>{this.state.temperature}</Text>
        <Text h1>asfdsfs</Text>
        

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    margin: 5
  },
  banner: {
    backgroundColor: 'cadetblue',
    justifyContent: 'center',
    marginBottom: 20
  },
  bannerText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20
  }

});
