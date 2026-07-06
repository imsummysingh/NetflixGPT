import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {

    //fetch trailer video & Updating the store with trailer video data
  const dispatch = useDispatch();
  
  const getMovieVideo = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);    
    const json = await data.json();

    const filterData = json.results.filter((video) => video.type === "Trailer");
    //for handling if there is no trailer for the movie, then take the first videeo of the movie
    const trailer = filterData?.length ? filterData[0] : json.results[0]; 
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieVideo();
  },[]);
}

export default useMovieTrailer;