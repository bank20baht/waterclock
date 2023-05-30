import {StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import React from 'react';

type Props = {
  value: {time: any; amount: any};
};

const CardTime = (props: Props) => {
  const {time, amount} = props.value;

  return (
    <Card style={{marginVertical: 5}}>
      <Card.Content
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text variant="titleLarge">{time}</Text>
        <Text variant="bodyMedium">{amount}</Text>
      </Card.Content>
    </Card>
  );
};

export default CardTime;

const styles = StyleSheet.create({});
