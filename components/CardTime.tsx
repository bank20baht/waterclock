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
    <Card
      style={{
        marginVertical: 5,
        backgroundColor: '#2d2d2d',
        borderColor: '#363636',
        borderWidth: 2,
      }}>
      <Card.Content
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text variant="titleLarge" style={{color: '#FFFFFF'}}>
            {time}
          </Text>
          <Text variant="bodyMedium" style={{color: '#9e9e9e'}}>
            {amount} ml
          </Text>
        </View>

        <IconButton icon="delete" size={20} onPress={handleDelete} />
      </Card.Content>
    </Card>
  );
};

export default CardTime;

const styles = StyleSheet.create({});
