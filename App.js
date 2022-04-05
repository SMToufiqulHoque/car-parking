/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
  Keyboard
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import{useForm,Controller } from 'react-hook-form'
import { useState,useEffect } from 'react';
import RNOtpVerify from 'react-native-otp-verify'
import OTPTextInput from 'react-native-otp-textinput'
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
const{control,handleSubmit}=useForm()
const onSubmit=(d)=>{
  console.log(d)
}
const [otp,setOtp]=useState('');
useEffect(()=>{
  RNOtpVerify.getHash().then(console.log).catch(console.log)
  RNOtpVerify.getOtp()
  .then(p=>RNOtpVerify.addListener(otpHandler))
  .catch(p=>console.log(p));
},[]);
const otpHandler=message=>{
  const lOtp=/(\d{4})/g.exec(message)[1];
  setOtp(lOtp);
  RNOtpVerify.removeListener();
  Keyboard.dismiss()
}
  return (
    <SafeAreaView style={backgroundStyle}>
     <View style={styles.sectionContainer}>
     <View >
     <Text>Number Plate</Text>
     <Controller name="numberPlate" control={control} 
     render={({ field: { onChange, onBlur, value } }) => (
      <TextInput
        style={styles.input}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        placeholder="Number Plate"
     />)}/>
     </View>
     <View>
     <Text>Mobile Number</Text>
     <Controller name="mobileNumber" control={control} 
     render={({ field: { onChange, onBlur, value } }) => (
      <TextInput
        style={styles.input}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
     />)}/>
     </View>
     <View>
     <Text>OTP</Text>
     <Controller name="otp" control={control} 
     render={({ field: { onChange, onBlur, value } }) => (
      <TextInput
        style={styles.input}
        onBlur={onBlur}
        onChangeText={onChange}
        value={setOtp(otp)}
     />)}/>
     </View>

    
    
     <View>
       <Button title="Submit" onPress={handleSubmit(onSubmit)}/>
     </View>
     
     </View>
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    alignItems:'center'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input:{
    borderColor: "gray",
    borderWidth:1,
    width:200,
    borderRadius:20,
    padding:20,

  }
});

export default App;
