import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {TextInput, Text, Card} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SetGoalPage = () => {
  const [weight, setWeight] = useState('0');
  const [goal, setGoal] = useState<number>(0);
  console.log(weight);

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
    <View>
      <Card style={{margin: 5}}>
        <Text variant={'headlineSmall'} style={{textAlign: 'center'}}>
          กรอกน้ำหนักของคุณ
        </Text>
        <TextInput
          label="Weight"
          value={weight}
          onChangeText={handleWeightChange}
          onEndEditing={calculateWaterVolume}
        />
        <Text variant={'headlineSmall'} style={{textAlign: 'center'}}>
          ปริมาณที่เเนะนำ
        </Text>
        <Text variant={'headlineLarge'} style={{textAlign: 'center'}}>
          {goal} ml.
        </Text>
      </Card>
    </View>
  );
};

export default SetGoalPage;
