import {StyleSheet, View} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import React from 'react';

type Props = {
  value: {id: number; time: any; amount: any}; // Include the 'id' property
  onDelete: (id: number) => void; // Add a callback for delete
};

const CardTime = (props: Props) => {
  const {id, time, amount} = props.value;

  const handleDelete = () => {
    props.onDelete(id);
  };

  return (
    <Card style={{marginVertical: 5}}>
      <Card.Content
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text variant="titleLarge">{time}</Text>
        <Text variant="bodyMedium">{amount} ml</Text>
        <IconButton icon="delete" size={20} onPress={handleDelete} />
      </Card.Content>
    </Card>
  );
};

export default CardTime;

const styles = StyleSheet.create({});
