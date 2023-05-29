import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  MD2Colors,
  useTheme,
  TextInput,
} from 'react-native-paper';
type Props = {};

const Home = (props: Props) => {
  const theme = useTheme();
  const [text, setText] = useState('');

  return (
    <View style={{backgroundColor: theme.colors.primary, flex: 1}}>
      <Text style={{color: 'white'}}>Home</Text>
      <TextInput
        label="Email"
        value={text}
        onChangeText={text => setText(text)}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
