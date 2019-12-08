import React from 'react';
import { Text, View, Image } from 'react-native';
import { parseString } from "react-native-xml2js";
import YouTube from 'react-native-youtube';

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
    this.state = { 
      synopsis: '',
      videoId: '',
      videoId2: '',
      videoTitle: ''
    };
  }  

  // load synopsis, note it is in different XML in finnkino
  async loadSynopsis() {
    const { navigation } = this.props;
    const show = navigation.getParam('show', null);  

    console.log(show.EventID[0]);
    let response = await fetch('https://www.finnkino.fi/xml/Events/?eventId='+show.EventID[0]);
    let data = await response.text();
    parseString(data, function (err, result) {
      this.setState( {
        synopsis: result.Events.Event[0].ShortSynopsis,
        titleVideo: result.Events.Event[0].Title,
      }
       );
    }.bind(this));
  }

  async playVideo(title) {
    let url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=" + title +  "+trailer" + "&key=AIzaSyALAZgW1Kl2iYZ4qsd2nl1Mvl66q-OHNU0";
    let response = await fetch(url);
    let data = JSON.parse(await response.text());
    await this.setState({videoId: data.items[0].id.videoId}, null);
  }

  // start loading synopsis when component is mounted
  componentDidMount(){
    this.loadSynopsis();
    this.playVideo(this.state.titleVideo);
  }

  // render movie details
  render() {
    const { navigation } = this.props;
    const show = navigation.getParam('show', null);  
    let imageurl = show.Images[0].EventSmallImageLandscape[0];
    this.state.titleVideo = show.Title
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
          <YouTube
            videoId={this.state.videoId} // The YouTube video ID
            play // control playback of video with true/false
            fullscreen // control whether the video should play in fullscreen or inline
            loop // control whether the video should loop when ended
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onError={e => this.setState({ error: e.error })}
            style={{ alignSelf: 'stretch', height: 300 }}
          />
          
        </View>
    )
  }
}