import {Dimensions, StatusBar, StyleSheet, Text, View} from 'react-native';
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
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.3,
    yAxisLabel: '',
    yAxisSuffix: '',
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
      <View style={{margin: 10}}>
        <Text>7 วันที่ผ่านมา</Text>
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
        <Card.Content>
          <Text style={{color: 'white'}}>เฉลี่ยการดื่มน้ำรายอาทิตย์</Text>
          <Text style={{color: 'white'}}>คุณดื่มน้ำถี่เเค่ไหน</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({});
