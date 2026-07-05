import Header from "./Header";
import { useState, useRef } from "react";
import {checkValidData} from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login =() => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    //navigate to take user from one page to another page
    const navigate = useNavigate();

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
                displayName: name.current.value, photoURL: "https://media.licdn.com/dms/image/v2/D4D03AQHywJwI_phKKQ/profile-displayphoto-shrink_100_100/B4DZU4MA3nGcAU-/0/1740404429276?e=1784764800&v=beta&t=5BaD7dNBoCpYODPI8cfETGT7PvYATJ7Z5E8apJgYeno"
                }).then(() => {
                    // dispatch action once profile is updated for display name and photourl
                    const {uid, email, displayName, photoURL} = auth.currentUser;
                    dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
                    navigate("/browse");
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
                console.log(user);
                navigate("/browse");
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
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/2f42605e-e786-4a06-8612-ebc67c55ba6c/web/IN-en-20260629-TRIFECTA-perspective_76b17e8c-cff9-4c65-9938-08ca5029be6b_large.jpg"
            alt="Netflix Background"></img>
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
