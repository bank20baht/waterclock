import React, {useEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Dialog, PaperProvider, Portal, Text} from 'react-native-paper';
import CardTime from '../components/CardTime';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import {openDatabase, createTable} from '../utils/db';
import CardCapacity from '../components/CardCapacity';
import {SCREEN_NAME} from '../constants/screensNames';
import SetVolumeModal from '../components/SetVolumeModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const db = openDatabase();
createTable(db); // create table in first time

const Home = ({navigation}: any, props: any) => {
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const setGoalPage = () => {
    navigation.navigate(SCREEN_NAME.SET_GOAL_PAGE);
  };

  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [status, setStatus] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [items, setItems] = useState<any>([]);
  const [goal, setGoal] = useState<number>(1500);
  const maxAmount = goal;
  const [visible, setVisible] = React.useState(false);
  const [glassSize, setGlassSize] = useState(0);

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    getStoredValueGlassSize();
  };

  const handleDrinkPress = async () => {
    // Get the updated amount after incrementing
    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const newAmount_display = glassSize + amount;
    try {
      await new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
          tx.executeSql(
            `INSERT INTO watertrack (amount, date, status, time) VALUES (?,?,?,?)`,
            [glassSize, currentDate, status, currentTime],
            (_: any, result: any) => {
              console.log('Data inserted successfully');
              setAmount(newAmount_display); // Update the amount state with the new amount
              resolve(result);
            },
            (error: any) => {
              console.error('Failed to insert data: ', error);
              reject(error);
            },
          );
        });
      });
    } catch (error) {
      console.error('Failed to insert data: ', error);
    }
  };

  const fetchData = async () => {
    try {
      await new Promise<void>((resolve, reject) => {
        db.transaction((tx: any) => {
          tx.executeSql(
            `SELECT SUM(amount) as sumdaily FROM watertrack WHERE date = ? ORDER BY id DESC LIMIT 1`,
            [currentDate],
            (_: any, {rows}: any) => {
              console.log('Data received (SUM amount) successfully');
              if (rows.length > 0) {
                setAmount(rows.raw()[0].sumdaily); // Access the sumdaily value
              } else {
                setAmount(0);
              }

              resolve();
            },
            (error: any) => {
              console.error('Failed to retrieve data: ', error);
              reject(error);
            },
          );
        });
      });

      await new Promise<void>((resolve, reject) => {
        db.transaction((tx: any) => {
          tx.executeSql(
            `SELECT id, amount, time FROM watertrack WHERE date = ? ORDER BY id DESC`,
            [currentDate],
            (_: any, {rows}: any) => {
              setItems(rows.raw());
              resolve();
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
  const getStoredValueGlassSize = async () => {
    try {
      const value = await AsyncStorage.getItem('glassSize');
      if (value !== null) {
        setGlassSize(JSON.parse(value));
      }
    } catch (error) {
      console.log('Error retrieving stored value:', error);
    }
  };
  const getStoredGoalValue = async () => {
    try {
      const value = await AsyncStorage.getItem('goal');
      if (value !== null) {
        setGoal(parseInt(value));
      }
    } catch (error) {
      console.log('Error retrieving stored value:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getStoredValueGlassSize();
      getStoredGoalValue();
    }, [glassSize, goal]),
  );

  useEffect(() => {
    console.log(`Amount changed: ${amount}`);
    fetchData();
  }, [amount]);

  const percentFilled = (amount / maxAmount) * 100;

  const handleDelete = async (id: number) => {
    try {
      await new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
          tx.executeSql(
            `DELETE FROM watertrack WHERE id = ?`,
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

  return (
    <PaperProvider>
      <>
        <StatusBar barStyle="light-content" backgroundColor="#0085ff" />
        <View style={styles.container}>
          <Pressable onPress={setGoalPage}>
            <CardCapacity currentAmount={amount || 0} goalAmount={maxAmount} />
          </Pressable>
          <ScrollView>
            <View style={styles.center}>
              <Pressable onPress={handleDrinkPress}>
                <Button>Click this to increases amount (temporary)</Button>
              </Pressable>
              <View style={{margin: 5}}>
                <Button onPress={showDialog} mode={'contained'}>
                  {glassSize} ml.
                </Button>
              </View>
            </View>
            {items.length > 0 ? (
              items.map((item: any, index: number) => (
                <CardTime
                  key={item.id}
                  value={item}
                  onDelete={handleDelete} // Pass the handleDelete function
                />
              ))
            ) : (
              <Text>Hello</Text>
            )}
          </ScrollView>
        </View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Glass Size</Dialog.Title>
            <Dialog.Content>
              <SetVolumeModal />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </>
    </PaperProvider>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1e1e1e',
  },
  center: {
    alignItems: 'center',
  },
  circleText: {
    fontSize: 18,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
  },
});
