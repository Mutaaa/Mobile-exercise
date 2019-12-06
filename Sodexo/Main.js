import React from 'react';
import { StyleSheet, View , ScrollView} from 'react-native';
import * as Font from 'expo-font';

import { Ionicons } from '@expo/vector-icons';
import { 
    Body, 
    Container, 
    Header, 
    Content, 
    Icon, 
    Picker, 
    Form, 
    Title, 
    Grid, 
    Col, 
    Row, 
    Text, 
    Card, 
    CardItem, 
    Spinner
} from "native-base";
import axios from "axios";

export default class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            courseData: []
        }
    }

    async componentDidMount(){
        await Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        });
        await this.getSodexo();
    }

    getSodexo = async (course) => {
        let res = await axios.get("https://www.sodexo.fi/ruokalistat/output/daily_json/127/2019-12-05");
        this.setState({ courseData: res.data.courses});
        //console.log(this.state.courseData[1].price);
        console.log(this.state.courseData);
    };


    render(){
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Sodexo</Title>
                    </Body>
                </Header>
                <Content>
                <Text>Test</Text>
                
                </Content>
            </Container>
        ); 
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    eagle: {
        backgroundColor: 'yellow',
        color: 'black',
        textAlign: 'center',
        margin: 2
    },
    birdie: {
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        margin: 2
    },
    par: {
        backgroundColor: 'green',
        color: 'white',
        textAlign: 'center',
        margin: 2
    },
    bogey: {
        backgroundColor: 'blue',
        color: 'white',
        textAlign: 'center',
        margin: 2
    },
    doublebogey: {
        backgroundColor: 'darkblue',
        color: 'white',
        textAlign: 'center',
        margin: 2
    },
    textCenter: {
        textAlign: 'center'
    },
    row: {
        marginBottom: 10
    },
    text: {
        fontSize: 11
    },
    holeHeaderText: {
        backgroundColor: 'lightgray'
    },
    frontBackText: {
        fontSize: 11,
        fontWeight: 'bold'
    }
  });
