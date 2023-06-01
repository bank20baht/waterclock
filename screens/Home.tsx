import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import CardTime from '../components/CardTime';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import {openDatabase, createTable} from '../utils/db';

const db = openDatabase();
createTable(db); // create table in first time

const Home = (props: any) => {
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [status, setStatus] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [items, setItems] = useState<any>([]);
  const maxAmount = 3000;

  const handleDrinkPress = async () => {
    const newAmount = 300; // Get the updated amount after incrementing
    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    try {
      await new Promise((resolve, reject) => {
        db.transaction((tx: any) => {
          tx.executeSql(
            `INSERT INTO watertrack (amount, date, status, time) VALUES (?,?,?,?)`,
            [newAmount, currentDate, status, currentTime],
            (_: any, result: any) => {
              console.log('Data inserted successfully');
              setAmount(newAmount); // Update the amount state with the new amount
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

  const resetButton = () => {
    db.transaction((tx: any) => {
      tx.executeSql(
        `DELETE FROM watertrack WHERE date = ?`,
        [currentDate],
        (_: any, result: any) => {
          console.log('Data deleted successfully');
          setAmount(0); // Update the amount state to 0
        },
        (error: any) => {
          console.error('Failed to delete data: ', error);
        },
      );
    });
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

  useEffect(() => {
    console.log(`Amount changed: ${amount}`);
    fetchData();
  }, [amount]);

  const percentFilled = (amount / maxAmount) * 100;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.center}>
          <Pressable onPress={handleDrinkPress}>
            <AnimatedProgressWheel
              progress={percentFilled}
              animateFromValue={0}
              duration={2000}
              color={'#69b4ff'}
              fullColor={'#0085ff'}
              backgroundColor={'white'}
            />
          </Pressable>
          <Button mode={'contained'} onPress={resetButton}>
            RESET
          </Button>
        </View>
        {items.length > 0 ? (
          items.map((item: any, index: number) => (
            <CardTime key={item.id} value={item} />
          ))
        ) : (
          <Text>Hello</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  center: {
    alignItems: 'center',
  },
  circleText: {
    fontSize: 18,
  },
});
