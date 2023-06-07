import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardSetTime from '../components/CardSetTime';
import {Button, Text} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {openDatabase} from '../utils/db';
import {useNotification} from '../src/hooks/useNotification';
import AntDesign from 'react-native-vector-icons/AntDesign';

const db = openDatabase();

const Setting = () => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [timeAlert, setTimeAlert] = useState([]);

  const {
    displayNotification,
    displayTriggerNotification,
    cancelAllNotifications,
  } = useNotification();

  const formatTime = (date: Date) => {
    const formatted = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return formatted;
  };

  const handleTimeChange = (event: any, selected: any) => {
    if (selected) {
      setSelectedTime(selected);
    }
    setShowTimePicker(false);
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateTriggerNotification = (date: Date) => {
    const currentTime = Date.now(); // Get the current timestamp
    const triggerTime = date.getTime(); // Get the timestamp of the selected date

    let notificationTime;

    if (currentTime > triggerTime) {
      // If triggerTime is in the past, add 1 day to the selected date
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      const futureDate = new Date(triggerTime + oneDayInMilliseconds);
      notificationTime = futureDate.getTime();
    } else {
      // Use the original triggerTime
      notificationTime = triggerTime;
    }
    // Display notification in 3 seconds
    displayTriggerNotification(
      'NotificationTitle',
      'NotificationBody',
      notificationTime + 3000,
    );
  };

  const handleDeleteTimeAlert = async (id: number) => {
    try {
      await new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
          tx.executeSql(
            'DELETE FROM timesetalert WHERE id = ?',
            [id],
            (_: any, result: any) => {
              console.log('Data deleted successfully');
              resolve(result);
            },
            (error: any) => {
              console.error('Failed to delete data: ', error);
              reject(error);
            },
          );
        });
      });
      fetchData();
    } catch (error) {
      console.error('Failed to delete data: ', error);
    }
  };

  const handlerAddTimeAlert = async () => {
    try {
      await new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
          tx.executeSql(
            'INSERT INTO timesetalert (date, time) VALUES (?,?)',
            [selectedTime.toISOString(), formatTime(selectedTime)],
            (_: any, result: any) => {
              console.log('Data inserted successfully');
              resolve(result);
            },
            (error: any) => {
              console.error('Failed to insert data: ', error);
              reject(error);
            },
          );
        });
      });
      handleCreateTriggerNotification(selectedTime);
      fetchData();
    } catch (error) {
      console.error('Failed to insert data: ', error);
    }
  };

  const fetchData = async () => {
    try {
      await new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
          tx.executeSql(
            'SELECT id, date, time FROM timesetalert ORDER BY id DESC',
            [],
            (_: any, {rows}: any) => {
              setTimeAlert(rows.raw());
            },
            (error: any) => {
              console.error('Failed to retrieve data: ', error);
              reject(error);
            },
          );
        });
      });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0085ff" />
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          display={'clock'}
          value={selectedTime}
          onChange={handleTimeChange}
        />
      )}
      <View
        style={{
          flex: 0.3,
          margin: 5,
          borderColor: '#0085ff',
          borderWidth: 2,
          alignItems: 'center',
        }}>
        <Pressable onPress={showTimePickerModal}>
          <Text variant={'displayLarge'} style={styles.selectedTimeText}>
            {formatTime(selectedTime)}
          </Text>
        </Pressable>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Button mode={'contained'} onPress={cancelAllNotifications}>
            Cancel All Notifications
          </Button>
          <Button
            mode={'contained'}
            onPress={handlerAddTimeAlert}
            style={{marginLeft: 5}}>
            Create Time Alert
          </Button>
        </View>
      </View>
      <ScrollView>
        <View style={styles.cardContainer}>
          {timeAlert.map((item: any) => (
            <CardSetTime
              value={item}
              key={item.id}
              onDelete={handleDeleteTimeAlert}
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
  selectedTimeText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Setting;
