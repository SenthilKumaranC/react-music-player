import { useCallback, useMemo, useRef, useState } from "react";
import "./MusicPlayer.css";
import SongList from '../../musicPlayer.config.json';

export interface ISong {
    musicTitle: string;
    coverPhoto: string;
    musicTrack: string;
}

const MusicPlayer = () => {

    const [songs, setSongs] = useState<ISong[]>(SongList.songs)

    const [songIndex, setSongIndex] = useState<number>(0);

    const [percentage, setPercentage] = useState<number>(0);

    const [musicPlayerState, setMusicPlayerState] = useState<boolean>(false);

    const speaker = useRef<any>();

    const currentPlayTime = useMemo(() => {
        if (speaker.current) {
            let seconds = percentage / 100 * speaker.current.duration;
            seconds = Math.round(seconds);
            if (isNaN(seconds)) {
                return "";
            }
            return `${seconds} sec / ${Math.round(speaker.current.duration)} sec`;
        }
        else {
            return ``;
        }

    }, [percentage])


    const onTimeUpdate = useCallback((audioEvent) => {
        const { currentTime, duration } = audioEvent.srcElement;
        setPercentage(currentTime / duration * 100);
    }, [])


    const play = useCallback(() => {
        console.log("play");
        speaker.current?.play();
        setMusicPlayerState(true);
    }, [])

    const pause = useCallback(() => {
        speaker.current?.pause();
        setMusicPlayerState(false);
    }, [])

    const prev = useCallback(() => {
        let tempSongIndex = songIndex - 1;
        if (tempSongIndex === -1) {
            tempSongIndex = songs.length - 1;
        }
        setSongIndex(tempSongIndex);
        //play();
    }, [songIndex, songs.length]);

    const next = useCallback(() => {
        console.log("next triggered")
        let tempSongIndex = songIndex + 1;
        if (tempSongIndex >= songs.length) {
            tempSongIndex = tempSongIndex % songs.length;
        }
        setSongIndex(tempSongIndex);
        //play();
    }, [songIndex, songs.length])


    const addAudioEvents = useCallback(() => {
        speaker.current?.addEventListener("timeupdate", onTimeUpdate)
        speaker.current?.addEventListener("ended", next)
    }, [next, onTimeUpdate])

    const onSpeakerReady = useCallback((audioElement) => {
        speaker.current = audioElement;
        addAudioEvents();
    }, [addAudioEvents])

    const { musicTitle, musicTrack, coverPhoto } = useMemo(() => {
        return songs[songIndex];
    }, [songs, songIndex])

    const playFromClickedPosition = useCallback((el) => {
        const totalWidth = el.currentTarget.clientWidth;
        const clickX = el.nativeEvent.offsetX;
        speaker.current.currentTime = (clickX / totalWidth) * speaker.current.duration;
    }, [])

    return <>
        <h1>Music Player</h1>
        <div className="music-container" id="music-container">
            <div className={`music-info ${musicPlayerState ? "music-info-show" : "music-info-hide"}`}>
                <h4 id="title">{musicTitle}</h4>
                <div className="progress-container" id="progress-container" onClick={playFromClickedPosition}>
                    <div className="progress" id="progress" style={{ width: `${percentage}%` }}></div>
                </div>
                <div>{currentPlayTime}</div>
            </div>

            <audio autoPlay={true} ref={onSpeakerReady} src={musicTrack} id="audio"></audio>

            <div className="img-container">
                <img src={coverPhoto} alt="music-cover" id="cover" />
            </div>
            <div className="navigation">
                <button onClick={prev} id="prev" className="action-btn">
                    <i className="fas fa-backward"></i>
                </button>

                {!musicPlayerState ? <button onClick={play} id="play" className="action-btn action-btn-big">
                    <i className={`fas fa-play`}></i>
                </button> :
                    <button onClick={pause} id="play" className="action-btn action-btn-big">
                        <i className={`fas fa-pause`}></i>
                    </button>}

                <button onClick={next} id="next" className="action-btn">
                    <i className="fas fa-forward"></i>
                </button>
            </div>
        </div>
    </>
}

export default MusicPlayer;