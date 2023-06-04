import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardSetTime from '../components/CardSetTime';

const Setting = () => {
  const [storedValue, setStoredValue] = useState<any>([]);

  useEffect(() => {
    getStoredValue();
  }, []);

  const getStoredValue = async () => {
    try {
      const value = await AsyncStorage.getItem('timeData');
      if (value !== null) {
        setStoredValue(JSON.parse(value));
      }
    } catch (error) {
      console.log('Error retrieving stored value:', error);
    }
  };

  const saveTimeToDB = async () => {
    try {
      const currentDate = new Date();
      const storedTime = await AsyncStorage.getItem('timeData');

      if (storedTime) {
        const parsedData = JSON.parse(storedTime);
        const updatedData = [
          ...parsedData,
          {date: currentDate, switchOn: false},
        ];
        await AsyncStorage.setItem('timeData', JSON.stringify(updatedData));
        setStoredValue(updatedData);
      } else {
        const initialData = [{date: currentDate, switchOn: false}];
        await AsyncStorage.setItem('timeData', JSON.stringify(initialData));
        setStoredValue(initialData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0085ff" />
      <View style={styles.buttonContainer}>
        <Button mode={'contained'} onPress={saveTimeToDB}>
          Add
        </Button>
      </View>
      <View style={styles.cardContainer}>
        {storedValue.map((item: any, index: any) => (
          <CardSetTime date={item.date} switchOn={item.switchOn} key={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  buttonContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  cardContainer: {
    marginVertical: 5,
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  timeText: {
    color: 'black',
  },
});

export default Setting;
