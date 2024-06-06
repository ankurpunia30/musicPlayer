import TrackPlayer, { RepeatMode } from "react-native-track-player";
import { Event } from "react-native-track-player";
import { playListData } from "./src/constant";
//function to setup the player
//this function will check if the player is already setup or not
//if the player is already setup it will return true
//if the player is not setup it will setup the player and return true
//if there is an error it will return false
//this function is an async function
//it will return a promise
//this function is used to setup the player
export async function setupPlayer() {
        let isSetup=false;
        try{
            await TrackPlayer.setupPlayer();
            isSetup=true;
        }catch(error){
            await TrackPlayer.setupPlayer();
            isSetup=true;
        }finally{
            return isSetup;
        }
}
export async function addTrack() {
   
    await TrackPlayer.add(playListData);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    
}
//function to add the tracks to the player
// create a plaback service
export async function playbackService() {
    TrackPlayer.addEventListener(Event.RemotePause,()=>{
        TrackPlayer.pause();
    })
    TrackPlayer.addEventListener(Event.RemotePlay,()=>{
        TrackPlayer.play();
    })
    TrackPlayer.addEventListener(Event.RemoteStop,()=>{
        TrackPlayer.stop();
    })
    TrackPlayer.addEventListener(Event.RemoteNext,()=>{
        TrackPlayer.skipToNext();
    })
    TrackPlayer.addEventListener(Event.RemotePrevious,()=>{
        TrackPlayer.skipToPrevious();
    })
    //remote seek event is used to seek the track
    //this event is triggered when the user seeks the track

    TrackPlayer.addEventListener(Event.RemoteSeek,()=>{
        TrackPlayer.seekTo();
    })

    

}