// context is a redux like state management system (i.e. we can maintain global states for a project like user loggedIn or other information)
// i.e. for example if a user logsIn, the information should be global within the website. That means whole website, all pages
// should have information that user is now logged in, which will be helpful conditional rendering contents on the pages and many
// more features like adding to wish list or making a purchase only when user is logged in. 

import { useReducer, createContext, useEffect } from 'react'
import { useRouter } from 'next/router';

import axios from 'axios';

// initial state 
const initialState = {
    user: null,     // initially by default the user is going to be null
}

// create context
const Context = createContext();

// reducer function, which will be responsible to update the global state of the user and also access data from the state
// root reducer
const rootReducer = (state, actions) => {
    switch (actions.type) {
        // when action is logIn i.e. when user logs In
        case "LOGIN":
            return { ...state, user: actions.payload };      // payload contains the user information that we will receive by dispatching from logIn page

        // when user logs out
        case "LOGOUT":
            return { ...state, user: null };                // reset the state to null

        default:
            return state;                                   // by default keep it as it is.
    }
}


// context provider :- below code is the Context provider that makes global state available throughout the website.
// here the children prop is the _app.js , since _app.js in the nextJs is used to initialise all the pages so we are going to 
// wrap the entire _app.js component with this context provider
const Provider = ({ children }) => {

    // code below is pretty familiar, useReducer is analogous to useState (not actually but for easy understanding), 
    // state is the state and dispatch is like setState
    const [state, dispatch] = useReducer(rootReducer, initialState);
    // every time we dispatch something with the 'type' and 'payload' from the children prop, the global state is updated.

    // since, unlike redux, for Context we first need to save data to the local storage then we can have the data in the context
    // state. We can do that by useEffect
    useEffect(() => {
        dispatch({
            type: "LOGIN",
            payload: JSON.parse(window.localStorage.getItem("user")),       // this line means anything present in the localStorage having name user, grab that and save in context state
        });
    }, []);

    const router = useRouter();

    // it is like a middle ware that will run before any axios get post request to check if everything is fine or not
    axios.interceptors.response.use(
        function (response) {
            // any status code of 2XX will trigger thiis function, i.e. everything is fine (like user loggedIn, payment success etc.)
            return response;
        },
        function (error) {
            // any status other than 2XX i.e. something is not fine (like uesr token expired, errors etc)
            let res = error.response;
            if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
                return new Promise((resolve, reject) => {
                    axios
                        .get("/api/logout")
                        .then((data) => {
                            console.log('/401 error > logout');
                            dispatch({ type: "LOGOUT" });
                            window.localStorage.removeItem("user");
                            router.push("/login")
                        })
                        .catch((err) => {
                            console.log("AXIOS INTERCEPTORS ERROR : ", err);
                        })
                })
            }
            return Promise.reject(error);
        }
    )

    // CSRF token protection
    useEffect(() => {
        const getCsrfToken = async () => {
            const { data } = await axios.get('/api/csrf-token');
            // console.log("CSRF :", data);
            axios.defaults.headers["X-CSRF-Token"] = data.getCsrfToken;
            // if the csrf token that we sent and the token that is generated from backend is not same
            // an error will occur hence security is imporved
        }

        getCsrfToken();
    }, []);


    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )
}

// offcourse we need to export context and the provider
export { Context, Provider }