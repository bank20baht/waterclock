import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SplashScreen from 'react-native-splash-screen';
import {SCREEN_NAME} from './constants/screensNames';
import Home from './screens/Home';
import Statistics from './screens/Statistics';
import Setting from './screens/Setting';
import SetGoalPage from './screens/SetGoalPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type Props = {};

const TabScreens = (prop: any) => {
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
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={TabScreens}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={SCREEN_NAME.SET_GOAL_PAGE}
          component={SetGoalPage}
          options={{title: 'Goal'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
