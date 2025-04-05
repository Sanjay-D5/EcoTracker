import { Route, Routes } from "react-router-dom"
import { CarbonCalculator, Challenges, DailyTips, Dashboard, EcoShopping } from "./pages"
import Home from "./pages/Home"
import AuthLayout from "./auth/AuthLayout"


function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout initialFormType='sign-in'/>}>
        <Route path="sign-in" element={<AuthLayout initialFormType='sign-in'/>}/>
        <Route path="sign-up" element={<AuthLayout initialFormType='sign-up'/>}/>
      </Route>
      <Route path="home" element={<Home />} >
        <Route path="Dashboard" element={<Dashboard/>} />
        <Route path="Track-Impact" element={<CarbonCalculator/>}/>
        <Route path="Eco-shopping" element={<EcoShopping/>}/>
        <Route path="Daily-Tips" element={<DailyTips/>}/>
        <Route path="Challenges" element={<Challenges/>}/>
      </Route>  
  </Routes>
  )
}

export default App
