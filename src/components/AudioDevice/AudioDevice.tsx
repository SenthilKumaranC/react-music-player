import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useMusicPlayerDispatch, useMusicPlayerState } from "../../hooks/useMusicPlayer";
import {
  MusicPlayerActions,
  MusicPlayerContext,
} from "../MusicPlayer/MusicPlayer";

const AudioDevice = () => {
  const audioDevice = useRef<any>();

  //const { state, dispatch } = useContext(MusicPlayerContext);

  const { musicTrack, musicPlayerState } = useMusicPlayerState(); //useSelector
  const dispatch = useMusicPlayerDispatch();  //useDispatch

  useEffect(() => {
    if (audioDevice.current) {
      if (musicPlayerState) {
        audioDevice.current?.play();
      } else {
        audioDevice.current?.pause();
      }
    }
  }, [musicPlayerState]);

  const onTimeUpdate = useCallback((audioEvent) => {
    const { currentTime, duration } = audioEvent.srcElement;
    dispatch({
      type: MusicPlayerActions.SET_PERCENTAGE,
      currentTime: currentTime,
      duration: duration,
    });
  }, []);

  const addAudioEvents = useCallback(() => {
    audioDevice.current?.addEventListener("timeupdate", onTimeUpdate);
    //audioDevice.current?.addEventListener("ended", nextSong)
  }, [onTimeUpdate]);

  const onAudioDevice = useCallback(
    (audioElement) => {
      audioDevice.current = audioElement;
      addAudioEvents();
    },
    [addAudioEvents]
  );

  return (
    <audio
      autoPlay={true}
      ref={onAudioDevice}
      src={musicTrack}
      id="audio"
    ></audio>
  );
};

export default AudioDevice;
