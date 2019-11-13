import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Keyboard, Image } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { FlatList } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import ForecastCard from './ForecastCard';

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
        api: 'd4692d288ad0d9a49f54f14283640a1d'
    };
  } 

  componentDidMount(){
		// Get the user's location
    this.getLocation();
    //this.getWeather()
    
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
    }));
    })
    console.log(this.state.latitude)
    console.log(this.state.longitude)
  }


  render(){
    //console.log("hello")
    //console.log(this.state.longitude)

    
    return (
      <View style={styles.container}>
        
        <FlatList data={this.state.forecast.list} style={{marginTop:20, background: 'white'}} keyExtractor={item => item.dt_text} renderItem={({item}) => <ForecastCard detail={item} location={this.state.forecast.city.name} />} />

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
