import { useContext, useEffect } from "react";
import { IMusicPlayerContext, MusicPlayerContext } from "../components/MusicPlayer/MusicPlayer";

const useUpdatePercentage = (state:IMusicPlayerContext) => {
  useEffect(() => {
    return () => {
      console.log(state);
      //call server api update the percentage
    };
  }, [state]);
};

export const useMusicPlayerState = () => {
  const { state } = useContext(MusicPlayerContext);

  useUpdatePercentage(state);

  return state;
};

export const useMusicPlayerDispatch = () => {
  const { dispatch } = useContext(MusicPlayerContext);

  return dispatch;
};
