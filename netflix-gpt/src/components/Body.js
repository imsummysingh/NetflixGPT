import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse.js";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Body =() => {
    //dispatch hook for firing actions to the redux store
    const dispatch = useDispatch();    

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        }
    ]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) { 
            //user signed In           
            const {uid, email, displayName, photoURL} = user;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
        } else {
            // User is signed out
            dispatch(removeUser());
        }
        });
    },[])


  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body;

