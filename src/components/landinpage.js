import React from 'react';
import ListUsers from '../views/List-Users';
import "../dashboard.css";
import "../style.css";

// Components import
import SideNav from '../components/side-nav';
import NavBar from '../components/navbar';
import Footer from '../components/footer';

function LandingPage(props) {
    

    return (
   
        <>
            <div className="container-scroller">
                <NavBar email = {props.history.location.state}/>
                <div className="page-body-wrapper">
                    <SideNav />
                        <ListUsers/>        
                </div>
            </div>
        </>


     
     
    );
}

export default LandingPage;
