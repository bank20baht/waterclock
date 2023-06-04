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
import {useTheme} from '@react-navigation/native';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type Props = {};
const TabScreens = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Statistics') {
            iconName = 'areachart';
          } else if (route.name === 'Setting') {
            iconName = 'tool';
          }
          if (!iconName) {
            return null; // or provide a fallback icon or handle the error accordingly
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#e0ffff', // Change the active tab color
        tabBarInactiveTintColor: 'black', // Change the inactive tab color
        tabBarStyle: {
          backgroundColor: '#0085ff', // Change the background color of the tab bar
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerTitleStyle: {
            color: '#e0ffff',
          },
          headerStyle: {
            backgroundColor: '#0085ff',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          title: 'Statistics',
          headerTitleStyle: {
            color: '#e0ffff',
          },
          headerStyle: {
            backgroundColor: '#0085ff',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          title: 'Setting',
          headerTitleStyle: {
            color: '#e0ffff',
          },
          headerStyle: {
            backgroundColor: '#0085ff',
          },
          headerTitleAlign: 'center',
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
          options={{
            title: 'Goal',
            headerTitleStyle: {
              color: '#6EC3FF',
            },
            headerStyle: {
              backgroundColor: '#0085ff',
            },
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
