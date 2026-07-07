# Netflix GPT

- create-react-app
- configured TailwindCss in our project
- Header
- Routing of app
- Login Form
- Sign up form
- Form validation
- useref hook
- firebase setup
- deployed the app to prod (firebase: https://netflixgpt-28055.web.app)
- create signUp user account in firebase
- Implement signIn user API
- created redux store with userSlice
- Implemented sign out
- update profile
- Bug fix: Signup user displaye name & Profile picture update -> by using dispatch action when user is created
- Bug fix: If user is not logged in Redirect/browse to login page and vice-versa 
- unsubscribed to the onAuthStateChanged callback
- Added hardcoded url values to constant files
- Fetch movies from TMDB Movies
- Registered TMDB API & Create an app and get access token and then go to Dcoumentation of it
- Get data from TMDB now playing movie list API
- Put data of these in redux store
- Created custom hook for now playing movie
- Created movieSlice
- Update store with movies data
- Planned MainContainer & SecondaryContainer
- Fetch data for trailer video
- update store with trailer video data
- Embedded the youtube video in main container - made it autoplay & mute
- Tailwind classes for main container
- Build secondary container
- Build Movie List
- Build movie card
- TMDB Image CDN url
- Made the browser page smooth with tailwinf css
- usePopularMovie, useUpComingMovies, useTopRatedMovie custom hooks for different lists
- GPT Search Page
- GPT Search Bar
- Added multi language features in the app
- Integrate GPT APIs (get openAI Key)
- Get OpenAI Api Key
- Get search API call
- fetched gpt movies suggestions from tmdb
- created gptSlice and added data over there
- Reused MovieList component for rendering movie in GPT movie Suggestion container
- Memoization -> Avoiding unnecessary api call when the data is already there
- added .env file and added to gitignore
- added keys in .env file


Some Urls:
- https://platform.openai.com/home ->NetflixGPT Project
- https://www.npmjs.com/package/openai
- https://developer.themoviedb.org/reference/getting-started
- https://console.firebase.google.com/u/0/project/netflixgpt-28055/overview



# Features:
- Login/Sign up page
    - Sign In/ Sign Up Form
    - redirect to browse page
- Browse Page (after authentication)
    - Header
    - Main Movie
        - Trailer in background
        - Title & Description
        - Movie Suggestion
            - MovieList * N
- NetflixGPT
    - search bar
    - movie suggestion
