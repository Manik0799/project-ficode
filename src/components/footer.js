import React from "react";
import "../dashboard.css"

function Footer(){

    return(
        <div>
                <footer className="footer">
                    <div className="d-sm-flex justify-content-center justify-content-sm-between">
                        <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright &copy; 2021 <a target="_blank">Connetrics</a> - User License All rights reserved.</span>
                        <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Version: 1.0</span>
                    </div>
                </footer>
        </div>
    );
}

export default Footer;

