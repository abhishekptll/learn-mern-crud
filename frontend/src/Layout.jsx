import {Outlet} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
const Layout=()=>{
    return(
        <>
        <Header/>
        <div id="wrapper">
             <Outlet/>
        </div>

        <Footer/>        
        </>
    )
}

export default Layout;