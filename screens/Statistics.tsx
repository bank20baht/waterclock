import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {openDatabase} from '../utils/db';
import {BarChart} from 'react-native-chart-kit';
import {Card} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';

const db = openDatabase();

type Props = {};

type Data = {
  date: Date;
  sumdaily: number;
};

const Statistics = (props: Props) => {
  const [data, setData] = useState<Data[]>([]);

  const fetchData = async () => {
    try {
      await new Promise<void>((resolve, reject) => {
        db.transaction((tx: any) => {
          const currentDate = new Date();
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(currentDate.getDate() - 7);

          tx.executeSql(
            `SELECT date, SUM(amount) as sumdaily FROM watertrack WHERE date >= ? AND date <= ? GROUP BY date ORDER BY date DESC`,
            [sevenDaysAgo.toISOString(), currentDate.toISOString()],
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

  const screenWidth = Dimensions.get('window').width - 30;

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 1,
    yAxisLabel: '',
    yAxisSuffix: '',
    minValue: 0,
  };

  const chartData = {
    labels: data.map(item => item.date.toString()),
    datasets: [
      {
        data: data.map(item => item.sumdaily),
      },
    ],
  };

  return (
    <View>
      <Text>Statistics</Text>
      <View style={{margin: 10}}>
        <BarChart
          data={chartData}
          width={screenWidth}
          height={200}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          yAxisLabel=""
          yAxisSuffix=""
        />
      </View>
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({});
