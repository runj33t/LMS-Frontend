// _app.js is the main file where all the components are rendered.
// so be it global component which should pe present in all the pages like Navbar
// or global css or sytles should be a imported here.

// global styles
import GlobalStyle from "../globalStyles";

// toast notification - a notification library
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "../components/Navigation/Navbar";
import "../public/css/styles.css"

const MyApp = ({ Component, pageProps }) => {
    return (
        <div>
            <ToastContainer position="top-right"/>
            <GlobalStyle />
            <Navbar />
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;