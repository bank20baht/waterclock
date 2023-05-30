import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import CardTime from '../components/CardTime';
import ProgressCircle from 'react-native-progress-circle';

const Home = (prop: any) => {
  const [amount, setAmount] = useState(0);
  const maxAmount = 3000;

  const handleDrinked = () => {
    setAmount(prevAmount => prevAmount + 300);
  };

  useEffect(() => {
    console.log(`Amount changed: ${amount}`);
  }, [amount]);

  const percentFilled = (amount / maxAmount) * 100;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.center}>
          <Pressable onPress={handleDrinked}>
            <ProgressCircle
              percent={percentFilled}
              radius={100}
              borderWidth={8}
              color="#3399FF"
              shadowColor="#999"
              bgColor="red">
              <Text style={styles.circleText}>กดเมื่อดื่ม</Text>
            </ProgressCircle>
          </Pressable>
        </View>

        <View>
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
