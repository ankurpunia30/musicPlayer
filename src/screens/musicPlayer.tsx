import { Image, StyleSheet, Text, View ,FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import {Dimensions} from 'react-native'
const width = Dimensions.get('window').width;
import { playListData } from '../constant';
import TrackPlayer,{
    Event,
    Track,
    useTrackPlayerEvents,
} from 'react-native-track-player';
import SongInfo from '../components/songInfo';
import SongSlider from '../components/SongSlider';
import ControlCenter from '../components/ControlCenter';

const MusicPlayer = () => {
    const [track,setTrack]=useState<Track|null>();
    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
        switch (event.type) {
            case Event.PlaybackActiveTrackChanged:
                const playingTrack = await TrackPlayer.getTrack(event.track?.id ?? 0);
                setTrack(playingTrack);
                break;
            default:
                break;
        }
    }); // Add closing parenthesis here
    const renderArtwork=()=>{
        return (
        <View style={styles.listArtWrapper}>
            <View style={styles.albumContainer}>
                {track?.artwork ? (
                    <Image
                    source={{uri:track?.artwork?.toString()}}
                    style={styles.albumArtImg}
                    />
                ):null}
                


            </View>
        </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
            horizontal
            data={playListData}
            renderItem={renderArtwork}
            keyExtractor={song=>song.id.toString()}

            />
            <SongInfo track={track}/>
            <SongSlider/>
            <ControlCenter/>

            
        </View>
    
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#001d23',
    },
    listArtWrapper: {
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
    },
    albumContainer: {
      width: 300,
      height: 300,
    },
    albumArtImg: {
      height: '100%',
      borderRadius: 4,
    },
  });
export default MusicPlayer