import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header =() => {

  //dispatch hook for firing actions to the redux store
  const dispatch = useDispatch();  

  //navigate to take user from one page to another page
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store)=>store.gpt.showGptSearch);

  const handleSignOut = () => {
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        navigate("/error");
      });
  }

  const handleGptSearchClick = () =>{
    //toggle gpt search
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e) =>{
    dispatch(changeLanguage(e.target.value));
  }

  useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) { 
            //user signed In           
            const {uid, email, displayName, photoURL} = user;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
            navigate("/browse");
        } else {
            // User is signed out
            dispatch(removeUser());
            navigate("/");
        }
        });
        //we are unsubscribing the listener when the component is unmounted to avoid memory leaks
        return ()=> unsubscribe();
    },[]);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row md:justify-between">
        <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="Netflix Logo"></img>
        {user && (
          <div className="flex p-2">
            {showGptSearch && (<select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
              {SUPPORTED_LANGUAGES.map(lang=> <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
            </select>)}
            <button className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg" onClick={handleGptSearchClick}>{showGptSearch?"Home Page":"GPT Search"}</button>
            <img src={user.photoURL} alt="Netflix Profile" className="w-12 h-12  rounded-lg"></img>
            <button onClick={handleSignOut} className="font-bold text-white hover:text-gray-300">(Sign Out)</button>
          </div>
        )}
    </div>
  )
}

export default Header;
