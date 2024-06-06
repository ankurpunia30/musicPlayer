
import React from 'react';

//use effect is used to perform side effects in function components
//use state is used to store the state of the component
//useEffect ALSO RUNS AFTER THE FIRST RENDER and after every update
import { useState,useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {setupPlayer,addTrack} from "../musicPlayerServices";
import MusicPlayer from './screens/musicPlayer';
function App(): React.JSX.Element {
 const [isPlayerReady,setIsPlayerReady]=useState(false);
 async function setup(){
  //this function will be called when the component is mounted
  //we will setup the player here
  //we will add the track here
  let isSetup=await setupPlayer();
  if(isSetup){
    await addTrack();
  }
  setIsPlayerReady(isSetup);
 }
 useEffect(() => {
   setup();
 }, [])
 if(!isPlayerReady){
  return (
    <SafeAreaView>
      <ActivityIndicator/>
    </SafeAreaView>
  )
 }
  return (
   <View style={styles.container}>
    <StatusBar barStyle="dark-content"/>
    <MusicPlayer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,

  }
});

export default App;
