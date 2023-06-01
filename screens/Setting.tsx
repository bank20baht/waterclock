import {StyleSheet, Text, View, Button, Pressable} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {};

const Setting = (props: Props) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleTimePicker = () => {
    setShowTimePicker(true);
  };

  const handleTimeChange = (event: any, selected: any) => {
    if (selected) {
      setSelectedTime(selected);
      setShowTimePicker(false);
    } else {
      setShowTimePicker(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Pressable
        style={{
          alignContent: 'flex-end',
          flexDirection: 'row',
          paddingRight: 5,
        }}
        onPress={handleTimePicker}>
        <Text style={{paddingRight: 5, color: 'black'}}>
          {selectedTime.toISOString()}
        </Text>
      </Pressable>
      {showTimePicker && (
        <DateTimePicker
          mode={'time'}
          display="default"
          value={selectedTime}
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({});
