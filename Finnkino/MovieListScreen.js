import React, { Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Text,
    StatusBar,
    View,
    Image,
    TouchableHighlight,
    Alert,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import { parseString } from "react-native-xml2js";

class ShowsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { shows: null };
    }
    componentDidMount() {
        this.getShows();
    }

    itemPressed = (index) => {
        this.props.navigation.navigate('MovieDetail',
            { show: this.state.shows.Show[index] }
        );
    }

    render() {
        if (this.state.shows == null) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <Text>Loading, please wait...</Text>
                </View>
            )
        }

        var items = this.state.shows.Show.map(function (show, index) {
            return (
                <TouchableHighlight onPress={_ => this.itemPressed(index)}
                    underlayColor="lightgray" key={index}>
                    <ShowListItem show={show} />
                </TouchableHighlight>
            )
        }.bind(this));

        return (
            <ScrollView>
                {items}
            </ScrollView>
        );
    }

    async getShows() {
        // REMEMBER change current date here, or you will get errors!
        let response = await fetch('https://www.finnkino.fi/xml/Schedule/?area=1015&dt=12.11.2019');
        let data = await response.text();
        parseString(data, function (err, result) {
            this.setState({ shows: result.Schedule.Shows[0] });
        }.bind(this));
    }


}

class ShowListItem extends React.Component {
    render() {
        let imageurl = this.props.show.Images[0].EventSmallImagePortrait[0];
        return (
            <View style={styles.showItem}>
                <View style={styles.showItemImage}>
                    <Image source={{ uri: imageurl }} style={{ width: 99, height: 146 }} />
                </View>
                <View style={styles.showItemTexts}>
                    <Text style={styles.showItemTitle}>{this.props.show.Title}</Text>
                    <Text style={styles.showItemText}>Length: {this.props.show.LengthInMinutes} mins</Text>
                    <Text style={styles.showItemText}>Theatre: {this.props.show.TheatreAndAuditorium}</Text>
                    <Text style={styles.showItemText}>PresentationMethod: {this.props.show.PresentationMethod}</Text>
                    <Text style={styles.showItemText}>Rating: {this.props.show.Rating}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ flex: 1, flexWrap: 'wrap' }}>Genres: {this.props.show.Genres}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default class MovieListScreen extends React.Component {
    render() {
        return (
            <Fragment>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <ShowsList navigation={this.props.navigation} />
                </SafeAreaView>
            </Fragment>
        );
    }

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {
            title: `MovieList`,
        };
    };

};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    showItem: {
        margin: 5,
        flex: 1,
        flexDirection: 'row'
    },
    showItemImage: {
        marginRight: 5
    },
    showItemTitle: {
        fontWeight: 'bold',
    },
    showItemText: {
        flexWrap: 'wrap'
    }
});