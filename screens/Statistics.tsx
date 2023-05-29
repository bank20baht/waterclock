import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ContributionGraph} from 'react-native-chart-kit';

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

const chartConfig = {
  backgroundGradientFrom: 'rgba(30, 41, 35, 0)',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: 'rgba(8, 19, 13, 0)',
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(26, 146, 255, ${opacity})`, // Changed to blue color
  strokeWidth: 2,
  barPercentage: 0.5,
};
const screenWidth = Dimensions.get('window').width;
const Statistics = (props: Props) => {
  return (
    <View>
      <Text>Statistics</Text>
      <View>
        <ContributionGraph
          values={commitsData}
          endDate={new Date()}
          numDays={105}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          tooltipDataAttrs={{
            strokeWidth: 1,
          }}
        />
      </View>
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({});
