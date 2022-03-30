import { useContext } from "react";
import { MusicPlayerContext } from "../MusicPlayer/MusicPlayer";

const MusicCoverPhoto = () => {
    
  const { state } = useContext(MusicPlayerContext);
  const { coverPhoto } = state;

  return (
    <div className="img-container">
      <img src={coverPhoto} alt="music-cover" id="cover" />
    </div>
  );
};

export default MusicCoverPhoto;
