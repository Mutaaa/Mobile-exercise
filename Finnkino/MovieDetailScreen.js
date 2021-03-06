import React from 'react';
import { Text, View, Image } from 'react-native';
import { parseString } from "react-native-xml2js";

export default class MovieDetailScreen extends React.Component {

  // set screen title
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Movie Details`,
    };
  };

  // set synopsis state empty, we will load synopsis later
  constructor(props) {
    super(props);
    this.state = { synopsis: '' };
  }  

  // load synopsis, note it is in different XML in finnkino
  async loadSynopsis() {
    const { navigation } = this.props;
    const show = navigation.getParam('show', null);  

    console.log(show.EventID[0]);
    let response = await fetch('https://www.finnkino.fi/xml/Events/?eventId='+show.EventID[0]);
    let data = await response.text();
    parseString(data, function (err, result) {
      this.setState( {synopsis: result.Events.Event[0].ShortSynopsis} );
    }.bind(this));
  }

  // start loading synopsis when component is mounted
  componentDidMount(){
    this.loadSynopsis();
  }

  // render movie details
  render() {
    const { navigation } = this.props;
    const show = navigation.getParam('show', null);  
    let imageurl = show.Images[0].EventSmallImageLandscape[0];
    return (
        <View>
          <Image source={{uri: imageurl}} style={{ aspectRatio: 670 / 250 }}  />
          <Text>{show.Title}</Text>
          <Text>Length: {show.LengthInMinutes} mins</Text>
          <Text>Theatre: {show.TheatreAndAuditorium}</Text>
          <Text>PresentationMethod: {show.PresentationMethod}</Text>
          <Text>Rating: {show.Rating}</Text>
          <View style={{flexDirection:'row'}}>
            <Text style={{flex: 1, flexWrap: 'wrap'}}>Genres: {show.Genres}</Text>
          </View>
          <Text>Synopsis: {this.state.synopsis}</Text>
        </View>
    )
  }
}