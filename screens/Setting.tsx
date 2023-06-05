import React, {useState, useEffect} from 'react';
import {StyleSheet, View, StatusBar, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardSetTime from '../components/CardSetTime';
import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import {useNotification} from '../src/hooks/useNotification';
import {Button} from 'react-native-paper';

const Setting = () => {
  const [storedValue, setStoredValue] = useState<any>([]);
  const {
    displayNotification,
    displayTriggerNotification,
    cancelAllNotifications,
  } = useNotification();

  useEffect(() => {
    getStoredValue();
  }, []);

  const setTriggerFromDB = async () => {
    try {
      const storedData = await AsyncStorage.getItem('timeData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const promises = parsedData.map(async (item: any) => {
          if (item.date && typeof item.date === 'string') {
            const parsedDate = new Date(item.date);
            if (!isNaN(parsedDate.getTime())) {
              const notificationTime = parsedDate.getTime() + 3000;
              await AsyncStorage.setItem(
                'notificationTime',
                notificationTime.toString(),
              );
              return displayTriggerNotification(
                'NotificationTitle',
                'NotificationBody',
                notificationTime,
              );
            }
          }
          return Promise.reject(new Error('Invalid date'));
        });

        await Promise.all(promises);
        console.log('All notifications displayed');
      }
    } catch (error) {
      console.log('Error displaying notifications:', error);
    }
  };

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

  const deleteValue = async (item: any) => {
    try {
      const filteredItems = storedValue.filter(
        (storedItem: any) => storedItem.date !== item.date,
      );
      await AsyncStorage.setItem('timeData', JSON.stringify(filteredItems));
      setStoredValue(filteredItems);
      /*
      const index = storedValue.findIndex(
        (storedItem: any) => storedItem.date === date,
      );

      if (index !== -1) {
        const filteredItems = [...storedValue];
        filteredItems.splice(index, 1);

        await AsyncStorage.setItem('timeData', JSON.stringify(filteredItems));
        setStoredValue(filteredItems);
      */
    } catch (error) {
      console.log('Error deleting value:', error);
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
      <ScrollView>
        <View style={styles.buttonContainer}>
          <Button onPress={saveTimeToDB}>"Create Trigger Notification"</Button>
        </View>
        <Button onPress={setTriggerFromDB} mode={'contained'}>
          Test triger noti
        </Button>
        <View style={styles.cardContainer}>
          {storedValue.map((item: any, index: any) => (
            <CardSetTime
              id={index}
              date={item.date}
              switchOn={item.switchOn}
              key={index}
              onDelete={() => deleteValue(item)}
            />
          ))}
        </View>
      </ScrollView>
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
});

export default Setting;
