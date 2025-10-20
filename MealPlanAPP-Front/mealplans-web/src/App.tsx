import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MealPlanForm from './pages/MealPlanForm'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#323232] text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<MealPlanForm />} />
          <Route path="/edit/:id" element={<MealPlanForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App