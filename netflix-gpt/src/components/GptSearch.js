import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSeacrhBar from "./GptSearchBar";
import { NETFLIX_BACKGROUND } from "../utils/constants";

const GptSearch = () => {
    return (
        <div>
            <div className="absolute -z-10">
                <img src={NETFLIX_BACKGROUND} alt="Netflix Background"></img>
            </div>
            <GptSeacrhBar/>
            <GptMovieSuggestion/>
        </div>
    )
};

export default GptSearch;