import AudioDevice from "../AudioDevice/AudioDevice";
import MusicControls from "../MusicControls/MusicControls";
import MusicCoverPhoto from "../MusicCoverPhoto/MusicCoverPhoto";
import MusicInformation from "../MusicInformation/MusicInformation";

const MusicContainer = () => {
    return <>
        <div className="music-container" id="music-container">
            <MusicInformation></MusicInformation>
            <AudioDevice></AudioDevice>
            <MusicCoverPhoto></MusicCoverPhoto>
            <MusicControls></MusicControls>
        </div>
    </>
}

export default MusicContainer;

