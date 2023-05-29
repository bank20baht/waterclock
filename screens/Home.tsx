import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';

type Props = {};

const Home = (props: Props) => {
  const [amount, setAmount] = useState<number>(0);

  const handleDrinked = () => {
    setAmount(prevAmount => prevAmount + 300);
  };

  useEffect(() => {
    console.log(`Amount changed: ${amount}`);
  }, [amount]);

  const getCircleColor = () => {
    if (amount < 1000) {
      return 'green';
    } else if (amount < 2000) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  const circleColor = getCircleColor();

  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={handleDrinked}>
        <View style={[styles.circle, {backgroundColor: circleColor}]}>
          <Text>{amount}</Text>
        </View>
      </TouchableOpacity>
      <Divider />
      <Text style={styles.title}>Home</Text>
      <Divider />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 24,
    marginTop: 16,
  },
});
