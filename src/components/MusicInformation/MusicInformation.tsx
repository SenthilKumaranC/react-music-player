import { useCallback, useContext, useMemo } from "react";
import { MusicPlayerContext } from "../MusicPlayer/MusicPlayer";

const MusicInformation = () => {
  //const {musicPlayerState,percentage,musicTitle,audioDevice} = useContext(MusicPlayerContext);

  const { state } = useContext(MusicPlayerContext);

  const { musicPlayerState, percentage, musicTitle, audioDevice } = state;

  const playFromClickedPosition = useCallback((el) => {
    const totalWidth = el.currentTarget.clientWidth;
    const clickX = el.nativeEvent.offsetX;
    audioDevice.currentTime = (clickX / totalWidth) * audioDevice.duration;
  }, []);

  const currentPlayTime = useMemo(() => {
    if (audioDevice) {
      let seconds = (percentage / 100) * audioDevice.duration;
      seconds = Math.round(seconds);
      if (isNaN(seconds)) {
        return "";
      }
      return `${seconds} sec / ${Math.round(audioDevice.duration)} sec`;
    } else {
      return ``;
    }
  }, [percentage]);

  return (
    <>
      <div
        className={`music-info ${
          musicPlayerState ? "music-info-show" : "music-info-hide"
        }`}
      >
        <h4 id="title">{musicTitle}</h4>
        {/* Music Progress Bar */}
        <div
          className="progress-container"
          id="progress-container"
          onClick={playFromClickedPosition}
        >
          <div
            className="progress"
            id="progress"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div>{currentPlayTime}</div>
      </div>
    </>
  );
};

export default MusicInformation;
