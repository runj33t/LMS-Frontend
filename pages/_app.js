// global styles
import GlobalStyle from "../globalStyles";

import Navbar from "../components/Navigation/Navbar";
import "../public/css/styles.css"

const MyApp = ({Component, pageProps}) => {
    return (
        <div>
            <GlobalStyle />
            <Navbar />
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;