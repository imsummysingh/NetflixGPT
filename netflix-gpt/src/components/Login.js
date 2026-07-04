import Header from "./Header";
import { useState } from "react";

const Login =() => {

    const [isSignInForm, setIsSignInForm] = useState(true);

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
        <form className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
            <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            
            {!isSignInForm && (
                <input type="text" placeholder="Full Name" required className="p-4 my-4 w-full bg-gray-700 rounded-lg"></input>
            )}
            <input type="email" placeholder="Email Address" required className="p-4 my-4 w-full bg-gray-700 rounded-lg"></input>
            
            <input type="password" placeholder="Password" required className="p-4 my-4 w-full bg-gray-700 rounded-lg"></input>

            <button className="p-4 my-6 bg-red-700 w-full rounded-lg">{isSignInForm ? "Sign In" : "Sign Up"}</button>

            <p className="text-gray-500 text-sm cursor-pointer" onClick={toggleSignInForm}>
                {isSignInForm ? "New to Netflix? Sign up now" : "Already have an account? Sign in now"}
            </p>
        </form>
    </div>
  )
}

export default Login;
