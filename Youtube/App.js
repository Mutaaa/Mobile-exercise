// App.js
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MovieListScreen from './MovieListScreen';
import MovieDetailScreen from './MovieDetailScreen';

const MainNavigator = createStackNavigator({
  MovieList: {
    screen: MovieListScreen
  },
  MovieDetail: {
    screen: MovieDetailScreen
  }
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}