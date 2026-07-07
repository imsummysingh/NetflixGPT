import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies ";
import useUpComingMovies from "../hooks/useUpcomingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse =() => {

  const showGptSearchView = useSelector(store=>store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useUpComingMovies();
  useTopRatedMovies();

  return (
    <div>
      <Header />
      {
        showGptSearchView ? (<GptSearch/>):(<><MainContainer /><SecondaryContainer /></>)
      }
    </div>
  )
}

export default Browse;
