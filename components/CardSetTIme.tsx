import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Card, Switch, Text} from 'react-native-paper';
import {Pressable} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
type Props = {};

const CardSetTIme = (props: Props) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const formatTime = (date: Date) => {
    const formatted = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return formatted;
  };

  const handleTimeChange = (event: any, selected: any) => {
    if (selected) {
      setSelectedTime(new Date(selected));
    } else {
      setSelectedTime(new Date());
    }
    setShowTimePicker(false);
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };
  return (
    <View>
      <Card style={styles.cardContainer}>
        <View style={styles.rowContainer}>
          <Pressable onPress={showTimePickerModal}>
            <Text variant="titleLarge">{formatTime(selectedTime)}</Text>
          </Pressable>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
      </Card>
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          display="default"
          value={selectedTime}
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

export default CardSetTIme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    marginVertical: 5,
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  timeText: {
    color: 'black',
  },
});