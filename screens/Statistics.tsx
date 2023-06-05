import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {openDatabase} from '../utils/db';
import {BarChart} from 'react-native-chart-kit';
import {Card, Text} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';

const db = openDatabase();

type Props = {};

type Data = {
  date: Date;
  sumdaily: number;
};

const Statistics = (props: Props) => {
  const [data, setData] = useState<Data[]>([]);
  const [avgDrinkWeek, setAvgDrinkWeek] = useState<number>(0);
  const [avgFreqDrink, setAvgFreqDrink] = useState<number>(0);
  const fetchData = async () => {
    try {
      await new Promise<void>((resolve, reject) => {
        db.transaction((tx: any) => {
          const currentDate = new Date();
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(currentDate.getDate() - 7);

          tx.executeSql(
            `SELECT date, SUM(amount) as sumdaily FROM watertrack GROUP BY date ORDER BY date ASC LIMIT 7`,
            [],
            (_: any, {rows}: any) => {
              console.log('Data received (SUM amount) successfully');
              if (rows.length > 0) {
                setData(rows.raw());
              } else {
                setData([]);
              }
              resolve();
            },
            (error: any) => {
              console.error('Failed to retrieve data: ', error);
              reject(error);
            },
          );
          tx.executeSql(
            `SELECT AVG(sumdaily) as avgweek FROM (SELECT SUM(amount) as sumdaily FROM watertrack GROUP BY date ORDER BY date DESC LIMIT 7)`,
            [],
            (_: any, {rows}: any) => {
              console.log('Data received (AVG amount) successfully');
              if (rows.length > 0) {
                setAvgDrinkWeek(rows.item(0).avgweek);
              } else {
                setAvgDrinkWeek(0);
              }
              resolve();
            },
            (error: any) => {
              console.error('Failed to retrieve data: ', error);
              reject(error);
            },
          );

          tx.executeSql(
            `SELECT AVG(freqweek) as freqweek FROM (SELECT date, COUNT(amount) as freqweek FROM watertrack WHERE date >= ? GROUP BY date ORDER BY date DESC LIMIT 7)`,
            [sevenDaysAgo.toISOString()],
            (_: any, {rows}: any) => {
              console.log('Data received (Average Frequency) successfully');
              if (rows.length > 0) {
                setAvgFreqDrink(rows.item(0).freqweek);
              } else {
                setAvgFreqDrink(0);
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
    } catch (error) {
      console.error('Failed to retrieve data: ', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  const screenWidth = Dimensions.get('window').width;

  const chartConfig = {
    backgroundGradientFrom: '#0085ff',
    backgroundGradientTo: '#0085ff',

    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.4,
    yAxisLabel: '',
    yAxisSuffix: '',
    style: {
      borderRadius: 16,
    },
  };

  const chartData = {
    labels: data.map(item => {
      const weekday = new Date(item.date).toLocaleDateString('en-US', {
        weekday: 'short',
      });
      return weekday.slice(0, weekday.indexOf(','));
    }),
    datasets: [
      {
        data: data.map(item => item.sumdaily),
      },
    ],
  };

  return (
    <View style={{backgroundColor: '#1e1e1e', flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="#0085ff" />
      <View style={{backgroundColor: '#363636'}}>
        <Text style={{color: 'white', textAlign: 'center'}}>
          7 วันที่ผ่านมา
        </Text>
        <BarChart
          data={chartData}
          width={screenWidth}
          height={200}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          yAxisLabel=""
          yAxisSuffix=""
          fromZero={true}
        />
      </View>
      <Card style={{margin: 10, backgroundColor: '#2d2d2d'}}>
        <Text variant={'titleLarge'} style={{color: 'white', margin: 5}}>
          รายงานการดื่มน้ำอาทิตย์นี้
        </Text>
        <Card.Content>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text variant={'titleMedium'} style={{color: 'white'}}>
              ปริมาณเฉลี่ยการดื่มน้ำ
            </Text>
            <Text variant={'titleMedium'} style={{color: 'white'}}>
              {avgDrinkWeek.toFixed()} ml
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text variant={'titleMedium'} style={{color: 'white'}}>
              คุณดื่มน้ำถี่เเค่ไหน
            </Text>
            <Text variant={'titleMedium'} style={{color: 'white'}}>
              {avgFreqDrink.toFixed()} ครั้ง/วัน
            </Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({});
