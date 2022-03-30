import { useContext } from "react"
import { MusicPlayerContext } from "../MusicPlayer/MusicPlayer"

const MusicCoverPhoto = () => {

    const {coverPhoto} = useContext(MusicPlayerContext);
    
    return <div className="img-container">
        <img src={coverPhoto} alt="music-cover" id="cover" />
    </div>
}

export default MusicCoverPhoto