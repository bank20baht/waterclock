import {StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import React from 'react';

type Props = {};

const CardTime = (props: Props) => {
  return (
    <Card style={{marginVertical: 5}}>
      <Card.Content
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text variant="titleLarge">10.17 AM</Text>
        <Text variant="bodyMedium">300 ml</Text>
      </Card.Content>
    </Card>
  );
};

export default CardTime;

const styles = StyleSheet.create({});
