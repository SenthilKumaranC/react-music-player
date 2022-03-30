import { useCallback, useContext, useRef, useState } from "react"
import { MusicPlayerContext } from "../MusicPlayer/MusicPlayer"

const AudioDevice = () => {

    const audioDevice = useRef<any>();

    const {musicTrack,setAudioDevice,setPercentage,nextSong} = useContext(MusicPlayerContext);

    const onTimeUpdate = useCallback((audioEvent) => {
        const { currentTime, duration } = audioEvent.srcElement;
        setPercentage(currentTime / duration * 100);
    }, [])

    const addAudioEvents = useCallback(() => {
        audioDevice.current?.addEventListener("timeupdate", onTimeUpdate)
        //audioDevice.current?.addEventListener("ended", nextSong)
    }, [onTimeUpdate])

    const onAudioDevice = useCallback((audioElement) => {
        audioDevice.current = audioElement;
        setAudioDevice(audioElement);
        addAudioEvents();
    }, [addAudioEvents])

    return <audio autoPlay={true} ref={onAudioDevice} src={musicTrack} id="audio"></audio>
}

export default AudioDevice