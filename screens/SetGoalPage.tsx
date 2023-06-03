import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Modal, Portal, Text, Button, PaperProvider} from 'react-native-paper';

type Props = {};

const SetGoalPage = (props: Props) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <Button style={{marginTop: 30}} mode={'contained'} onPress={showModal}>
        Show
      </Button>
    </PaperProvider>
  );
};

export default SetGoalPage;

const styles = StyleSheet.create({});
