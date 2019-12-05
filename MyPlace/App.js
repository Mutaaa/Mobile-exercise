import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Marker } from 'react-native-maps';
import * as Font from 'expo-font';
import { Container, Header, Button, Icon, Fab } from 'native-base';
import { Content, Form, Item, Input } from 'native-base';
import {
    Alert,
    Image,
} from "react-native";
import { Dialog, ProgressDialog, ConfirmDialog } from "react-native-simple-dialogs";
import Geocoder from 'react-native-geocoder';
import { TextInput } from 'react-native-paper';
import { AsyncStorage } from 'react-native';

export default class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      dialogVisible:false,
      citydata: '',
      textdata: '',
      lat: '',
      lng: '',
      location: []
    };
  }
  

  saveValueFunction = () => {
    //function to save the value in AsyncStorage
    if (this.state.citydata && this.state.textdata) {
      //To check the input not empty

      //console.log(this.state.citydata);

      // Construct the API url to call
      let url = 'https://nominatim.openstreetmap.org/search?city='+this.state.citydata+'&format=json';

      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        //console.log(responseJson[0].lat);
        this.setState({
          lat: responseJson[0].lat,
          lng: responseJson[0].lon
        }, function(){

        });
        //console.log(this.state.lng)
      })
      .catch((error) =>{
        console.error(error);
      });    

      console.log(this.state.location)
      //AsyncStorage.setItem(this.state.textdata, );
      //Setting a data to a AsyncStorage with respect to a key

      this.setState({ citydata: '' });
      this.setState({ textdata: '' });
      //Resetting the TextInput
      alert('Data Saved');


      AsyncStorage.getAllKeys().then((keys) => {
        return AsyncStorage.multiGet(keys)
          .then((result) => {
            console.log(result);
            //this.state.citylist = result
            //console.log(this.state.citylist);

            
          }).catch((e) =>{
            console.log(e);
          });
      });

    } else {
      alert('Please fill data');
      //alert for the empty InputText
    }
  };
  
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle} >
        <MapView.Marker
          coordinate={{latitude: 37.73538,
              longitude: -122.4324,}}
          title={"marker.title"}
          description={"desss"}
        />
        </MapView>

        <Fab
            active={this.state.active}
            direction="up"
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={ () => this.setState({dialogVisible:true}) }>
            <Icon name="share" />
            
          </Fab>

          <Dialog
            visible={this.state.dialogVisible}
            title="Add a new my place"
            onTouchOutside={() => this.setState({dialogVisible: false})} >
            <View>
              <TextInput
                label='City'
                value={this.state.citydata}
                onChangeText={data => this.setState({ citydata:data })}
              />
              <TextInput
                label='Text'
                value={this.state.textdata}
                onChangeText={data => this.setState({ textdata:data })}
              />

              <Text> </Text>

              <Button full light 
                onPress={this.saveValueFunction}>
                <Text>Save</Text>
              </Button>

              <Text> </Text>

              <Button full light
                onPress={() => this.setState({dialogVisible: false})}>
                <Text>Cancel</Text>
              </Button>
            </View>
        </Dialog>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').height),
  },
});
