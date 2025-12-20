import { BrowserRouter, Routes, Route } from "react-router-dom";
import PLP from "./pages/PLP";
import AdminAddProduct from './pages/AdminAddProduct';
import EditProduct from './pages/EditProduct';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PLP />} />
        <Route path="/admin" element={<AdminAddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
