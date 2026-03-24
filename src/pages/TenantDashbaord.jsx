import React from 'react'
import TenantLayout from '../Layouts/TenantLayout'
import { Outdent } from 'lucide-react'
import { Outlet } from 'react-router-dom'

const TenantDashbaord = () => {
  return (
    <div>
        <TenantLayout/>
        <main>
          <Outlet/>
        </main>
        
    </div>
  )
}

export default TenantDashbaord