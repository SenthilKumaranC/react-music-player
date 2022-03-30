import { useCallback, useMemo, useRef, useState } from "react";
import "./MusicPlayer.css";
import SongList from '../../musicPlayer.config.json';
import MusicTitle from "../MusicTitle/MusicTitle";
import MusicContainer from "../MusicContainer/MusicContainer";
import React from "react";

export interface ISong {
    musicTitle: string;
    coverPhoto: string;
    musicTrack: string;
}

export interface IMusicPlayerContext {
    musicPlayerState: boolean;
    musicTitle: string;
    musicTrack: string;
    audioDevice: any;
    setAudioDevice: any;
    songIndex:number;
    songs:ISong[]
    percentage: number;
    setPercentage: any;
    coverPhoto: string;
    setMusicPlayerState:any;
    setSongIndex:any;
    nextSong:any;
    setNextSong:any;
}


export const MusicPlayerContext = React.createContext<IMusicPlayerContext>({
    
    musicTitle: "",
    musicTrack: "",
    coverPhoto: "",

    songIndex:0,
    setSongIndex: (percentage: number) => {

    },
    songs:[],

    audioDevice: {},
    setAudioDevice: (audioDevice: any) => {

    },

    percentage: 0,
    setPercentage: (percentage: number) => {

    },

    musicPlayerState: false,
    setMusicPlayerState: (percentage: number) => {

    },

    nextSong: (ev:any) => {

    },
    setNextSong: (percentage: number) => {

    },
    
})



const MusicPlayer = () => {

    const [songs, setSongs] = useState<ISong[]>(SongList.songs)
    const [songIndex, setSongIndex] = useState<number>(0);
    const [percentage, setPercentage] = useState<number>(0);
    const [musicPlayerState, setMusicPlayerState] = useState<boolean>(false);
    const [audioDevice, setAudioDevice] = useState<any>();
    const [nextSong, setNextSong] = useState<any>();
    const { musicTitle, musicTrack, coverPhoto } = useMemo(() => {
        return songs[songIndex];
    }, [songs, songIndex])

    return <>

        <MusicPlayerContext.Provider value={{
            musicPlayerState,
            musicTitle,
            musicTrack,
            percentage,
            setPercentage,
            coverPhoto,
            audioDevice,
            setAudioDevice,
            setMusicPlayerState,
            songIndex,
            songs,
            setSongIndex,
            setNextSong,
            nextSong
        }}>
            <MusicTitle></MusicTitle>
            <MusicContainer></MusicContainer>
        </MusicPlayerContext.Provider>
    </>
}

export default MusicPlayer;