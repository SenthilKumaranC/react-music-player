import { useCallback, useContext, useEffect } from "react";
import {
  MusicPlayerActions,
  MusicPlayerContext,
} from "../MusicPlayer/MusicPlayer";

const MusicControls = () => {
  const { state, dispatch } = useContext(MusicPlayerContext);

  const { musicPlayerState } = state;

  const play = useCallback(() => {
    dispatch({ type: MusicPlayerActions.PLAY });
  }, [dispatch]);

  const pause = useCallback(() => {
    dispatch({ type: MusicPlayerActions.PAUSE });
  }, [dispatch]);

  const prev = useCallback(() => {
    dispatch({ type: MusicPlayerActions.PREV_SONG });
  }, [dispatch]);

  const next = useCallback(() => {
    dispatch({ type: MusicPlayerActions.NEXT_SONG });
  }, [dispatch]);

  return (
    <div className="navigation">
      {/* Button */}
      <button onClick={prev} id="prev" className="action-btn">
        <i className="fas fa-backward"></i>
      </button>

      {!musicPlayerState ? (
        <button onClick={play} id="play" className="action-btn action-btn-big">
          <i className={`fas fa-play`}></i>
        </button>
      ) : (
        <button onClick={pause} id="play" className="action-btn action-btn-big">
          <i className={`fas fa-pause`}></i>
        </button>
      )}

      <button onClick={next} id="next" className="action-btn">
        <i className="fas fa-forward"></i>
      </button>
    </div>
  );
};

export default MusicControls;
