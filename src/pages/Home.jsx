import React from 'react'
import { useSelector } from "react-redux";
import TenantDashboard from "../pages/TenantDashbaord";
import OwnerDashboard from "../pages/OwnerDashboard"



const Home = () => {
    const {userData}=useSelector((state)=>state.user)

  return (
    <div>
      {userData.role=="user" && <TenantDashboard/>}
      {userData.role=="owner" && <OwnerDashboard/>}
    </div>
  )
}

export default Home