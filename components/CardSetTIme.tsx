import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Card, Switch, Text} from 'react-native-paper';
import {Pressable} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  date: Date;
  switchOn: boolean;
};

const CardSetTime = (props: Props) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date(props.date));
  const [isSwitchOn, setIsSwitchOn] = useState(props.switchOn);

  useEffect(() => {
    saveSwitchState();
  }, [isSwitchOn]);

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

  const saveSwitchState = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('timeData');
      if (storedValue) {
        const parsedData = JSON.parse(storedValue);
        const updatedData = parsedData.map((item: any) => {
          if (item.date === props.date) {
            return {...item, switchOn: isSwitchOn};
          }
          return item;
        });
        await AsyncStorage.setItem('timeData', JSON.stringify(updatedData));
      }
    } catch (error) {
      console.log('Error saving switch state:', error);
    }
  };

  return (
    <View>
      <Card style={styles.cardContainer}>
        <View style={styles.rowContainer}>
          <Pressable onPress={showTimePickerModal}>
            <Text variant="headlineLarge" style={{color: 'white'}}>
              {formatTime(selectedTime)}
            </Text>
          </Pressable>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            color={'#0085ff'}
          />
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

export default CardSetTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  timeText: {
    color: 'black',
  },
});
