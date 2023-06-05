import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, Text} from 'react-native-paper';
import AnimateNumber from 'react-native-animate-number';
import AnimatedProgressWheel from 'react-native-progress-wheel';
type Props = {
  currentAmount: number;
  goalAmount: number;
};

const CardCapacity = (props: Props) => {
  return (
    <View style={{margin: 5, padding: 5, alignItems: 'center'}}>
      <AnimateNumber
        value={props.currentAmount}
        countBy={10}
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
              <View style={{alignItems: 'center', padding: 5}}>
                <AnimatedProgressWheel
                  progress={percentFilled}
                  animateFromValue={0}
                  duration={2000}
                  color={'#69b4ff'}
                  fullColor={'#0085ff'}
                  backgroundColor={'white'}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default CardCapacity;

const styles = StyleSheet.create({});
