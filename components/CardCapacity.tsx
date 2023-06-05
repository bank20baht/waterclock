import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, Switch, Text} from 'react-native-paper';
import AnimateNumber from 'react-native-animate-number';
import AnimatedProgressWheel from 'react-native-progress-wheel';
type Props = {
  currentAmount: number;
  goalAmount: number;
  onDrinkPress: () => void;
};

const CardCapacity = (props: Props) => {
  const handlePress = () => {
    props.onDrinkPress();
  };

  return (
    <View style={{margin: 5, padding: 5, alignItems: 'center'}}>
      <AnimateNumber
        value={props.currentAmount}
        formatter={(val: any) => {
          let percentFilled = (parseFloat(val) / props.goalAmount) * 100;
          return (
            <View>
              <Card
                style={{
                  backgroundColor: '#0085ff',
                  borderWidth: 2,
                  borderColor: '#004E86',
                }}>
                <Card
                  style={{
                    backgroundColor: '#0085ff',
                    borderWidth: 2,
                    borderColor: '#004E86',
                  }}>
                  <Card.Content style={{margin: 10, alignItems: 'center'}}>
                    <Text
                      variant="headlineLarge"
                      style={{textAlign: 'center', color: '#e0ffff'}}>
                      {parseFloat(val).toFixed()} / {props.goalAmount} ml.
                    </Text>
                  </Card.Content>
                </Card>
              </Card>
              <Pressable onPress={handlePress}>
                <View style={{alignItems: 'center', padding: 5}}>
                  <AnimatedProgressWheel
                    progress={percentFilled}
                    animateFromValue={0}
                    duration={1000}
                    color={'#69b4ff'}
                    fullColor={'#0085ff'}
                    backgroundColor={'white'}
                  />
                </View>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
};

export default CardCapacity;

const styles = StyleSheet.create({});
