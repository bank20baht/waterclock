import React, {useState, useEffect, useRef} from 'react';
import {StatusBar, View} from 'react-native';
import {TextInput, Text, Card, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CircularProgress, {
  ProgressRef,
} from 'react-native-circular-progress-indicator';
import AnimateNumber from 'react-native-animate-number';
const SetGoalPage = () => {
  const [weight, setWeight] = useState('0');
  const [goal, setGoal] = useState<number>(0);

  const calculateWaterVolume = () => {
    let result = (parseFloat(weight) * 2.2 * 30) / 2;
    setGoal(Math.floor(result));
  };

  useEffect(() => {
    const getStoredValue = async () => {
      try {
        const value = await AsyncStorage.getItem('goal');
        if (value !== null) {
          setGoal(parseInt(value));
        }
      } catch (error) {
        console.log('Error retrieving stored value:', error);
      }
    };

    getStoredValue();
  }, []);

  useEffect(() => {
    const saveGoalToStorage = async () => {
      try {
        await AsyncStorage.setItem('goal', goal.toString());
      } catch (error) {
        console.log('Error saving goal to AsyncStorage:', error);
      }
    };

    saveGoalToStorage();
  }, [goal]);

  const handleWeightChange = (text: string) => {
    setWeight(text);
  };

  return (
    <View style={{backgroundColor: '#1e1e1e', flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="#0085ff" />
      <Card style={{margin: 5, backgroundColor: '#2d2d2d'}}>
        <Text
          variant={'headlineSmall'}
          style={{textAlign: 'center', color: 'white'}}>
          กรอกน้ำหนักของคุณ
        </Text>
        <TextInput
          label="Weight"
          value={weight}
          onChangeText={handleWeightChange}
          onEndEditing={calculateWaterVolume}
        />
        <Text
          variant={'headlineSmall'}
          style={{textAlign: 'center', color: 'white'}}>
          ปริมาณที่เเนะนำ
        </Text>
        <Text
          variant={'headlineLarge'}
          style={{textAlign: 'center', color: 'white'}}>
          {goal} ml.
        </Text>
      </Card>
    </View>
  );
};

export default SetGoalPage;
