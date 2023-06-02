import React from 'react';
import {StyleSheet, View} from 'react-native';
import CardSetTIme from '../components/CardSetTIme';
const Setting = () => {
  return (
    <View style={styles.container}>
      <CardSetTIme />
      <CardSetTIme />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
