import React from 'react';
import { useColorScheme, Appearance } from 'react-native';
import Navigation from './Navigation';

const App = () => {
  const colorScheme = useColorScheme() || Appearance.getColorScheme();
  return <Navigation />;

};

export default App;
