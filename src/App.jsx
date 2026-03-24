import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import TenantDashboard from "./pages/TenantDashbaord";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home"
import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerDashboards from "./pages/OwnerDashboards";
import OwnerProperties from "./pages/OwnerProperties";
import OwnerAddProperty from "./pages/OwnerAddProperty";
import ViewDetails from "./pages/ViewDetails";
import OwnerAssignmentTenant from "./pages/OwnerAssignmentTenant";
import AgreementForm from "./pages/AgreeemntForm";
import OwnerTenatsDashboard from "./pages/OwnerTenatsDashboard";
import OwnerAddTenant from "./pages/OwnerAddTenant";
import OwnerTenatDetilas from "./pages/OwnerTenatDetilas";
import OwnerAgreementDashboard from "./pages/OwnerAgreementDashboard";
import OwnerBillsDashboard from "./pages/OwnerBillsDashboard";
import OwnerBillsDetails from "./pages/OwnerBillsDetails";
import OwnerViewPropertybills from "./pages/OwnerViewPropertybills";
import OwnerMaintaince from "./pages/OwnerMaintaince";
import OwnerViewMaintance from "./pages/OwnerViewMaintance";
import TenantLayout from "./Layouts/TenantLayout";
import TenantDashboards from "./pages/TenantDashboards";
import TenantBills from "./pages/TenantBills";
import TenantPayments from "./pages/TenantPayments";
import TenantMaintenance from "./pages/TenantMaintenance";
import TenantProfile from "./pages/TenantProfile";
import RasieTenatRequest from "./pages/RasieTenatRequest";
import ViewReciptTenant from "./pages/ViewReciptTenant";


function App() {
  useGetCurrentUser()
  const {userData}=useSelector((state)=>state.user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userData ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!userData?<Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!userData?<Register /> : <Navigate to="/" />} />
        <Route path="/forgot-password" element={!userData?<ForgotPassword /> : <Navigate to="/" />} />
        <Route path="/tenant" element={userData?<TenantDashboard /> : <Navigate to="/login" />} />
         
        
         
        {/* {user dashboard} */}
       <Route path="/" element={<Navigate to="/tenant/dashboard" />} />

        <Route path="/tenant" element={<TenantLayout />}>
          <Route path="dashboard" element={<TenantDashboards />} />
          <Route path="bills" element={<TenantBills />} />
          <Route path="payments" element={<TenantPayments />} />
          <Route path="maintenance" element={<TenantMaintenance />} />
          <Route path="profile" element={<TenantProfile />} />
        </Route>

        <Route path="/tenant/RaiseRequest" element={<RasieTenatRequest/>}/>
        <Route path="/view/recipt/:id" element={<ViewReciptTenant/>}/>


         <Route path="/ownerDashboard" element={userData ? <OwnerDashboard/>: <Navigate to="/login" />} />
         <Route path="/owner/dashboard" element={<OwnerDashboards/>}/>
         <Route path="/owner/properties" element={<OwnerProperties/>}/>
         <Route path="/addProperty" element={<OwnerAddProperty/>}/>
         <Route path="/viewDetailsProperty/:id" element={<ViewDetails/>}/>
         <Route path="/owner/AssignmentTenant" element={<OwnerAssignmentTenant/>}/>
         <Route path="/AgreementForm" element={<AgreementForm/>}/>
         <Route path="/owner/tenants" element={<OwnerTenatsDashboard/>}/>
         <Route path="/owner/AddTenants" element={<OwnerAddTenant/>}/>
         <Route path="/owner/TenantDetails/:id" element={<OwnerTenatDetilas/>}/>
         <Route path="/owner/agreements" element={<OwnerAgreementDashboard/>}/>
         <Route path="/owner/bills" element={<OwnerBillsDashboard/>}/>
         <Route path="/owner/billDetails/:id" element={<OwnerBillsDetails/>}/>
         <Route path="/owner/viewBillsByPropterty/:id" element={<OwnerViewPropertybills/>}/>
         <Route path="/owner/maintenance" element={<OwnerMaintaince/>}/>
         <Route path="/owner/billsDetails/:id" element={<OwnerViewMaintance/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;