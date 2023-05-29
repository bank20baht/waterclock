import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Home from './screens/Home';
import Statistics from './screens/Statistics';
import Setting from './screens/Setting';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type Props = {};

const TabScreens = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{title: 'Home'}} />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{title: 'Statistics'}}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{title: 'Setting'}}
      />
    </Tab.Navigator>
  );
};

const App = (props: Props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={TabScreens}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
