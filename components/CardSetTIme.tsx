import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text, IconButton} from 'react-native-paper';

type Props = {
  value: {id: number; time: any; date: any};
  onDelete: (id: number) => void;
};

const CardSetTime = (props: Props) => {
  const {id, time, date} = props.value;

  const handleDelete = () => {
    props.onDelete(id);
  };

  return (
    <View>
      <Card style={styles.cardContainer}>
        <View style={styles.rowContainer}>
          <Text variant="headlineLarge" style={{color: 'white'}}>
            {time}
          </Text>
          <IconButton icon="delete" size={20} onPress={handleDelete} />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 5,
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#2d2d2d',
    borderColor: '#363636',
    borderWidth: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export default CardSetTime;
