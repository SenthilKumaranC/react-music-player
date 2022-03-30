import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import "./MusicPlayer.css";
import SongList from "../../musicPlayer.config.json";
import MusicTitle from "../MusicTitle/MusicTitle";
import MusicContainer from "../MusicContainer/MusicContainer";
import React from "react";

const getSongInfo = (songIndex: number, songs: ISong[]) => {
  return songs[songIndex];
};

export interface ISong {
  musicTitle: string;
  coverPhoto: string;
  musicTrack: string;
}

export interface IMusicPlayerContext {
  musicPlayerState: boolean;
  musicTitle: string;
  musicTrack: string;
  songIndex: number;
  songs: ISong[];
  percentage: number;
  coverPhoto: string;
}

const initialState: IMusicPlayerContext = {
  musicPlayerState: false,
  songIndex: 0,
  songs: SongList.songs,

  musicTitle: "",
  musicTrack: "",
  coverPhoto: "",
  percentage: 0,
};

export const MusicPlayerActions = {
  NEXT_SONG: "NEXT_SONG",
  PREV_SONG: "PREV_SONG",
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  SET_PERCENTAGE: "SET_PERCENTAGE",
  INITIATE_MUSIC_PLAYER: "INTIATE_MUSIC_PLAYER",
};

const reducer = (
  currentState: IMusicPlayerContext,
  action: any
): IMusicPlayerContext => {
  let newSongIndex;
  const { songs, songIndex } = currentState;
  switch (action.type) {
    case MusicPlayerActions.NEXT_SONG:
      newSongIndex = songIndex + 1;
      if (newSongIndex >= songs.length) {
        newSongIndex = newSongIndex % songs.length;
      }
      return {
        ...currentState,
        songIndex: newSongIndex,
        ...getSongInfo(newSongIndex, songs),
      };
    case MusicPlayerActions.PREV_SONG:
      newSongIndex = songIndex - 1;
      if (newSongIndex === -1) {
        newSongIndex = songs.length - 1;
      }
      return { ...currentState, songIndex: newSongIndex };
    case MusicPlayerActions.PLAY:
      return { ...currentState, musicPlayerState: true };
    case MusicPlayerActions.PAUSE:
      return { ...currentState, musicPlayerState: false };
    case MusicPlayerActions.SET_PERCENTAGE:
      const { currentTime, duration } = action;
      return { ...currentState, percentage: (currentTime / duration) * 100 };
    case MusicPlayerActions.INITIATE_MUSIC_PLAYER:
      return { ...currentState, ...getSongInfo(songIndex, songs) };
    default:
      return currentState;
  }
};

export const MusicPlayerContext = React.createContext<any>({
  state: {},
  dispatch: (data: any) => {},
});

const MusicPlayer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: MusicPlayerActions.INITIATE_MUSIC_PLAYER });
  }, [dispatch]);

  return (
    <>
      <MusicPlayerContext.Provider value={{ state, dispatch }}>
        <MusicTitle></MusicTitle>
        <MusicContainer></MusicContainer>
      </MusicPlayerContext.Provider>
    </>
  );
};

export default MusicPlayer;
