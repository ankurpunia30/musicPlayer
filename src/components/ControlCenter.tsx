import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import Icons from 'react-native-vector-icons/MaterialIcons';

const ControlCenter = () => {
    const playbackState = usePlaybackState();  // This should return a direct state

    const skipToNext = async () => {
        await TrackPlayer.skipToNext();
    };

    const skipToPrevious = async () => {
        await TrackPlayer.skipToPrevious();
    };

    const togglePlayback = async (state: State) => {
        const currentTrack = await TrackPlayer.getActiveTrack();

        if (currentTrack !== null) {
            if (state === State.Ready || state === State.Paused) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={skipToPrevious}>
                <Icons style={styles.icon} name="skip-previous" size={40} />
            </Pressable>
            <Pressable onPress={() => togglePlayback(playbackState?.state || State.None)}>
                <Icons
                    style={styles.icon}
                    name={playbackState?.state === State.Playing ? "pause" : "play-arrow"}
                    size={75}
                />
            </Pressable>
            <Pressable onPress={skipToNext}>
                <Icons style={styles.icon} name="skip-next" size={40} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 56,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        color: '#FFFFFF',
    },
    playButton: {
        marginHorizontal: 24,
    },
});

export default ControlCenter;
