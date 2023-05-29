import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {SCREEN_NAME} from './constants/screensNames';
import Home from './screens/Home';
import Statistics from './screens/Statistics';
import Setting from './screens/Setting';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type Props = {};

const TabScreens = () => {
  return (
    <Tab.Navigator initialRouteName={SCREEN_NAME.HOME_PAGE}>
      <Tab.Screen
        name={SCREEN_NAME.HOME_PAGE}
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: () => {
            return <AntDesign name="home" size={20} />;
          },
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.STAT_PAGE}
        component={Statistics}
        options={{
          title: 'Statistics',
          tabBarIcon: () => {
            return <AntDesign name="areachart" size={20} />;
          },
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.SETTING_PAGE}
        component={Setting}
        options={{
          title: 'Setting',
          tabBarIcon: () => {
            return <AntDesign name="tool" size={20} />;
          },
        }}
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
