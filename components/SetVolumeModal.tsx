import {Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
  Dialog,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimateNumber from 'react-native-animate-number';
type Props = {};

const SetVolumeModal = (props: Props) => {
  const [glassSize, setGlassSize] = useState<number>(0);
  console.log(glassSize);

  const getStoredValue = async () => {
    try {
      const value = await AsyncStorage.getItem('glassSize');
      if (value !== null) {
        setGlassSize(JSON.parse(value));
      }
    } catch (error) {
      console.log('Error retrieving stored value:', error);
    }
  };

  useEffect(() => {
    getStoredValue();
  }, []);

  useEffect(() => {
    // Save the glassSize to AsyncStorage whenever it changes
    AsyncStorage.setItem('glassSize', JSON.stringify(glassSize)).catch(
      error => {
        console.log('Error saving glassSize to AsyncStorage:', error);
      },
    );
  }, [glassSize]);
  return (
    <View>
      <View>
        <Text style={{textAlign: 'center', color: 'white'}}>
          current size: {glassSize}
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Pressable
          onPress={() => {
            setGlassSize(100);
          }}>
          <View
            style={{
              flexDirection: 'column',
              padding: 5,
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons
              name={'glass-cocktail'}
              size={50}
              color={'white'}
            />
            <Text style={{color: 'white'}}>100 ml</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            setGlassSize(150);
          }}>
          <View
            style={{
              flexDirection: 'column',
              padding: 5,
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons
              name={'glass-flute'}
              size={50}
              color={'white'}
            />
            <Text style={{color: 'white'}}>150 ml</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            setGlassSize(200);
          }}>
          <View
            style={{
              flexDirection: 'column',
              padding: 5,
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons
              name={'glass-wine'}
              size={50}
              color={'white'}
            />
            <Text style={{color: 'white'}}>200 ml</Text>
          </View>
        </Pressable>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Pressable
          onPress={() => {
            setGlassSize(300);
          }}>
          <View
            style={{
              flexDirection: 'column',
              padding: 5,
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons
              name={'glass-pint-outline'}
              size={50}
              color={'white'}
            />
            <Text style={{color: 'white'}}>300 ml</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            setGlassSize(400);
          }}>
          <View
            style={{
              flexDirection: 'column',
              padding: 5,
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons
              name={'glass-mug'}
              size={50}
              color={'white'}
            />
            <Text style={{color: 'white'}}>400 ml</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default SetVolumeModal;

const styles = StyleSheet.create({});
