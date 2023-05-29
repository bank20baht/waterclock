import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const commitsData = [
  {date: '2023-05-18', count: 1},
  {date: '2023-05-19', count: 2},
  {date: '2023-05-20', count: 3},
  {date: '2023-05-21', count: 4},
  {date: '2023-05-22', count: 5},
  {date: '2023-05-23', count: 2},
  {date: '2023-05-24', count: 3},
  {date: '2023-05-25', count: 2},
  {date: '2023-05-26', count: 4},
  {date: '2023-05-27', count: 2},
  {date: '2023-05-28', count: 4},
];

const data = {
  labels: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
  ],
  datasets: [
    {
      data: [
        20, 45, 28, 80, 99, 43, 45, 93, 15, 51, 64, 12, 17, 37, 52, 73, 84, 25,
        36, 68, 91, 32, 69, 88, 47, 16, 56, 72, 77, 49,
      ],
    },
  ],
};

const screenWidth = Dimensions.get('window').width;
const Statistics = (props: Props) => {
  return (
    <View>
      <Text>Statistics</Text>
      <View></View>
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({});
