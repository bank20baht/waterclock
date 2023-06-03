import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, Switch, Text} from 'react-native-paper';
type Props = {
  currentAmount: number;
  goalAmount: number;
};

const CardCapacity = (props: Props) => {
  return (
    <View style={{margin: 5, padding: 5}}>
      <Card>
        <Card.Content style={{margin: 10}}>
          <Text variant="headlineLarge" style={{textAlign: 'center'}}>
            {props.currentAmount} / {props.goalAmount}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default CardCapacity;

const styles = StyleSheet.create({});
