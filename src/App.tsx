import { Route, Routes } from "react-router-dom"
import { CarbonCalculator, Challenges, DailyTips, Dashboard, EcoShopping } from "./pages"
import Home from "./pages/Home"
import AuthLayout from "./auth/AuthLayout"
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Toaster position="bottom-right" />
    <Routes>
      <Route path="/" element={<AuthLayout initialFormType='sign-in'/>}>
        <Route path="sign-in" element={<AuthLayout initialFormType='sign-in'/>}/>
        <Route path="sign-up" element={<AuthLayout initialFormType='sign-up'/>}/>
      </Route>
      <Route path="home" element={<Home />} >
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="track-Impact" element={<CarbonCalculator/>}/>
        <Route path="eco-shopping" element={<EcoShopping/>}/>
        <Route path="daily-Tips" element={<DailyTips/>}/>
        <Route path="challenges" element={<Challenges/>}/>
      </Route>  
  </Routes>
    </>
    
  )
}

export default App
