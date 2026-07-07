import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSeacrhBar from "./GptSearchBar";
import { NETFLIX_BACKGROUND } from "../utils/constants";

const GptSearch = () => {

    return (
         <>
            <div className="fixed -z-10">
                <img src={NETFLIX_BACKGROUND} alt="Netflix Background"></img>
            </div>
            <div className="">
                <GptSeacrhBar/>
                <GptMovieSuggestion/>
            </div>
        </>
    )
};

export default GptSearch;

            