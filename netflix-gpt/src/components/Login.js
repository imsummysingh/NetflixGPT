import Header from "./Header";
import { useState, useRef } from "react";
import {checkValidData} from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR, NETFLIX_BACKGROUND } from "../utils/constants";

const Login =() => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    //dispatch hook for firing actions to the redux store
    const dispatch = useDispatch();
    
    //reference variable for the input fields
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

const handleButtonClick = () => {
        //validate form data
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if(message) return;

        //Sign in/ Sign up logic
        if(!isSignInForm){

            //sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;

                //update the user profile with the name
                updateProfile(user, {
                displayName: name.current.value, photoURL: USER_AVATAR
                }).then(() => {
                    // dispatch action once profile is updated for display name and photourl
                    const {uid, email, displayName, photoURL} = auth.currentUser;
                    dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
                }).catch((error) => {
                    setErrorMessage(error.message);
                });                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+ " " +errorMessage);
            });
        }else{

            //sign in logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+ " " +errorMessage);
            });
        }     
    };


    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

  return (
    <div>
        <Header />
        <div className="absolute">
            <img src={NETFLIX_BACKGROUND} alt="Netflix Background"></img>
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
            <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

            {!isSignInForm && (
                <input ref={name} type="text" placeholder="Full Name" required className="p-4 my-4 w-full bg-gray-700 rounded-lg"></input>
            )}
            <input ref={email} type="email" placeholder="Email Address" required className="p-4 my-4 w-full bg-gray-700 rounded-lg"></input>

            <input ref={password} type="password" placeholder="Password" required className="p-4 my-4 w-full bg-gray-700 rounded-lg"></input>

            <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

            <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
            
            <p className="text-gray-500 text-sm cursor-pointer" onClick={toggleSignInForm}>
                {isSignInForm ? "New to Netflix? Sign up now" : "Already have an account? Sign in now"}
            </p>
        </form>
    </div>
  )
}

export default Login;
