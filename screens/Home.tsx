import React, {useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import CardTime from '../components/CardTime';
import ProgressCircle from 'react-native-progress-circle';
type Props = {};

const Home = (props: Props) => {
  const [amount, setAmount] = useState<number>(0);
  const maxAmount = 3000;
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
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Pressable onPress={handleDrinked}>
            <ProgressCircle
              percent={(amount / maxAmount) * 100}
              radius={100}
              borderWidth={8}
              color="#3399FF"
              shadowColor="#999"
              bgColor="red">
              <Text style={{fontSize: 18}}>{(amount / maxAmount) * 100}%</Text>
            </ProgressCircle>
          </Pressable>
        </View>

        <View style={{}}>
          <CardTime />
          <CardTime />
          <CardTime />
          <CardTime />
          <CardTime />
          <CardTime />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  title: {
    color: 'black',
    fontSize: 24,
    marginTop: 16,
  },
});
