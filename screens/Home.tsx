import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import CardTime from '../components/CardTime';
import AnimatedProgressWheel from 'react-native-progress-wheel';

const Home = (props: any) => {
  const [amount, setAmount] = useState<number>(0);
  const [items, setItems] = useState<any>([]);
  const maxAmount = 3000;

  const handleDrinked = () => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const newItem = {
      time: currentTime,
      amount: 300,
    };
    setItems((prevItems: any) => [...prevItems, newItem]);
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
            <AnimatedProgressWheel
              progress={percentFilled}
              animateFromValue={0}
              duration={5000}
              color={'#69b4ff'}
              fullColor={'#0085ff'}
              backgroundColor={'white'}
            />
          </Pressable>
        </View>
        {items ? (
          items.map((item: any, index: number) => (
            <CardTime key={index} value={item} />
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
