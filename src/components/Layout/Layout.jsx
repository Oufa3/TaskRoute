import React, { useEffect, useState } from "react";
import Style from "./Layout.module.css";
import { Outlet } from "react-router-dom";
export default function Layout(){
    const [first, setfirst] = useState(0)
    useEffect(()=> {},[])
    return<>
    <div className="container my-6 py-6">
        <Outlet></Outlet>
    </div>
    </>
    
}