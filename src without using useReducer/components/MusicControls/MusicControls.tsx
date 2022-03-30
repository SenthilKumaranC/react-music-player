import { useCallback, useContext, useEffect } from "react"
import { MusicPlayerContext } from "../MusicPlayer/MusicPlayer"

const MusicControls = () => {

    const {setNextSong, musicPlayerState,audioDevice,setMusicPlayerState,songIndex,songs,setSongIndex} = useContext(MusicPlayerContext);


   
    const play = useCallback(() => {
        console.log("play");
        audioDevice.play();
        setMusicPlayerState(true);
    }, [audioDevice,setMusicPlayerState])

    const pause = useCallback(() => {
        audioDevice.pause();
        setMusicPlayerState(false);
    }, [audioDevice,setMusicPlayerState])

    const prev = useCallback(() => {
        let tempSongIndex = songIndex - 1;
        if (tempSongIndex === -1) {
            tempSongIndex = songs.length - 1;
        }
        setSongIndex(tempSongIndex);
        setMusicPlayerState(true);
        //play();
    }, [songIndex, songs.length,setSongIndex,setMusicPlayerState]);

    const next = useCallback(() => {
        console.log("next triggered")
        let tempSongIndex = songIndex + 1;
        if (tempSongIndex >= songs.length) {
            tempSongIndex = tempSongIndex % songs.length;
        }
        setSongIndex(tempSongIndex);
        setMusicPlayerState(true);
        //play();
    }, [songIndex, songs.length,setSongIndex,setMusicPlayerState])

    useEffect(()=>{
        //setNextSong(next)
    },[next])

    return <div className="navigation">
        {/* Button */}
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
}

export default MusicControls