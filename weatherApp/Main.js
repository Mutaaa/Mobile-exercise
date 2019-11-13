import React from 'react';
import { StyleSheet, View , ScrollView} from 'react-native';
import { Font } from 'expo';
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
            loadingCourses: true, 
            loadingScores: false, 
            courses: [], 
            scores: [], 
            selectedCourseIndex: 0
        }
    }

    async componentDidMount(){
        await Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        });
        await this.getCourses();
        await this.getScores(this.state.courses[this.state.selectedCourseIndex].shortname);
        this.setState({loadingScores: false});
      }

      getCourses = async () => {
        let res = await axios.get("https://student.labranet.jamk.fi/~mapas/data/react_native_golf_courses.json");
        this.setState({ courses: res.data.courses, loadingCourses: false, loadingScores: true });
        };

        getScores = async (course) => {
            let res = await axios.get("https://student.labranet.jamk.fi/~mapas/data/react_native_golf_scores_"+course+".json");
            this.setState({ scores: res.data.reverse(), loadingScores: false });
        };

        onValueChange(value) {
            this.setState({
                selectedCourseIndex: value, loadingScores: true
            });
            this.getScores(this.state.courses[value].shortname);
        }
    }