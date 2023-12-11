import React from "react";
// import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/sidebar.css'
function Sidebar(){
    return(
        
        <div className="bg-black  position-fixed h-100 w-sidebar ">
            <div className=" bg-black ">
            <i className=" text-white bi bi-currency-exchange fs-2 me-2"></i>
             <span className="brand-name text-white fs-4">Forex Remit</span>
            </div>
            <hr className="text-white"/>
            <div className="bg-black list-group list-group-flush">
            <a  className="bg-black list-group-item  py-2 ">
                <i className="text-white bi bi-house fs-5 me-2"></i>
                <span className=" text-white fs-5">Dashboard</span>
            </a>
        
            <a className="bg-black list-group-item py-2 ">
                <i className=" text-white bi bi-bank  fs-5 me-3"></i>
                <span className="text-white fs-5">OverSeas Receipient</span>
            </a>
        
            <a className="bg-black list-group-item py-2 ">
                <i className="text-white bi bi-bank2  fs-5 me-3"></i>
                <span className="text-white fs-5">OverSeas Transfer</span>
            </a>
        

            </div>
        </div>
    )
}
export default Sidebar;
