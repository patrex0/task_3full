import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';

const App = () => {
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.recordAsync();
        console.log('Video recorded at: ', uri);
      } catch (error) {
        console.error('Failed to record video: ', error);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        captureAudio={true}
      />
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={isRecording ? stopRecording : startRecording} style={{ padding: 10 }}>
          <Text style={{ color: 'white' }}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;