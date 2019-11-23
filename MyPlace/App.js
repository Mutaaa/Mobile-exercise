import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import * as Font from 'expo-font';
import { Container, Header, Button, Icon, Fab } from 'native-base';
import { Content, Form, Item, Input } from 'native-base';
import {
    Alert,
    Image,
} from "react-native";
import { Dialog, ProgressDialog, ConfirmDialog } from "react-native-simple-dialogs";
import DialogInput from 'react-native-dialog-input';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      isAlertVisible:false,
    };
  }

  submit(inputText){
    console.log(inputText);
    this.setState({isAlertVisible:false})
  }


  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle} />

        <Fab
            active={this.state.active}
            direction="up"
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={ () => this.setState({isAlertVisible:true}) }>
            <Icon name="share" />
            
          </Fab>

          <DialogInput isDialogVisible={this.state.isAlertVisible}
                     title={"Add a new MyPlace"}
                     message={"City"}
                     hintInput ={"enter city name"}
                     submitInput={ (inputText) => {this.submit(inputText)} }
                     closeDialog={ () =>this.setState({isAlertVisible:false})}
                     submitText={"Save"}>
          </DialogInput>

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
